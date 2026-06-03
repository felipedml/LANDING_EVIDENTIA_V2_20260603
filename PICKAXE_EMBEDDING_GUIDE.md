# Guia Completo: Embedar Academic Dashboard em Pickaxe Studio

## 📋 Resumo Executivo

Este documento contém as **regras, restrições e melhores práticas** para embedar seu webapp Academic Dashboard (`https://academic-bibliometric-dashboard-607912449171.us-west1.run.app`) em uma página de Pickaxe Studio com perfeição.

---

## 🎯 Estrutura do Pickaxe Studio Pages

### 1. **Onde Fazer o Embed**

- **Location**: Pickaxe Studio → **Pages** tab → **Add Custom Content Page** (ou editar página existente)
- **Section Type**: **Rich Text (HTML)**
- O Pickaxe suporta:
  - Texto formatado
  - YouTube videos
  - Imagens
  - **Custom HTML/iframes** ✅

### 2. **Layout System**

⚠️ **IMPORTANTE**: Pickaxe Studio Pages usam **flexbox layout** com comportamento responsivo:

```css
/* Padrão do Pickaxe para Rich Text sections */
display: flex;
justify-content: center;
align-items: center;
width: 100%;
```

**Implicações**:
- Iframes sem width/height definidos podem "vazar" do container
- Elementos são centralizados por padrão
- Deve-se usar `max-width` e valores responsivos

---

## 🔧 Código de Embed Recomendado

### **Opção 1: Iframe Simples (Recomendado para Pickaxe)**

```html
<div style="width:100%; max-width:100%; display:flex; justify-content:center; margin:20px 0;">
  <iframe 
    src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
    width="100%"
    height="800"
    style="
      border:none;
      border-radius:12px;
      box-shadow:0 4px 16px rgba(0,0,0,0.12);
      max-width:1200px;
      display:block;
    "
    title="Academic Bibliometric Dashboard"
    allow="clipboard-write; clipboard-read"
  >
    Your browser does not support iframes.
  </iframe>
</div>
```

**Por que isso funciona**:
- ✅ Respeita o flexbox do Pickaxe
- ✅ Responsivo (width: 100%)
- ✅ Height fixo previne layout shift
- ✅ max-width mantem proporções em desktops
- ✅ Permissões `allow` para interatividade completa

---

### **Opção 2: Iframe com Altura Responsiva (Mais Avançado)**

```html
<style>
  .academic-dashboard-container {
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
  
  .academic-dashboard-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 125%; /* 800px height para 1000px width */
  }
  
  .academic-dashboard-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  
  /* Mobile: aumenta altura relativa */
  @media (max-width: 768px) {
    .academic-dashboard-wrapper {
      padding-bottom: 200%;
    }
  }
</style>

<div style="display:flex; justify-content:center; width:100%;">
  <div class="academic-dashboard-container">
    <div class="academic-dashboard-wrapper">
      <iframe 
        src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
        title="Academic Bibliometric Dashboard"
        allow="clipboard-write; clipboard-read"
      ></iframe>
    </div>
  </div>
</div>
```

**Quando usar**:
- Se o dashboard mudar de altura ao redimensionar
- Para suporte mobile robusto
- Quando precisar de proporcionalidade perfeita

---

### **Opção 3: Versão Minimalista (Sem Padding)**

```html
<div style="width:100%; display:flex; justify-content:center;">
  <iframe 
    src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
    width="100%"
    height="900"
    style="border:none; border-radius:8px; max-width:1200px;"
    title="Academic Dashboard"
    allow="clipboard-write; clipboard-read"
  ></iframe>
</div>
```

---

## 🔐 Questões de Segurança & CORS

### **Sua webapp está pronta para iframe?**

Verifique se seu `next.config.ts` permite:

```typescript
// next.config.ts - Adicione se não existir
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // ou 'SAMEORIGIN' se só embedar em pickaxe
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### **Attribute `allow`**

```html
<!-- Permissões que seu dashboard pode precisar -->
allow="
  clipboard-write;      <!-- Para copy/paste de referências -->
  clipboard-read;       <!-- Para paste de DOIs/URLs -->
  web-share;           <!-- Se tiver share buttons -->
  geolocation;         <!-- Se processar localização -->
  camera;              <!-- Se scanear QR codes -->
  microphone;          <!-- Se tiver áudio -->
"
```

### **Content Security Policy (CSP)**

Se Pickaxe usar CSP (improvável mas possível), você pode precisar:

```html
<!-- Se receber erros de CSP, tente adicionar -->
<meta 
  http-equiv="Content-Security-Policy" 
  content="frame-ancestors 'self' *.pickaxe.co studio.pickaxe.co"
>
```

Mas melhor é fazer isso via headers do servidor (Next.js).

---

## 📏 Dimensões Recomendadas

### **Desktop (>1024px)**

```
Width:  100% (máx 1200px)
Height: 800-900px
```

### **Tablet (768px - 1024px)**

```
Width:  100% (máx 800px)
Height: 900-1000px
```

### **Mobile (<768px)**

```
Width:  100%
Height: 1000-1200px (interface stacked requer mais altura)
```

**Template responsivo rápido**:

```html
<iframe 
  src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
  style="
    width: 100%;
    height: calc(100vh - 100px);
    border: none;
    border-radius: 12px;
    max-width: 1200px;
  "
  allow="clipboard-write; clipboard-read"
></iframe>
```

---

## ✅ Checklist de Implementação Perfeita

### **Antes de fazer embed:**

- [ ] Seu app está deployed em produção (✅ verificado: Google Cloud Run)
- [ ] Testou acessando diretamente a URL no navegador
- [ ] App responde em <3 segundos (check load time)
- [ ] Mobile layout é usável em iframe (não assume fullscreen)
- [ ] Não há conflitos de CSS com Pickaxe (ex: `position: fixed` global)
- [ ] Nenhum script tenta escapar do iframe (`window.top.location.href`)

### **Ao embedar em Pickaxe:**

- [ ] Teste o embed em **preview** antes de publicar
- [ ] Teste em mobile (use device emulation ou device real)
- [ ] Teste em diferentes browsers (Chrome, Firefox, Safari, Edge)
- [ ] Testa navegação interna (links, botões)
- [ ] Teste downloads/exports (Excel, PDF)
- [ ] Teste se forms funcionam
- [ ] Procure por console errors (F12)

### **Após publicar:**

- [ ] Monitore analytics/traffic do seu App
- [ ] Receba feedback de usuários sobre performance
- [ ] Documente URL e instruções para equipe

---

## 🛠️ Troubleshooting Comum

### **Problema: Iframe não aparece**

**Causas possíveis:**
1. `X-Frame-Options: DENY` no seu app
2. Erro de carregamento da URL
3. Pickaxe está stripando o código

**Solução**:
```html
<!-- Adicione fallback -->
<iframe 
  src="..."
  ...
>
  <p>Sua webapp não pode ser carregada. 
     <a href="..." target="_blank">Abra aqui em nova aba</a>
  </p>
</iframe>
```

---

### **Problema: Iframe muito pequeno/grande**

**Solução**: Use a **Opção 2** (altura responsiva) acima

---

### **Problema: Scrollbar dupla (página + iframe)**

```css
/* Aplicar ao container */
overflow: hidden;

/* E ao body da webapp se possível */
/* ... mas isso requer acesso ao código */
```

Ou use a Opção 2 com padding-bottom ajustado.

---

### **Problema: Elementos clickáveis não respondem**

**Causa**: Falta de permissões no `allow` attribute

**Solução**:
```html
<!-- Mais permissões -->
allow="
  clipboard-write;
  clipboard-read;
  web-share;
  payment;
"
```

---

### **Problema: CSS do Pickaxe interfere com webapp**

Improvável mas possível. Solução:

```html
<div style="
  all: initial;
  display: flex;
  justify-content: center;
  width: 100%;
">
  <iframe ...></iframe>
</div>
```

---

## 🎨 Opções de Estilo em Pickaxe

### **Se quiser seção com título + iframe:**

```html
<h2 style="text-align:center; margin:40px 0 20px 0; font-size:28px;">
  Academic Dashboard
</h2>

<p style="text-align:center; color:#666; margin-bottom:30px;">
  Console de bibliometria, análise de publicações e fichamento automático com IA.
</p>

<div style="width:100%; display:flex; justify-content:center;">
  <iframe 
    src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
    width="100%"
    height="850"
    style="border:none; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.12); max-width:1200px;"
    allow="clipboard-write; clipboard-read"
  ></iframe>
</div>
```

### **Com CTA antes e depois:**

```html
<div style="max-width:1200px; margin:0 auto; padding:40px 20px;">
  <h2 style="text-align:center;">Ferramenta Integrada</h2>
  
  <!-- IFRAME AQUI -->
  
  <p style="text-align:center; margin-top:40px; color:#666;">
    Você está usando o Academic Dashboard diretamente.
  </p>
</div>
```

---

## 📱 Test URLs

Teste seu embed nessas URLs:

```
Desktop:  https://studio.pickaxe.co/[seu-studio-id]/[pagina]
Mobile:   Mesmo URL, mas via device mobile ou DevTools
Tablet:   Mesmo URL, viewport 768px
```

---

## 🚀 Deploy & Performance

### **Monitorar Load Time**

No seu `app/layout.tsx`, considere adicionar Web Vitals:

```typescript
import { useReportWebVitals } from 'next/web-vitals'

export function reportWebVitals(metric: any) {
  console.log(`Metric (${metric.name}):`, metric.value)
}
```

### **Otimizações para Iframe**

1. **Lazy load** se tiver múltiplos iframes:
```html
<iframe 
  src="..."
  loading="lazy"
  ...
></iframe>
```

2. **Compress assets** (já feito pelo Next.js por padrão)

3. **Minimize bundle** - verifique seu next.config:
```typescript
// next.config.ts
const nextConfig = {
  swcMinify: true,  // Já ativo por padrão
  productionBrowserSourceMaps: false, // Desabilitar source maps em prod
};
```

---

## 📚 Referências Oficiais Pickaxe

- **Pickaxe Studio Guide**: https://pickaxe.co/post/pickaxe-studio-sell-your-ai-tools-as-services
- **Embedding Images (HTMLExample)**: https://community.pickaxe.co/t/embedding-images-on-a-pickaxe-studio-page-simple-guide/7099
- **User Manual**: https://pickaxe.co/post/pickaxe-user-manual-how-to-do-everything-in-pickaxe
- **FAQ**: https://pickaxe.co/faq

---

## 🎯 Sua Infraestrutura

### **Academic Dashboard**

```
URL: https://academic-bibliometric-dashboard-607912449171.us-west1.run.app
Framework: Next.js 15.4.9
Deployment: Google Cloud Run
Região: us-west1
Status: ✅ Live
```

### **Tech Stack Verificado**

```json
{
  "dependencies": {
    "next": "^15.4.9",
    "react": "^19.2.1",
    "tailwind": "4.1.11",
    "google-genai": "^2.4.0"
  },
  "features": [
    "Bibliometric analysis",
    "Academic file processing (PDFs)",
    "Chart visualizations (Plotly, D3)",
    "Export (Excel, Word, PDF)",
    "Dark mode support"
  ]
}
```

**Compatível com iframe?** ✅ SIM
- Next.js não bloqueia por padrão
- React hydration funciona dentro de iframes
- Tailwind CSS é scoped (boa prática)

---

## 💡 Dicas Finais

### **1. Teste Before Deploy**

Crie uma página de teste em seu Pickaxe Studio ANTES de colocar em produção.

### **2. Monitor User Feedback**

Coloque um form para usuários reportarem problemas com o embed.

### **3. Documento as URLs**

Mantenha um log de URLs embedadas:
```markdown
- Pickaxe Studio: [URL da sua studio]
- Dashboard Embed Page: [URL da página dentro da studio]
- Dashboard Source: https://github.com/felipedml/Academic_Dashboard
```

### **4. Backup do Código**

Guarde o código HTML do embed em um comentário no seu repo:
```html
<!-- PICKAXE_STUDIO_EMBED_CODE.html -->
<!-- Última atualização: YYYY-MM-DD -->
<!-- Usado em: [URL] -->
```

### **5. Escalabilidade**

Se tiver múltiplos dashboards, crie um template:
```html
<!-- TEMPLATE -->
<div style="width:100%; display:flex; justify-content:center;">
  <iframe 
    src="{WEBAPP_URL}"
    width="100%"
    height="{HEIGHT_PX}"
    style="border:none; border-radius:12px; max-width:1200px;"
    allow="clipboard-write; clipboard-read"
  ></iframe>
</div>
```

---

## 📞 Suporte

Se tiver problemas:

1. **Pickaxe Community**: https://community.pickaxe.co
2. **Your App Logs**: Verifique Google Cloud Run logs
3. **Browser DevTools**: F12 → Console para erros

---

**Última atualização**: Maio 28, 2026  
**Autor**: Para embedar Academic Dashboard em Pickaxe Studio  
**Status**: ✅ Pronto para Implementação
