# Instruções de Deploy - carvalhoenergia.com.br

## Configurações Realizadas

### 1. Domínio Configurado
- **Domínio:** https://carvalhoenergia.com.br
- **Homepage:** Configurado no `package.json`
- **API Base:** https://carvalhoenergia.com.br/api

### 2. Arquivos Criados

#### `.htaccess` (frontend/public/.htaccess)
- Redirecionamento HTTP → HTTPS
- Redirecionamento www → não-www
- Suporte ao React Router (SPA)
- Compressão GZIP
- Cache de arquivos estáticos
- Headers de segurança

#### `robots.txt` (frontend/public/robots.txt)
- Configurado para permitir indexação
- Sitemap configurado

### 3. Meta Tags SEO
- Open Graph tags
- Twitter Cards
- Canonical URL
- Idioma: pt-BR
- Keywords e description otimizados

### 4. URLs da API
- Atualizadas de `localhost:8000` para `https://carvalhoenergia.com.br/api`
- Configurável via variável de ambiente `REACT_APP_API_BASE`

## Passos para Deploy

### 1. Build do Frontend
```bash
cd frontend
npm install
npm run build
```

### 2. Upload dos Arquivos
Faça upload da pasta `frontend/build/` para o diretório `public_html` do servidor.

**Estrutura esperada no servidor:**
```
/home/carvaene/public_html/
├── index.html
├── static/
│   ├── css/
│   └── js/
├── favicon.png
├── .htaccess
└── robots.txt
```

### 3. Configuração do Backend (API)
O backend deve estar configurado para responder em:
- **URL:** https://carvalhoenergia.com.br/api
- **CORS:** Permitir origem `https://carvalhoenergia.com.br`

### 4. Verificações Pós-Deploy

1. **SSL/HTTPS:** Certifique-se de que o certificado SSL está instalado
2. **.htaccess:** Verifique se o arquivo foi copiado corretamente
3. **Permissões:** Arquivos devem ter permissão 644, diretórios 755
4. **API:** Teste se a API está respondendo em `/api/health`

### 5. Testes

- [ ] Site carrega em https://carvalhoenergia.com.br
- [ ] Redirecionamento HTTP → HTTPS funciona
- [ ] Rotas do React Router funcionam (testar navegação)
- [ ] API responde em https://carvalhoenergia.com.br/api/health
- [ ] Favicon aparece corretamente
- [ ] Meta tags aparecem no código fonte

## Variáveis de Ambiente (Opcional)

Se precisar configurar variáveis de ambiente, crie um arquivo `.env` na pasta `frontend/`:

```env
REACT_APP_API_BASE=https://carvalhoenergia.com.br/api
REACT_APP_ENV=production
```

## Suporte

Para problemas com o deploy, verifique:
- Logs do servidor (cPanel → Logs)
- Permissões de arquivos
- Configuração do .htaccess
- Certificado SSL

