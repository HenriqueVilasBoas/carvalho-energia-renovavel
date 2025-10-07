from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import uuid
from datetime import datetime
import json
import asyncio


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Storage: prefer Mongo if configured, else file fallback
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'carvalho')
if mongo_url:
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
else:
    client = None
    db = None

# File-based fallback store (always available; used when Mongo not configured)
LIKES_STORE_PATH = ROOT_DIR / 'likes_store.json'
_file_lock = asyncio.Lock()

def _read_store() -> Dict[str, Dict[str, object]]:
    if not LIKES_STORE_PATH.exists():
        return {}
    try:
        with open(LIKES_STORE_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data if isinstance(data, dict) else {}
    except Exception:
        return {}

def _write_store(data: Dict[str, Dict[str, object]]) -> None:
    with open(LIKES_STORE_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str


class LikeRequest(BaseModel):
    session_id: str


class LikeResponse(BaseModel):
    news_id: int
    count: int
    already_liked: bool


class LikesCountsResponse(BaseModel):
    counts: Dict[str, int]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# News Likes Endpoints
@api_router.post("/news/{news_id}/like", response_model=LikeResponse)
async def like_news_item(news_id: int, like: LikeRequest):
    if not like.session_id:
        raise HTTPException(status_code=400, detail="session_id is required")

    if db is not None:
        likes_col = db.news_likes
        counts_col = db.news_like_counts
        try:
            await likes_col.insert_one({
                "news_id": news_id,
                "session_id": like.session_id,
                "created_at": datetime.utcnow(),
            })
            await counts_col.update_one(
                {"news_id": news_id},
                {"$inc": {"count": 1}},
                upsert=True,
            )
        except Exception as e:
            if "E11000" in str(e):
                doc = await counts_col.find_one({"news_id": news_id})
                count_val = int(doc.get("count", 0)) if doc else 0
                return LikeResponse(news_id=news_id, count=count_val, already_liked=True)
            raise

        doc = await counts_col.find_one({"news_id": news_id})
        count_val = int(doc.get("count", 0)) if doc else 0
        return LikeResponse(news_id=news_id, count=count_val, already_liked=False)
    else:
        async with _file_lock:
            store = _read_store()
            key = str(news_id)
            entry = store.get(key, {"count": 0, "sessions": []})
            sessions = set(entry.get("sessions", []))
            if like.session_id in sessions:
                return LikeResponse(news_id=news_id, count=int(entry.get("count", 0)), already_liked=True)
            sessions.add(like.session_id)
            new_count = int(entry.get("count", 0)) + 1
            store[key] = {"count": new_count, "sessions": list(sessions)}
            _write_store(store)
            return LikeResponse(news_id=news_id, count=new_count, already_liked=False)


@api_router.get("/news/likes", response_model=LikesCountsResponse)
async def get_likes_counts(ids: Optional[str] = None):
    if db is not None:
        counts_col = db.news_like_counts
        query = {}
        if ids:
            try:
                id_list = [int(x) for x in ids.split(",") if x.strip()]
            except ValueError:
                raise HTTPException(status_code=400, detail="ids must be integers")
            query = {"news_id": {"$in": id_list}}
        cursor = counts_col.find(query)
        results = await cursor.to_list(length=1000)
        counts: Dict[str, int] = {str(doc["news_id"]): int(doc.get("count", 0)) for doc in results}
        return LikesCountsResponse(counts=counts)
    else:
        store = _read_store()
        if ids:
            try:
                id_list = [int(x) for x in ids.split(",") if x.strip()]
            except ValueError:
                raise HTTPException(status_code=400, detail="ids must be integers")
            filtered = {str(i): int(store.get(str(i), {}).get("count", 0)) for i in id_list}
            return LikesCountsResponse(counts=filtered)
        counts: Dict[str, int] = {k: int(v.get("count", 0)) for k, v in store.items()}
        return LikesCountsResponse(counts=counts)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def ensure_indexes():
    if db is not None:
        # Unique like per (news_id, session_id)
        await db.news_likes.create_index([("news_id", 1), ("session_id", 1)], unique=True, name="uniq_news_session")
        # Counter index for faster lookups
        await db.news_like_counts.create_index("news_id", unique=True, name="uniq_news_id")


@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()
