# 🎨 Snippets Prontos para Copiar e Colar no Pickaxe Studio

## ⚡ VERSÃO RÁPIDA (Copy & Paste - 30 segundos)

Copie isso diretamente no Pickaxe Studio → Pages → Rich Text (HTML):

```html
<div style="width:100%; display:flex; justify-content:center; margin:20px 0;">
  <iframe 
    src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
    width="100%"
    height="800"
    style="border:none; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.12); max-width:1200px; display:block;"
    title="Academic Bibliometric Dashboard"
    allow="clipboard-write; clipboard-read"
  >
    Your browser does not support iframes.
  </iframe>
</div>
```

---

## 🎯 VARIANTE 1: Profissional com Título

Use quando quiser título e descrição:

```html
<div style="max-width:1200px; margin:40px auto; padding:0 20px;">
  <h2 style="text-align:center; margin:0 0 10px 0; font-size:28px; font-weight:600; color:#1a1a1a;">
    Academic Dashboard
  </h2>
  
  <p style="text-align:center; margin:0 0 30px 0; color:#666; font-size:16px; line-height:1.5;">
    Console premium de análise bibliométrica, inteligência acadêmica e fichamento automático com IA.
    Integrado com sua Studio Pickaxe para máxima produtividade.
  </p>
  
  <div style="width:100%; display:flex; justify-content:center;">
    <iframe 
      src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
      width="100%"
      height="850"
      style="border:none; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.12); max-width:1200px;"
      title="Academic Bibliometric Dashboard"
      allow="clipboard-write; clipboard-read"
    >
      Your browser does not support iframes.
    </iframe>
  </div>
</div>
```

---

## 🎯 VARIANTE 2: Minimalista (Apenas iframe)

Para quando a página já tem contexto:

```html
<div style="width:100%; display:flex; justify-content:center; padding:20px 0;">
  <iframe 
    src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
    width="100%"
    height="800"
    style="border:none; border-radius:8px; max-width:1200px;"
    title="Academic Dashboard"
    allow="clipboard-write; clipboard-read"
  ></iframe>
</div>
```

---

## 🎯 VARIANTE 3: Com Seção de Ajuda

Para quando precisa de contexto + link de fallback:

```html
<div style="max-width:1200px; margin:40px auto; padding:0 20px;">
  <div style="background:#f5f5f5; border-left:4px solid #0066cc; padding:20px; margin-bottom:30px; border-radius:4px;">
    <h3 style="margin:0 0 10px 0; color:#0066cc;">ℹ️ Dica</h3>
    <p style="margin:0; color:#333; font-size:14px;">
      Se o dashboard não carregar, <a href="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app" target="_blank" style="color:#0066cc; text-decoration:underline;">abra em nova aba aqui</a>.
    </p>
  </div>

  <div style="width:100%; display:flex; justify-content:center;">
    <iframe 
      src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
      width="100%"
      height="800"
      style="border:none; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.12); max-width:1200px;"
      title="Academic Dashboard"
      allow="clipboard-write; clipboard-read"
    >
      <p><a href="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app" target="_blank">Abra o Academic Dashboard aqui</a></p>
    </iframe>
  </div>
</div>
```

---

## 🎯 VARIANTE 4: Integração Premium (Com Branding Felipe Asensi)

Para quando quer align com sua marca:

```html
<div style="max-width:1200px; margin:60px auto; padding:0 20px;">
  <!-- HEADER COM BRANDING -->
  <div style="text-align:center; margin-bottom:40px;">
    <h1 style="margin:0 0 10px 0; font-size:32px; font-weight:700; color:#1a1a1a;">
      Academic Dashboard
    </h1>
    <p style="margin:0 0 20px 0; font-size:16px; color:#666; line-height:1.6;">
      Desenvolvido para acadêmicos, mestrandos e doutorandos brasileiros.<br/>
      Análise bibliométrica, inteligência acadêmica e gerenciamento de projetos de pesquisa.
    </p>
  </div>

  <!-- FEATURES HIGHLIGHT (Optional) -->
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:40px;">
    <div style="background:#f9f9f9; padding:15px; border-radius:8px; text-align:center;">
      <p style="margin:0; font-size:14px; color:#666;">📊 Análise Bibliométrica</p>
    </div>
    <div style="background:#f9f9f9; padding:15px; border-radius:8px; text-align:center;">
      <p style="margin:0; font-size:14px; color:#666;">🤖 Fichamento com IA</p>
    </div>
  </div>

  <!-- IFRAME -->
  <div style="width:100%; display:flex; justify-content:center;">
    <iframe 
      src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
      width="100%"
      height="850"
      style="border:none; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.15); max-width:1200px;"
      title="Academic Dashboard by Felipe Asensi"
      allow="clipboard-write; clipboard-read"
    ></iframe>
  </div>

  <!-- FOOTER CTA -->
  <div style="text-align:center; margin-top:40px; padding-top:40px; border-top:1px solid #eee;">
    <p style="margin:0; color:#666; font-size:14px;">
      Desenvolvido por <strong>Felipe Asensi</strong> • Acadêmico 24h
    </p>
  </div>
</div>
```

---

## 🎯 VARIANTE 5: Responsivo Avançado (Mobile-First)

Para máxima compatibilidade em todos os devices:

```html
<style>
  .academic-iframe-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 10px;
  }

  .academic-iframe-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    background: #f5f5f5;
  }

  /* Desktop: 16:9 aspect ratio */
  @media (min-width: 1024px) {
    .academic-iframe-container {
      padding-bottom: 56.25%;
    }
  }

  /* Tablet: 4:3 aspect ratio */
  @media (max-width: 1023px) and (min-width: 768px) {
    .academic-iframe-container {
      padding-bottom: 75%;
    }
  }

  /* Mobile: 2:3 aspect ratio */
  @media (max-width: 767px) {
    .academic-iframe-container {
      padding-bottom: 150%;
    }
  }

  .academic-iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>

<div class="academic-iframe-wrapper">
  <div class="academic-iframe-container">
    <iframe 
      src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
      title="Academic Dashboard"
      allow="clipboard-write; clipboard-read"
    ></iframe>
  </div>
</div>
```

---

## 🎯 VARIANTE 6: Dark Mode Compatible

Se seu Pickaxe Studio tiver dark mode:

```html
<div style="width:100%; display:flex; justify-content:center; margin:20px 0;">
  <div style="
    width:100%;
    max-width:1200px;
    border-radius:12px;
    overflow:hidden;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    background:#fff;
  ">
    <iframe 
      src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
      width="100%"
      height="800"
      style="border:none; display:block;"
      title="Academic Dashboard"
      allow="clipboard-write; clipboard-read"
    ></iframe>
  </div>
</div>

<style>
  /* Se Pickaxe usar dark mode */
  @media (prefers-color-scheme: dark) {
    div[style*="background:#fff"] {
      background: #1a1a1a;
    }
  }
</style>
```

---

## 🎯 VARIANTE 7: Sem Shadow (Flat Design)

Para design mais clean/moderno:

```html
<div style="width:100%; display:flex; justify-content:center; margin:20px 0;">
  <iframe 
    src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
    width="100%"
    height="800"
    style="border:none; border-radius:0; max-width:1200px; display:block;"
    title="Academic Dashboard"
    allow="clipboard-write; clipboard-read"
  ></iframe>
</div>
```

---

## 🎯 VARIANTE 8: Com Loading State

Se o app demorar a carregar:

```html
<div id="dashboard-container" style="width:100%; display:flex; justify-content:center;">
  <div style="
    width:100%;
    max-width:1200px;
    padding:40px;
    text-align:center;
    background:#f9f9f9;
    border-radius:12px;
    color:#999;
    font-size:14px;
  ">
    ⏳ Carregando Academic Dashboard...
  </div>
</div>

<script>
  document.getElementById('dashboard-container').innerHTML = `
    <div style="width:100%; display:flex; justify-content:center;">
      <iframe 
        src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
        width="100%"
        height="800"
        style="border:none; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.12); max-width:1200px;"
        title="Academic Dashboard"
        allow="clipboard-write; clipboard-read"
        onload="this.style.opacity='1'"
        style="opacity:0; transition:opacity 0.3s ease-in;"
      ></iframe>
    </div>
  `;
</script>
```

---

## 📊 Comparativo Rápido

| Variante | Uso | Complexidade |
|----------|-----|-------------|
| **1 - Copy & Paste** | Mais rápido possível | Baixa |
| **2 - Profissional** | Com título/descrição | Baixa |
| **3 - Minimalista** | Já tem contexto | Baixa |
| **4 - Ajuda** | Com fallback link | Baixa |
| **5 - Branding** | Integração completa | Média |
| **6 - Responsivo** | Mobile perfeito | Média |
| **7 - Dark Mode** | Mode compatibility | Média |
| **8 - Flat Design** | Design moderno | Baixa |
| **9 - Loading** | Feedback visual | Média |

---

## ✅ Checklist de Implementação

Para cada snippet escolhido:

- [ ] Copia o código completo
- [ ] Cola em Pickaxe Studio → Pages → Rich Text (HTML)
- [ ] Clica em "Preview" antes de salvar
- [ ] Testa em Desktop
- [ ] Testa em Tablet (DevTools)
- [ ] Testa em Mobile (DevTools)
- [ ] Clica em botões dentro do iframe
- [ ] Tenta export PDF/Excel
- [ ] Salva a página

---

## 🐛 Se Algo Não Funcionar

### Erro: "Refused to frame 'https://academic-..."

**Causa**: X-Frame-Options block

**Solução**: Você precisa adicionar headers ao seu Next.js:

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

Depois: `npm run build && deploy`

---

### Erro: "Content Security Policy blocks frame"

**Solução**: Adicione ao Pickaxe ou no seu app headers:

```typescript
// No seu next.config.ts
{
  key: 'Content-Security-Policy',
  value: "frame-ancestors 'self' *.pickaxe.co studio.pickaxe.co *.vercel.app",
}
```

---

### Iframe muito lento

**Solução**: Adicione lazy loading:

```html
<!-- Adicione isso ao iframe -->
loading="lazy"
```

---

## 📝 Notas Importantes

1. **URL pode mudar**: Se migrar seu app para outra cloud, atualize todas as URLs
2. **Dimensões**: 800px é bom padrão, mas teste em seu dashboard específico
3. **Permissões**: `allow="clipboard-write; clipboard-read"` é mínimo necessário
4. **Mobile**: Teste SEMPRE em device real ou DevTools

---

## 🎁 Bonus: Versão com Analytics

Se quiser rastrear quando usuários acessam:

```html
<div style="width:100%; display:flex; justify-content:center;">
  <iframe 
    id="academic-dashboard"
    src="https://academic-bibliometric-dashboard-607912449171.us-west1.run.app"
    width="100%"
    height="800"
    style="border:none; border-radius:12px; max-width:1200px;"
    title="Academic Dashboard"
    allow="clipboard-write; clipboard-read"
  ></iframe>
</div>

<script>
  // Rastreia quando iframe carrega
  document.getElementById('academic-dashboard').onload = function() {
    if (window.gtag) {
      gtag('event', 'iframe_load', { 
        iframe_name: 'academic_dashboard',
        timestamp: new Date().toISOString()
      });
    }
    console.log('Academic Dashboard carregado em:', new Date().toLocaleTimeString('pt-BR'));
  };
</script>
```

---

**Última atualização**: Maio 28, 2026  
**Pronto para usar**: ✅ Sim, copy & paste direto!  
**Suporte**: Comunidade Pickaxe em https://community.pickaxe.co
