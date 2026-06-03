# ⚙️ Configuração do Academic Dashboard para Pickaxe Embedding

## 🎯 Objetivo

Garantir que seu app Next.js (Academic Dashboard) está **100% compatível** com embedding em iframes do Pickaxe Studio.

---

## ✅ Verificação Rápida

Antes de fazer qualquer alteração, teste:

```bash
# 1. App está rodando?
curl -I https://academic-bibliometric-dashboard-607912449171.us-west1.run.app
# Esperado: HTTP 200

# 2. Headers estão OK?
curl -I https://academic-bibliometric-dashboard-607912449171.us-west1.run.app | grep -i "X-Frame-Options"
# Se retornar "DENY" ou "SAMEORIGIN", você precisa mudar
```

---

## 🔧 Configuração Necessária no Next.js

### **Passo 1: Verifique `next.config.ts`**

Seu arquivo atual (baseado no repo):

```typescript
// next.config.ts (ATUAL)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ... suas configs
};

export default nextConfig;
```

### **Passo 2: Adicione Suporte para Iframe**

Atualize para:

```typescript
// next.config.ts (ATUALIZADO)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ... suas configs existentes ...

  // ✅ ADICIONE ISSO:
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Permite embedar em qualquer origem (Pickaxe e outros)
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
          // Permite CORS se Pickaxe precisar acessar via fetch
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          // Security (mantenha essa)
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Permite clipboard operations (importante para copiar referências)
          {
            key: 'Permissions-Policy',
            value: 'clipboard-read=(self), clipboard-write=(self)',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

### **Passo 3: Se Tiver CSP (Content Security Policy)**

Se você já tem CSP no seu projeto:

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.plot.ly https://d3js.org https://cdnjs.cloudflare.com https://code.jquery.com https://cdn.datatables.net https://cdn.sheetjs.com https://cdnjs.cloudflare.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.datatables.net;
            img-src 'self' data: https:;
            font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
            connect-src 'self' https: wss:;
            frame-ancestors 'self' *.pickaxe.co studio.pickaxe.co *.vercel.app;
            form-action 'self';
          `.replace(/\s+/g, ' ').trim(),
        },
        // ... outros headers ...
      ],
    },
  ];
}
```

---

### **Passo 4: Rebuild e Deploy**

```bash
# 1. Localmente
npm run build

# 2. Teste localmente
npm run start
# Acesse http://localhost:3000

# 3. Deploy (Google Cloud Run)
# Se usar gcloud CLI:
gcloud run deploy academic-dashboard \
  --source . \
  --platform managed \
  --region us-west1

# Ou via GitHub Actions (se configurado)
git add next.config.ts
git commit -m "Enable iframe embedding for Pickaxe Studio"
git push origin main
```

---

## 🧪 Teste de Compatibilidade

### **Local Testing**

```bash
# Terminal 1: Rode seu app
npm run start

# Terminal 2: Test com curl
curl -I http://localhost:3000 | grep -i "X-Frame-Options"
# Esperado: X-Frame-Options: ALLOWALL (ou não aparecer o header de deny)

curl -I http://localhost:3000 | grep -i "Access-Control"
# Esperado: Access-Control-Allow-Origin: *
```

### **Browser Console Test**

Abra DevTools (F12) e execute:

```javascript
// Teste 1: Pode fazer fetch?
fetch('https://academic-bibliometric-dashboard-607912449171.us-west1.run.app/api/search')
  .then(r => console.log('✅ Fetch OK', r.status))
  .catch(e => console.error('❌ Fetch erro:', e));

// Teste 2: Headers estão OK?
fetch('https://academic-bibliometric-dashboard-607912449171.us-west1.run.app', {
  method: 'HEAD'
})
.then(r => {
  console.log('X-Frame-Options:', r.headers.get('X-Frame-Options'));
  console.log('CORS:', r.headers.get('Access-Control-Allow-Origin'));
});
```

### **Iframe Embedding Test**

```html
<!-- Crie um arquivo teste.html e abra no navegador -->
<!DOCTYPE html>
<html>
<head>
  <title>Teste de Iframe</title>
</head>
<body>
  <h1>Teste de Embedding</h1>
  
  <iframe 
    src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
    width="100%"
    height="600"
    title="Test"
  ></iframe>
  
  <p id="result">Carregando...</p>
  
  <script>
    document.querySelector('iframe').onload = function() {
      document.getElementById('result').textContent = '✅ Iframe carregou com sucesso!';
      document.getElementById('result').style.color = 'green';
    };
    
    document.querySelector('iframe').onerror = function() {
      document.getElementById('result').textContent = '❌ Erro ao carregar iframe';
      document.getElementById('result').style.color = 'red';
    };
    
    setTimeout(() => {
      if (document.getElementById('result').textContent === 'Carregando...') {
        document.getElementById('result').textContent = '⏳ Ainda carregando (verifique console)';
      }
    }, 5000);
  </script>
</body>
</html>
```

---

## 🔐 Segurança: Considerações Importantes

### **Problema: "ALLOWALL" é muito permissivo**

Se quiser ser mais restritivo, use:

```typescript
{
  key: 'X-Frame-Options',
  value: 'SAMEORIGIN'  // Só embed no mesmo domínio
}
```

Mas isso NÃO funcionará em Pickaxe Studio (domínios diferentes).

**Melhor solução**: Whitelist apenas Pickaxe:

```typescript
// ⚠️ PROBLEMA: Não existe header "X-Frame-Options: ALLOWSPECIFIC"
// Você precisa escolher:

// Opção A: Permissivo (recomendado para SaaS público)
'X-Frame-Options': 'ALLOWALL'

// Opção B: Apenas seu domínio
'X-Frame-Options': 'SAMEORIGIN'

// Opção C: Via CSP (mais moderno, mais seguro)
'Content-Security-Policy': "frame-ancestors 'self' *.pickaxe.co studio.pickaxe.co"
```

**Recomendação para seu caso**: Use **Opção C (CSP)**, é mais seguro:

```typescript
{
  key: 'Content-Security-Policy',
  value: "frame-ancestors 'self' *.pickaxe.co studio.pickaxe.co https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
}
```

---

## 📱 Otimizações para Iframe

### **1. Evite `position: fixed` no Root**

Procure em seus CSS/componentes por:

```css
/* ❌ RUIM em iframe */
body, html {
  position: fixed;
  width: 100%;
  height: 100%;
}

/* ✅ BOM em iframe */
html {
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
```

**Arquivo a checar**: `app/globals.css`

```css
/* Seu arquivo atual - VERIFIQUE */
/* app/globals.css */

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  /* Certifique-se que não tem position: fixed aqui */
}
```

### **2. Evite `window.top` em Scripts**

Procure em seus componentes/hooks por:

```javascript
// ❌ RUIM - tenta sair do iframe
if (window.top !== window.self) {
  window.top.location.href = 'https://example.com';
}

// ✅ BOM - respeita sandbox
if (window.self !== window.top) {
  // Trata como iframe e adapta UX
  console.log('Executando em iframe');
}
```

### **3. Zoom e Escala**

Seu app já usa viewport meta, verifique:

```typescript
// app/layout.tsx (você já tem isso)
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

Bom! Nenhuma mudança necessária.

---

## 🧩 Verificação de Componentes Específicos

### **Seu App usa:**

- ✅ Tailwind CSS (scoped, bom para iframe)
- ✅ React 19 (compatível)
- ✅ Plotly.js (funciona em iframe)
- ✅ DataTables jQuery (funciona em iframe)
- ✅ Google Fonts (CDN, funciona)

**Nenhuma mudança necessária nesses!**

---

## 🚀 Deploy Checklist

Antes de fazer deploy das mudanças:

```bash
# 1. Build local
npm run build

# Se há erros:
npm run lint
npm run clean && npm run build

# 2. Test local
npm run start
# Abra http://localhost:3000 em navegador
# Teste todas as funcionalidades

# 3. Commit e push
git add next.config.ts
git commit -m "Enable X-Frame-Options for Pickaxe Studio embedding

- Add ALLOWALL to X-Frame-Options header
- Enable CORS headers
- Configure CSP for frame-ancestors
- Maintain security with CSP policy"

git push origin main

# 4. Monitor Cloud Run logs
gcloud run logs read academic-dashboard --region us-west1 --limit 50
```

---

## ⚠️ Se Algo Der Errado Após Deploy

### **App carrega mas fica em branco**

```javascript
// Adicione ao seu app layout.tsx (temporário para debug)
useEffect(() => {
  if (window.self !== window.top) {
    console.log('✅ App detectou embed em iframe');
    console.log('✅ Frame origin:', window.location.origin);
  }
}, []);
```

### **Abra Console (F12) e verifique erros**

Erros comuns:

```
"Uncaught SecurityError: Blocked a frame with origin..."
→ Problema: Headers X-Frame-Options. Verifique next.config.ts

"Uncaught TypeError: Cannot read property 'top' of undefined"
→ Problema: Script tenta acessar window.top. Procure e corrija

"Failed to fetch from API"
→ Problema: CORS headers. Verifique Access-Control-Allow-Origin
```

---

## 📋 Configuração Pré-Pronta

Se quiser apenas copiar/colar, use EXATAMENTE isto:

### **next.config.ts (COMPLETO)**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Suas configs existentes aqui...
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // ✅ Iframe embedding support
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
          
          // ✅ CORS support
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          
          // ✅ Clipboard permissions for dashboard functionality
          {
            key: 'Permissions-Policy',
            value: 'clipboard-read=(self), clipboard-write=(self)',
          },
          
          // ✅ CSP with frame-ancestors for extra security
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *.pickaxe.co studio.pickaxe.co",
          },
          
          // ✅ Standard security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

**Depois de fazer essa mudança:**

```bash
npm run build
npm run start
# Test local
# Se OK, commit e push
```

---

## 🎯 Resumo Final

| Item | Status | Ação |
|------|--------|------|
| App rodando | ✅ Sim | Nenhuma |
| X-Frame-Options | ❓ Verificar | Adicione header |
| Access-Control | ❓ Verificar | Adicione header |
| Next.js compat | ✅ Sim | Nenhuma |
| Componentes | ✅ Sim | Nenhuma |
| CSS/Layout | ✅ Sim | Nenhuma |

---

## 📞 Suporte

- **Pickaxe Docs**: https://pickaxe.co/post/pickaxe-user-manual-how-to-do-everything-in-pickaxe
- **Next.js Docs**: https://nextjs.org/docs/app/api-reference/config/next-config-js
- **Security Headers**: https://securityheaders.com

---

**Última atualização**: Maio 28, 2026  
**Status**: ✅ Pronto para implementar  
**Tempo estimado**: 5 minutos (ajuste + deploy)
