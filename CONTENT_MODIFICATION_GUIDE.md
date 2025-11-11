# Website Content Modification Guide
## Carvalho Energia Renovável Frontend

This guide explains how to modify different parts of the website without needing to understand JavaScript programming. Each section shows exactly which files to edit and what to change.

---

## 📁 File Structure Overview

```
/app/frontend/src/
├── components/          # Website sections (Header, Footer, etc.)
├── data/               # All website content and images
├── pages/              # Different website pages
└── contexts/           # Language switching functionality
```

---

## 🗂️ Main Content File

**Most Important File:** `/app/frontend/src/data/mockData.js`

This file contains almost all the text, project information, services, and news content on the website.

---

## 🏢 Projects Section

### File to Edit: `/app/frontend/src/data/mockData.js`
### Section: `export const mockProjects = [`

**What you can change:**
- **Project titles** (both Portuguese and English)
- **Project locations**
- **Project capacity** (MW power)
- **Achievement descriptions** (piles driven, modules installed, etc.)
- **Project descriptions**
- **Project images** (replace the image URLs)

**Example:**
```javascript
{
  id: 1,
  title: {
    pt: "Your Project Name in Portuguese",
    en: "Your Project Name in English"
  },
  location: {
    pt: "São Paulo, Brasil",
    en: "São Paulo, Brazil"
  },
  capacity: "150MWp",
  achievements: {
    pt: "24.000 estacas cravadas, 185.000 módulos instalados",
    en: "24,000 piles driven, 185,000 modules installed"
  },
  description: {
    pt: "Detailed project description in Portuguese",
    en: "Detailed project description in English"
  },
  image: "https://your-image-url.com/project1.jpg"
}
```

### To Add More Projects:
1. Copy an entire project block (from `{` to `}`)
2. Change the `id` number to the next number
3. Update all the information
4. Add a comma after the previous project

---

## 🛠️ Services Section

### File to Edit: `/app/frontend/src/data/mockData.js`
### Section: `export const mockServices = [`

**What you can change:**
- **Service titles** (both languages)
- **Service descriptions**
- **Service images**
- **Service icons** (choose from: Construction, Hammer, Settings, Zap, Truck, Wrench)

**Example:**
```javascript
{
  id: 1,
  title: {
    pt: "Nome do Serviço em Português",
    en: "Service Name in English"
  },
  description: {
    pt: "Descrição do serviço em português",
    en: "Service description in English"
  },
  icon: "Construction",
  image: "https://your-service-image-url.com/service1.jpg"
}
```

---

## 📰 News Section

### File to Edit: `/app/frontend/src/data/mockData.js`
### Section: `export const mockNews = [`

**What you can change:**
- **News titles** (both languages)
- **News summaries** (short description)
- **Full story content** (detailed article)
- **Publication dates** (format: "YYYY-MM-DD")
- **Categories** (like "Project Completion", "Innovation")

**Example:**
```javascript
{
  id: 1,
  title: {
    pt: "Título da Notícia em Português",
    en: "News Title in English"
  },
  summary: {
    pt: "Resumo curto da notícia em português",
    en: "Short news summary in English"
  },
  fullStory: {
    pt: "História completa detalhada em português...",
    en: "Detailed full story in English..."
  },
  date: "2024-01-15",
  category: {
    pt: "Categoria em Português",
    en: "Category in English"
  }
}
```

---

## 🏠 About Us Section

### File to Edit: `/app/frontend/src/components/AboutSection.js`

**Company Story Text:**
Look for the lines starting with:
```javascript
{language === 'pt' 
  ? 'Fundada com a visão...'
  : 'Founded with the vision...'
}
```

Replace the text inside the quotes with your company story.

**Mission Text:**
Find:
```javascript
{language === 'pt'
  ? 'Acelerar a transição para energia limpa...'
  : 'Accelerate the transition to clean energy...'
}
```

**Vision Text:**
Find:
```javascript
{language === 'pt'
  ? 'Ser reconhecida como a principal referência...'
  : 'To be recognized as the leading reference...'
}
```

**Statistics:**
Look for the `stats` array and change the numbers and labels:
```javascript
{
  number: "2.750MWp",
  label: { pt: "MW Instalados", en: "MW Installed" },
  icon: Zap
}
```

---

## 🎨 Colors and Branding

### File to Edit: `/app/frontend/src/App.css`
### Section: `:root {`

**Main Brand Colors:**
- `--brand-primary: #D3FF62;` (Bright green - buttons)
- `--brand-dark: #004534;` (Dark green - text, headers)
- `--brand-hover: #0C6951;` (Medium green - hover effects)

**Background Colors:**
- `--bg-page: #FAFFEE;` (Main page background)
- `--bg-card: #FAFAFF;` (Card backgrounds)

---

## 📞 Contact Information

### File to Edit: `/app/frontend/src/components/Footer.js`
### Section: `const contactInfo = [`

**Change Contact Details:**
```javascript
{
  icon: Phone,
  text: {
    pt: "+55 (11) 9999-9999",
    en: "+55 (11) 9999-9999"
  }
},
{
  icon: Mail,
  text: {
    pt: "contato@carvalhoenergia.com.br",
    en: "contact@carvalhoenergia.com.br"
  }
}
```

---

## 🌐 Navigation Menu

### File to Edit: `/app/frontend/src/data/mockData.js`
### Section: `translations = {`

**Menu Items:**
```javascript
pt: {
  home: "Início",
  projects: "Projetos em Destaque",
  services: "Serviços",
  news: "Notícias",
  about: "Sobre Nós",
  contact: "Contato"
}
```

---

## 🖼️ How to Change Images

**For Projects, Services, and any images:**
1. Upload your image to a image hosting service (like Imgur, or your website hosting)
2. Copy the direct image URL
3. Replace the existing URL in the respective section

**Image Requirements:**
- **Projects:** Recommended size 2000x1200 pixels
- **Services:** Recommended size 800x600 pixels
- **Format:** JPG or PNG

---

## 🗣️ Adding New Languages

Currently supports Portuguese (pt) and English (en). To add another language:

1. **Add language option** in `/app/frontend/src/components/Header.js`:
```javascript
const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }  // New language
];
```

2. **Add translations** in `/app/frontend/src/data/mockData.js`:
Add `es: { ... }` sections to all translation objects.

---

## ⚠️ Important Notes

1. **Always keep the file structure intact**
2. **Don't remove commas, brackets, or quotes**
3. **Keep the `id` numbers unique for each project/service/news item**
4. **Test the website after making changes**
5. **Make backups before major changes**

---

## 🔧 After Making Changes

1. Save the file
2. The website will automatically refresh (hot reload)
3. Check if everything looks correct
4. If there are errors, check for missing commas or quotes

---

## 📞 Need Help?

If you encounter issues:
1. Check that all quotes and commas are in place
2. Ensure image URLs are accessible
3. Verify that the file structure wasn't accidentally modified
4. Contact technical support if problems persist

---

**This guide covers 95% of content changes you might want to make. Most modifications only require editing the `/app/frontend/src/data/mockData.js` file!**