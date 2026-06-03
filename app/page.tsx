"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sun, Moon, AlertTriangle, Check, ArrowRight, ArrowDown, HelpCircle, Shield, Award
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   DEMO DATA — 25 mock papers for interactive gallery (Plotly 3D + D3 net)
   ───────────────────────────────────────────────────────────────────────── */
const DEMO_PAPERS = [
  { id:"d01", title:"IA na Revisão Sistemática: avanços e desafios",             year:2024, citations:142, journal:"Scientometrics",               keywords:["IA","RSL","automatização","NLP"],                   authors:["Santos, A.","Lima, C.","Pereira, B."] },
  { id:"d02", title:"Machine Learning para triagem de artigos científicos",       year:2023, citations:98,  journal:"Journal of Informetrics",         keywords:["machine learning","triagem","RSL","IA"],            authors:["Lima, C.","Torres, M."] },
  { id:"d03", title:"NLP aplicado à análise de abstracts acadêmicos",             year:2023, citations:75,  journal:"Information Processing & Mgmt",   keywords:["NLP","abstracts","automatização","processamento"],   authors:["Pereira, B.","Rodrigues, E."] },
  { id:"d04", title:"Deep Learning em extração de dados bibliográficos",          year:2024, citations:63,  journal:"Scientometrics",                  keywords:["deep learning","bibliometria","extração","IA"],     authors:["Santos, A.","Costa, F."] },
  { id:"d05", title:"Automação de revisões de literatura com IA generativa",      year:2025, citations:38,  journal:"Research Synthesis Methods",       keywords:["IA generativa","RSL","automatização","LLM"],        authors:["Lima, C.","Alves, J.","Santos, A."] },
  { id:"d06", title:"Análise bibliométrica da produção científica brasileira",    year:2022, citations:187, journal:"Transinformação",                  keywords:["bibliometria","brasil","produção científica","análise de redes"], authors:["Oliveira, M.","Silva, P."] },
  { id:"d07", title:"Redes de co-autoria em pesquisa educacional no Brasil",      year:2021, citations:154, journal:"Educação em Revista",              keywords:["co-autoria","redes","bibliometria","educação"],      authors:["Silva, P.","Ferreira, R."] },
  { id:"d08", title:"Mapeamento tridimensional de clusters temáticos",            year:2023, citations:82,  journal:"Scientometrics",                  keywords:["mapeamento","clusters","bibliometria","visualização"],authors:["Oliveira, M.","Costa, F."] },
  { id:"d09", title:"Citações cruzadas em áreas interdisciplinares",             year:2022, citations:119, journal:"Journal of Informetrics",          keywords:["citações","interdisciplinar","análise de redes","bibliometria"], authors:["Costa, F.","Torres, M.","Oliveira, M."] },
  { id:"d10", title:"Cientometria e métricas de impacto: revisão crítica",        year:2020, citations:234, journal:"Scientometrics",                  keywords:["cientometria","métricas","impacto","análise de redes"],authors:["Silva, P.","Rodrigues, E."] },
  { id:"d11", title:"Produção científica nos programas de pós-graduação",         year:2022, citations:143, journal:"Avaliação — UNICAMP",              keywords:["pós-graduação","CAPES","produção científica","brasil"],authors:["Ferreira, R.","Alves, J."] },
  { id:"d12", title:"Qualis CAPES e qualidade dos periódicos: análise crítica",   year:2021, citations:167, journal:"Educação e Pesquisa",              keywords:["Qualis","CAPES","periódicos","qualidade"],           authors:["Alves, J.","Silva, P."] },
  { id:"d13", title:"Políticas de avaliação e impacto na pesquisa acadêmica",     year:2023, citations:91,  journal:"Avaliação — UNICAMP",              keywords:["avaliação","políticas","pesquisa acadêmica","CAPES"], authors:["Ferreira, R.","Oliveira, M."] },
  { id:"d14", title:"Indicadores de inovação em instituições de ensino superior", year:2024, citations:55,  journal:"Rev. de Adm. de Empresas",         keywords:["inovação","IES","produção científica","indicadores"], authors:["Costa, F.","Alves, J."] },
  { id:"d15", title:"Colaboração internacional em pesquisa brasileira",           year:2022, citations:128, journal:"Scientometrics",                  keywords:["colaboração","internacional","brasil","análise de redes"], authors:["Rodrigues, E.","Silva, P.","Torres, M."] },
  { id:"d16", title:"Recomendação automatizada por vetores semânticos",           year:2023, citations:72,  journal:"Information Processing & Mgmt",   keywords:["recomendação","NLP","bibliometria","vetores semânticos"], authors:["Santos, A.","Oliveira, M."] },
  { id:"d17", title:"Tendências emergentes via análise bibliométrica com IA",     year:2024, citations:49,  journal:"Scientometrics",                  keywords:["tendências","bibliometria","IA","análise de redes"],  authors:["Lima, C.","Costa, F.","Ferreira, R."] },
  { id:"d18", title:"Knowledge Graph para integração de bases bibliográficas",    year:2023, citations:66,  journal:"Journal of Informetrics",          keywords:["knowledge graph","bibliometria","integração","IA"],   authors:["Pereira, B.","Oliveira, M."] },
  { id:"d19", title:"The impact factor: analysis and utility in science",         year:2017, citations:512, journal:"Nature",                          keywords:["impact factor","métricas","análise de redes","cientometria"], authors:["Rodrigues, E.","Torres, M."] },
  { id:"d20", title:"Bibliometric methods in social science research",            year:2016, citations:687, journal:"Scientometrics",                  keywords:["bibliometria","ciências sociais","métodos","análise de redes"], authors:["Silva, P.","Costa, F."] },
  { id:"d21", title:"Systematic literature review: a methodology overview",       year:2018, citations:445, journal:"Research Synthesis Methods",       keywords:["RSL","metodologia","revisão sistemática","ciência"],  authors:["Alves, J.","Torres, M."] },
  { id:"d22", title:"ChatGPT e pesquisa acadêmica: riscos e oportunidades",       year:2025, citations:21,  journal:"Educação em Revista",              keywords:["ChatGPT","IA generativa","pesquisa acadêmica","LLM"], authors:["Lima, C.","Ferreira, R."] },
  { id:"d23", title:"Embeddings vetoriais para clustering de literatura",         year:2024, citations:34,  journal:"Information Processing & Mgmt",   keywords:["embeddings","clustering","NLP","bibliometria"],       authors:["Santos, A.","Pereira, B."] },
  { id:"d24", title:"Open Access e democratização do conhecimento científico",    year:2023, citations:88,  journal:"Educação e Pesquisa",              keywords:["open access","democratização","ciência aberta","brasil"], authors:["Rodrigues, E.","Alves, J."] },
  { id:"d25", title:"Altmetrics para avaliação de impacto acadêmico",             year:2022, citations:103, journal:"Scientometrics",                  keywords:["altmetrics","métricas","avaliação","impacto"],        authors:["Torres, M.","Oliveira, M.","Costa, F."] },
];

/* ─────────────────────────────────────────────────────────────────────────
   MARQUEE — tool logos available in /public
   ───────────────────────────────────────────────────────────────────────── */
const MARQUEE_LOGOS = [
  { src:"/scispace.png",         alt:"SciSpace" },
  { src:"/connected_papers.png", alt:"Connected Papers" },
  { src:"/consensus.png",        alt:"Consensus" },
  { src:"/litmaps.png",          alt:"LitMaps" },
  { src:"/rr.png",               alt:"Research Rabbit" },
  { src:"/elicit.png",           alt:"Elicit" },
  { src:"/semantic_scholar.png", alt:"Semantic Scholar" },
  { src:"/crossref.png",         alt:"Crossref" },
  { src:"/google_scholar.png",   alt:"Google Scholar" },
  { src:"/core.png",             alt:"CORE" },
  { src:"/arXiv.png",            alt:"arXiv" },
  { src:"/open_alex.png",        alt:"OpenAlex" },
  { src:"/unpaywall.png",        alt:"Unpaywall" },
  { src:"/open_access.png",      alt:"Open Access" },
  { src:"/DOI.png",              alt:"DOI" },
];

/* ─────────────────────────────────────────────────────────────────────────
   CO-AUTHORSHIP DEMO — 25 authors + links extracted from real SVG output
   ───────────────────────────────────────────────────────────────────────── */
const COAUTH_AUTHORS = [
  "Fabrício Castagna Lunardi","Rocco Antônio Rangel Rosso Nelson",
  "Jackson J. T. da Silva de Medeiros","Dirley da Cunha Júnior",
  "Miguel Horvath Júnior","Aline Fagundes dos Santos",
  "Fabiano Engelmann","Suelen Aparecida Rodrigues",
  "Carolina de Souza Costa","Inês Costa",
  "Gleison F. L. A. Ferreira","Luiz Damon",
  "Pedro Manoel Abreu","Mellissa Carvalho Moreira",
  "Ana Beatriz Silva Novaes","Sara Alves Magalhães",
  "Daniel das Chagas de Azevedo Ribeiro","Hugo Fonseca Moreira",
  "Wellem Ribeiro da Silva","Luiz Cláudio de Almeida Teodoro",
  "Fábio Fonseca Telles","Ercilia Maria de Oliveira Souza",
  "Júlia Feitosa Costa","Damião Leite da Silva Júnior","José Inaldo Valões",
];
const COAUTH_LINKS = [
  [1,2],[4,5],[7,8],[17,18],[17,19],[17,20],[18,19],[18,20],[19,20],[21,22],[23,24],
];

/* ─────────────────────────────────────────────────────────────────────────
   VRE-BRAND VECTOR WORDMARK GENERATOR — Standalone high-definition brand assets
   ───────────────────────────────────────────────────────────────────────── */
function BrandLogo({ name }: { name: string }) {
  switch (name) {
    case "SciSpace":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/20 bg-teal-950/20 text-xs font-bold font-sans select-none text-teal-400">
          <svg className="w-3.5 h-3.5 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 22h20L12 2zm0 4l6 12H6l6-12z" />
          </svg>
          SciSpace
        </span>
      );
    case "Connected Papers":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-950/20 text-xs font-bold font-sans select-none text-purple-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" />
            <line x1="8.5" y1="15.5" x2="10" y2="14" />
            <line x1="14" y1="10" x2="15.5" y2="8.5" />
          </svg>
          Connected Papers
        </span>
      );
    case "Consensus":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/20 text-xs font-extrabold font-sans select-none text-emerald-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Consensus
        </span>
      );
    case "LitMaps":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/20 bg-rose-950/20 text-xs font-semibold font-sans select-none text-rose-400">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          LitMaps
        </span>
      );
    case "Research Rabbit":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-950/20 text-xs font-bold font-sans select-none text-amber-400">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a4 4 0 014 4c0 .87-.28 1.68-.76 2.34l3.52 3.52A10 10 0 1112 2z" />
          </svg>
          Research Rabbit
        </span>
      );
    case "Elicit":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-950/20 text-xs font-bold font-serif select-none text-indigo-400">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Elicit
        </span>
      );
    case "Semantic Scholar":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-950/20 text-xs font-bold font-sans select-none text-blue-400">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          </svg>
          Semantic Scholar
        </span>
      );
    case "Crossref":
      return (
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--gold-vibrant)]/20 bg-[var(--gold-vibrant)]/10 text-xs font-bold font-sans select-none text-[var(--gold-vibrant)]">
          <span className="font-mono-jet font-black text-sm">+</span>
          Crossref
        </span>
      );
    case "Google Scholar":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-950/20 text-xs font-bold select-none text-red-400">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 11-6-11-6z" />
          </svg>
          Google Scholar
        </span>
      );
    case "CORE":
      return (
        <span className="flex items-center px-3.5 py-1.5 rounded-full border border-[var(--gold-vibrant)]/20 bg-[var(--gold-vibrant)]/10 text-xs font-bold font-mono-jet select-none tracking-widest text-[var(--gold-vibrant)]">
          CORE
        </span>
      );
    case "arXiv":
      return (
        <span className="flex items-center px-3.5 py-1.5 rounded-full border border-slate-500/25 bg-slate-900/40 text-xs font-serif italic select-none font-extrabold tracking-tighter text-slate-300">
          ar<span className="text-[var(--gold-vibrant)] italic">X</span>iv
        </span>
      );
    case "OpenAlex":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-950/20 text-xs font-bold select-none text-violet-400">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          OpenAlex
        </span>
      );
    case "Unpaywall":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-950/20 text-xs font-bold select-none text-amber-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 019.9-1" strokeLinecap="round" />
          </svg>
          Unpaywall
        </span>
      );
    case "Open Access":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-950/20 text-xs font-extrabold uppercase select-none tracking-wider text-orange-400">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 5a3 3 0 016 0v3H9V7z" />
          </svg>
          Open Access
        </span>
      );
    case "DOI":
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-extrabold select-none text-cyan-400">
          <span className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center text-[9px] font-black text-black">doi</span>
          DOI
        </span>
      );
    default:
      return <span className="font-sans font-semibold text-xs text-slate-350">{name}</span>;
  }
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [count, setCount] = useState<number>(4000);
  const [heroIframeLoaded, setHeroIframeLoaded] = useState<boolean>(false);

  // States and Ref for Dynamic Interactive Premium 3D Parallax Logo
  const logoCardRef = useRef<HTMLDivElement>(null);
  const [logoRotate, setLogoRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Demo graph containers
  const scatter3dDemoRef = useRef<HTMLDivElement>(null);
  const simNetDemoRef    = useRef<HTMLDivElement>(null);
  const coauthorDemoRef  = useRef<HTMLDivElement>(null);
  const authorPhRef      = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = authorPhRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const winH = window.innerHeight || 800;
            if (rect.top < winH && rect.bottom > 0) {
              const centerStr = rect.top + (rect.height || 400) / 2;
              const pct = (centerStr - winH / 2) / (winH / 2 || 400);
              const safePct = Number.isFinite(pct) ? Math.max(-1, Math.min(1, pct)) : 0;
              const translateY = safePct * 25; // Safe subtle parallax offset (-25px to +25px)
              el.style.transform = `translateY(${translateY}px) translateZ(0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once shortly after mount to position correctly
    setTimeout(handleScroll, 200);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoCardRef.current) return;
    const rect = logoCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const factorX = 12 / (rect.width / 2);
    const factorY = 12 / (rect.height / 2);
    setLogoRotate({ x: -y * factorY, y: x * factorX });
  };

  const handleLogoMouseLeave = () => {
    setLogoRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Sync theme with local storage and DOM class list
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTimeout(() => {
        setTheme(savedTheme);
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  // Theme change handler
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  // Count animate effect - decreasing from 4000 to 397 (de R$ 4000 para R$ 397)
  useEffect(() => {
    let current = 4000;
    const end = 397;
    const duration = 1500; // ms
    const step = (4000 - end) / (duration / 16);
    
    const counter = setInterval(() => {
      current -= step;
      if (current <= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(counter);
  }, []);

  // Intersection observer for fading elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-up, .reveal-left, .reveal-right");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ── DEMO: Plotly 3D scatter ─────────────────────────────────────────────
  useEffect(() => {
    let rotateTimer: ReturnType<typeof setInterval> | null = null;
    let angle = 0;
    let paused = false;
    const currentEl = scatter3dDemoRef.current;

    const init = (attempt = 0) => {
      const Plotly = (window as any).Plotly;
      if (!Plotly || !currentEl) {
        if (attempt < 40) setTimeout(() => init(attempt + 1), 300);
        return;
      }
      const xD = DEMO_PAPERS.map(p => p.year);
      const yD = DEMO_PAPERS.map(p => p.citations);
      const zD = DEMO_PAPERS.map(p =>
        Math.round((p.citations / Math.max(2026 - p.year, 1)) * 10) / 10
      );
      const txt = DEMO_PAPERS.map(p =>
        `<b>${p.title}</b><br>Ano: ${p.year}  ·  Citações: ${p.citations}<br>${p.journal}`
      );
      const col = DEMO_PAPERS.map(p =>
        p.year >= 2023 ? "#E8BD56" : p.year >= 2020 ? "#848559" : "#40585E"
      );
      const sz = DEMO_PAPERS.map(p => Math.max(Math.min(p.citations * 0.09 + 7, 22), 7));

      Plotly.newPlot(
        currentEl,
        [{ x: xD, y: yD, z: zD, mode: "markers", type: "scatter3d",
           text: txt, hoverinfo: "text",
           marker: { size: sz, color: col, opacity: 0.88,
                     line: { color: "rgba(255,255,255,0.5)", width: 1 } } }],
        {
          margin: { l: 0, r: 0, b: 0, t: 0 },
          paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
          scene: {
            bgcolor: "rgba(0,0,0,0)",
            xaxis: { title: { text: "Ano", font: { size: 10, color: "#94a3b8" } },
                     gridcolor: "rgba(255,255,255,0.07)", tickfont: { color: "#94a3b8", size: 9 } },
            yaxis: { title: { text: "Citações", font: { size: 10, color: "#94a3b8" } },
                     gridcolor: "rgba(255,255,255,0.07)", tickfont: { color: "#94a3b8", size: 9 } },
            zaxis: { title: { text: "Relevância", font: { size: 10, color: "#94a3b8" } },
                     gridcolor: "rgba(255,255,255,0.07)", tickfont: { color: "#94a3b8", size: 9 } },
          },
          font: { family: "Inter, sans-serif", color: "#94a3b8" },
        },
        { responsive: true, displayModeBar: false }
      );

      // Auto-rotate
      rotateTimer = setInterval(() => {
        if (paused || !currentEl) return;
        angle = (angle + 0.9) % 360;
        Plotly.relayout(currentEl, {
          "scene.camera": {
            eye: {
              x: 2.0 * Math.cos((angle * Math.PI) / 180),
              y: 2.0 * Math.sin((angle * Math.PI) / 180),
              z: 1.0,
            },
          },
        });
      }, 80);

      const stop = () => { paused = true; };
      const go   = () => { paused = false; };
      currentEl.addEventListener("mouseenter", stop);
      currentEl.addEventListener("mouseleave", go);
      currentEl.addEventListener("touchstart", stop, { passive: true });
      currentEl.addEventListener("touchend",   go);
    };

    init();
    return () => {
      if (rotateTimer) clearInterval(rotateTimer);
      const Plotly = (window as any).Plotly;
      if (Plotly && currentEl) Plotly.purge(currentEl);
    };
  }, []);

  // ── DEMO: D3 Similarity Network ─────────────────────────────────────────
  useEffect(() => {
    let simulation: any = null;
    let reheat: ReturnType<typeof setInterval> | null = null;
    const currentContainer = simNetDemoRef.current;

    const init = (attempt = 0) => {
      const d3 = (window as any).d3;
      if (!d3 || !currentContainer) {
        if (attempt < 40) setTimeout(() => init(attempt + 1), 300);
        return;
      }
      const container = currentContainer;
      const W = container.clientWidth  || 780;
      const H = container.clientHeight || 400;

      d3.select(container).selectAll("*").remove();

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${W} ${H}`)
        .style("overflow", "hidden");

      // Build similarity links (keywords + authors + journal)
      const links: { source: string; target: string; weight: number }[] = [];
      for (let i = 0; i < DEMO_PAPERS.length; i++) {
        for (let j = i + 1; j < DEMO_PAPERS.length; j++) {
          const a = DEMO_PAPERS[i], b = DEMO_PAPERS[j];
          let score = 0;
          const kwA = new Set(a.keywords), kwB = new Set(b.keywords);
          score += [...kwA].filter(x => kwB.has(x)).length * 1.5;
          const auA = new Set(a.authors), auB = new Set(b.authors);
          score += [...auA].filter(x => auB.has(x)).length * 2.5;
          if (a.journal === b.journal) score += 1.0;
          if (score > 1.2) links.push({ source: a.id, target: b.id, weight: score });
        }
      }

      const nodes: any[] = DEMO_PAPERS.map(p => ({ ...p }));

      const colorOf = (yr: number) =>
        yr >= 2023 ? "#E8BD56" : yr >= 2020 ? "#848559" : "#40585E";

      const isLightTheme = document.documentElement.classList.contains("light");
      const labelFill    = isLightTheme ? "#1e293b" : "#e2e8f0";
      const labelStroke  = isLightTheme ? "rgba(255,255,255,0.95)" : "rgba(3,7,18,0.9)";

      const g = svg.append("g");
      svg.call(
        (d3.zoom() as any)
          .scaleExtent([0.25, 4])
          .on("zoom", (event: any) => g.attr("transform", event.transform))
      );

      const linkSel = g.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "rgba(216,166,60,0.2)")
        .attr("stroke-opacity", 0.7)
        .attr("stroke-width", (d: any) => Math.min(d.weight * 0.85, 4));

      const dragBehavior = (sim: any) =>
        d3.drag()
          .on("start", (e: any, d: any) => {
            if (!e.active) sim.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on("drag", (e: any, d: any) => { d.fx = e.x; d.fy = e.y; })
          .on("end",  (e: any, d: any) => {
            if (!e.active) sim.alphaTarget(0);
            d.fx = null; d.fy = null;
          });

      simulation = d3
        .forceSimulation(nodes)
        .force("link",      d3.forceLink(links).id((d: any) => d.id).distance(62))
        .force("charge",    d3.forceManyBody().strength(-85))
        .force("center",    d3.forceCenter(W / 2, H / 2))
        .force("x",         d3.forceX(W / 2).strength(0.05))
        .force("y",         d3.forceY(H / 2).strength(0.05))
        .force("collision", d3.forceCollide().radius(20))
        .stop(); // Stop async loop — we'll pre-warm synchronously

      // Run 300 synchronous ticks to get stable initial positions
      // (ensures nodes are visible even if requestAnimationFrame is throttled)
      for (let i = 0; i < 300; i++) simulation.tick();

      const nodeSel = g.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r",            (d: any) => Math.max(Math.sqrt(d.citations) * 1.2, 6))
        .attr("fill",         (d: any) => colorOf(d.year))
        .attr("stroke",       "rgba(255,255,255,0.65)")
        .attr("stroke-width", 1.2)
        .style("cursor", "pointer")
        .call(dragBehavior(simulation) as any)
        .on("mouseover", function(this: Element, _: any, d: any) {
          const r = Math.max(Math.sqrt(d.citations) * 1.2, 6);
          d3.select(this).transition().duration(130)
            .attr("r", r * 1.3).attr("stroke", "#E8BD56").attr("stroke-width", 2.5);
        })
        .on("mouseout", function(this: Element, _: any, d: any) {
          const r = Math.max(Math.sqrt(d.citations) * 1.2, 6);
          d3.select(this).transition().duration(130)
            .attr("r", r).attr("stroke", "rgba(255,255,255,0.65)").attr("stroke-width", 1.2);
        });

      nodeSel.append("title").text((d: any) =>
        `${d.title}\nAno: ${d.year}  ·  Citações: ${d.citations}\n${d.journal}`
      );

      // Labels only for the 8 most-cited papers
      const top8 = new Set(
        [...DEMO_PAPERS].sort((a, b) => b.citations - a.citations).slice(0, 8).map(p => p.id)
      );
      const labelSel = g.append("g")
        .selectAll("text")
        .data(nodes.filter((n: any) => top8.has(n.id)))
        .join("text")
        .text((d: any) => d.title.substring(0, 26) + "…")
        .attr("font-size", "9px")
        .attr("font-family", "Plus Jakarta Sans, sans-serif")
        .attr("fill", labelFill)
        .attr("stroke", labelStroke)
        .attr("stroke-width", "3px")
        .attr("paint-order", "stroke")
        .attr("dx", (d: any) => Math.max(Math.sqrt(d.citations) * 1.2, 6) + 5)
        .attr("dy", 3)
        .attr("pointer-events", "none");

      // Helper to flush positions to DOM
      const flushPositions = () => {
        linkSel
          .attr("x1", (d: any) => d.source.x).attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x).attr("y2", (d: any) => d.target.y);
        nodeSel.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
        labelSel.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
      };

      // Render pre-warmed positions immediately
      flushPositions();

      // Restart with small alpha for continued gentle animation
      simulation.alpha(0.08).alphaDecay(0.015).restart();
      simulation.on("tick", flushPositions);

      // Periodic gentle reheat to keep the graph alive
      reheat = setInterval(() => {
        if (simulation) simulation.alpha(0.06).restart();
      }, 10000);
    };

    init();
    return () => {
      if (simulation) simulation.stop();
      if (reheat) clearInterval(reheat);
      const d3 = (window as any).d3;
      if (d3 && currentContainer) d3.select(currentContainer).selectAll("*").remove();
    };
  }, []);

  // ── DEMO: D3 Co-authorship Network ──────────────────────────────────────
  useEffect(() => {
    let simCA: any = null;
    const currentContainer = coauthorDemoRef.current;

    const init = (attempt = 0) => {
      const d3 = (window as any).d3;
      if (!d3 || !currentContainer) {
        if (attempt < 40) setTimeout(() => init(attempt + 1), 300);
        return;
      }
      const container = currentContainer;
      const W = container.clientWidth  || 564;
      const H = container.clientHeight || 280;
      d3.select(container).selectAll("*").remove();

      const isLight = document.documentElement.classList.contains("light");
      const nodeColor  = isLight ? "#B4861F" : "#E8BD56";
      const labelFill  = isLight ? "#1e293b" : "#f1f5f9";
      const labelStroke = isLight ? "rgba(255,255,255,0.95)" : "rgba(3,7,18,0.9)";

      const nodes: any[] = COAUTH_AUTHORS.map((name, i) => ({ id: i, name }));
      const links: any[] = COAUTH_LINKS.map(([s, t]) => ({ source: s, target: t }));

      const svg = d3.select(container).append("svg")
        .attr("width","100%").attr("height","100%")
        .attr("viewBox",`0 0 ${W} ${H}`).style("overflow","hidden");
      const g = svg.append("g");
      svg.call((d3.zoom() as any).scaleExtent([0.3,4])
        .on("zoom",(e: any) => g.attr("transform", e.transform)));

      simCA = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d: any) => d.id).distance(55))
        .force("charge", d3.forceManyBody().strength(-60))
        .force("center", d3.forceCenter(W/2, H/2))
        .force("x", d3.forceX(W/2).strength(0.06))
        .force("y", d3.forceY(H/2).strength(0.06))
        .force("collision", d3.forceCollide().radius(14))
        .stop();

      for (let i = 0; i < 250; i++) simCA.tick();

      const linkSel = g.append("g").selectAll("line").data(links).join("line")
        .attr("stroke","rgba(132,133,89,0.35)").attr("stroke-width",1.8);

      const dragCA = (sim: any) => d3.drag()
        .on("start",(e: any,d: any) => { if(!e.active) sim.alphaTarget(0.3).restart(); d.fx=d.x; d.fy=d.y; })
        .on("drag", (e: any,d: any) => { d.fx=e.x; d.fy=e.y; })
        .on("end",  (e: any,d: any) => { if(!e.active) sim.alphaTarget(0); d.fx=null; d.fy=null; });

      const nodeSel = g.append("g").selectAll("circle").data(nodes).join("circle")
        .attr("r",7).attr("fill",nodeColor).attr("stroke","rgba(255,255,255,0.7)")
        .attr("stroke-width",1.5).style("cursor","pointer")
        .call(dragCA(simCA) as any)
        .on("mouseover",function(this:Element){ d3.select(this).transition().duration(120).attr("r",10).attr("stroke","#E8BD56").attr("stroke-width",2.5); })
        .on("mouseout", function(this:Element){ d3.select(this).transition().duration(120).attr("r",7).attr("stroke","rgba(255,255,255,0.7)").attr("stroke-width",1.5); });

      nodeSel.append("title").text((d: any) => d.name);

      // Labels only for connected nodes (those that appear in links)
      const connectedIds = new Set(COAUTH_LINKS.flat());
      const labelSel = g.append("g").selectAll("text")
        .data(nodes.filter((n: any) => connectedIds.has(n.id)))
        .join("text")
        .text((d: any) => d.name.split(" ").slice(0,2).join(" "))
        .attr("font-size","8px").attr("font-family","Plus Jakarta Sans, sans-serif")
        .attr("fill",labelFill).attr("stroke",labelStroke)
        .attr("stroke-width","2.5px").attr("paint-order","stroke")
        .attr("dx",10).attr("dy",3).attr("pointer-events","none");

      const flush = () => {
        linkSel.attr("x1",(d:any)=>d.source.x).attr("y1",(d:any)=>d.source.y)
               .attr("x2",(d:any)=>d.target.x).attr("y2",(d:any)=>d.target.y);
        nodeSel.attr("cx",(d:any)=>d.x).attr("cy",(d:any)=>d.y);
        labelSel.attr("x",(d:any)=>d.x).attr("y",(d:any)=>d.y);
      };
      flush();
      simCA.alpha(0.05).alphaDecay(0.02).restart();
      simCA.on("tick", flush);
    };

    init();
    return () => {
      if (simCA) simCA.stop();
      const d3 = (window as any).d3;
      if (d3 && currentContainer) d3.select(currentContainer).selectAll("*").remove();
    };
  }, []);

  // Smooth scroll helper
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-transition min-h-screen relative overflow-x-hidden selection:bg-yellow-500/30 selection:text-white" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="landing-blob landing-blob-1" />
        <div className="landing-blob landing-blob-2" />
      </div>

      {/* SEÇÃO 0 — HEADER STICKY MINIMALISTA */}
      <header id="main-header" className="fixed top-0 left-0 right-0 z-50 h-16 glass-card border-b bg-opacity-85 backdrop-blur-lg flex items-center transition-all duration-300 bg-transition" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <a href="#" className="flex items-center" onClick={(e) => handleScrollTo(e, "#")}>
            <img 
              src={theme === "light" ? "/logo_evidencIA_day.png" : "/logo_evidencIA_night.png"} 
              alt="EvidentIA Logo" 
              className="h-8 w-auto object-contain transition-all duration-300"
            />
          </a>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              aria-label="Alternar modo claro/escuro" 
              className="p-2 mr-1 rounded-full border bg-transition text-[var(--gold-vibrant)] text-base cursor-pointer hover:bg-[var(--gold-vibrant)]/10 transition-all font-mono-jet flex items-center justify-center"
              style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
            >
              {theme === "light" ? "🌙" : "🌞"}
            </button>
            <a 
              href="#pricing" 
              onClick={(e) => handleScrollTo(e, "#pricing")}
              className="btn-gold rounded-xl px-4 py-2 text-xs md:text-sm font-bold tracking-wide transition-all duration-200"
            >
              QUERO MEU ACESSO
            </a>
          </div>
        </div>
      </header>

      {/* SEÇÃO 1 — HERO */}
      <section className="relative pt-36 pb-24 px-6 max-w-7xl mx-auto z-10 w-full bg-transition">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Premium Text & Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left reveal-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[var(--gold-vibrant)]/25 w-max mb-6 badge-pulse">
              <span className="w-2 h-2 rounded-full bg-[var(--gold-vibrant)] shadow-[0_0_10px_var(--gold-vibrant)]"></span>
              <span className="text-xs font-jakarta font-extrabold uppercase tracking-[0.15em]" style={{ color: "var(--gold-vibrant)" }}>
                A Revolução da Pesquisa Acadêmica com IA
              </span>
            </div>
            
            <h1 className="font-jakarta font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.12] tracking-tight text-[var(--text-primary)] transition-colors">
              Pare de levantar bibliografia e de realizar<br className="hidden lg:block" />{" "}
              revisões e análises manualmente.<br />
              <span className="bg-gradient-to-r from-[var(--gold-vibrant)] via-[var(--gold-classic)] to-[var(--text-primary)] bg-clip-text text-transparent">
                Automatize sua pesquisa
              </span>{" "}em segundos.
            </h1>

            <p className="font-sans text-base md:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mt-6 transition-colors">
              O <strong>EvidentIA</strong> reúne em uma única assinatura as funcionalidades das melhores ferramentas internacionais pagas em dólar: busca integrada em tempo real, grafos de correlações, fichamento científico por IA e revisão sistemática — tudo 100% em português, com normas ABNT e APA de verdade.
            </p>

            {/* CTA Buttons in Premium Block */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a 
                href="https://chk.eduzz.com/6W4G1RYY0Z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-gold pulse-glow rounded-2xl px-8 py-5 text-center text-base md:text-lg font-extrabold shadow-[0_10px_40px_rgba(232,189,86,0.25)] transition-all hover:-translate-y-1 block cursor-pointer"
              >
                QUERO EXPERIMENTAR AGORA →
              </a>
              <a 
                href="#features" 
                onClick={(e) => handleScrollTo(e, "#features")}
                className="border border-[var(--gold-vibrant)]/30 hover:border-[var(--gold-vibrant)] text-[var(--gold-vibrant)] bg-transparent rounded-2xl px-8 py-5 font-bold hover:bg-[var(--gold-vibrant)]/10 transition-all text-center text-base md:text-lg cursor-pointer"
              >
                Recursos Completos ↓
              </a>
            </div>
          </div>

          {/* Right Column: Large Elegant Logo with 3D Parallax */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center reveal-right min-h-[360px] lg:min-h-[480px]">
            <div
              ref={logoCardRef}
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoMouseLeave}
              onMouseEnter={() => setIsHovered(true)}
              className="relative flex items-center justify-center select-none"
              style={{
                transform: `perspective(1200px) rotateX(${logoRotate.x * 0.4}deg) rotateY(${logoRotate.y * 0.4}deg)`,
                transition: isHovered ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Ambient Glow */}
              <div
                className="absolute inset-[5%] rounded-full opacity-40 blur-3xl pointer-events-none bg-gradient-to-tr from-[var(--gold-vibrant)] to-[var(--gold-classic)]"
                style={{
                  transform: `translate(${logoRotate.y * 1.5}px, ${logoRotate.x * 1.5}px)`,
                }}
              />
              {/* Logo with name — large, elegant, parallax */}
              <img
                src={theme === "light" ? "/logo_evidencIA_day.png" : "/logo_evidencIA_night.png"}
                alt="EvidentIA"
                className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-[0_0_60px_rgba(232,189,86,0.55)] pointer-events-none"
                style={{
                  transform: `translate(${logoRotate.y * 4}px, ${logoRotate.x * 4}px) scale(${isHovered ? 1.08 : 1})`,
                  transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO MARQUEE — SUBSTITUI AS MAIORES FERRAMENTAS DO MUNDO — EDGE-TO-EDGE */}
      <section 
        className="w-full py-8 border-y bg-transition overflow-hidden z-25 relative"
        style={{ 
          borderColor: "var(--card-border)", 
          backgroundColor: "var(--card-bg)" 
        }}
      >
        <div className="max-w-7xl mx-auto px-6 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2 text-left">
          <div>
            <span className="text-[10px] sm:text-xs font-mono-jet font-bold text-[var(--gold-vibrant)] uppercase tracking-widest bg-[var(--gold-vibrant)]/10 px-3 py-1 rounded-full border border-[var(--gold-vibrant)]/20 animate-pulse inline-block">
              ✦ Substituição Inteligente
            </span>
            <h4 className="font-jakarta font-extrabold text-sm sm:text-base text-[var(--text-primary)] mt-2">
              O EvidentIA unifica e substitui completamente mais de U$300/mês em softwares internacionais:
            </h4>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            Velocidade extrema • 100% em Português • Nativas ABNT/APA
          </p>
        </div>

        {/* Outer scrolling belt */}
        <div className="relative w-full overflow-hidden py-4 bg-black/5 dark:bg-black/40 border-y flex items-center" style={{ borderColor: "var(--card-border)" }}>
          {/* Subtle horizontal gradient overlays for extreme sleek gloss look */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-[var(--card-bg)] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-[var(--card-bg)] to-transparent" />

          {/* Infinity Marquee track — items duplicated 3 times for completely gap-free seamless infinity loops */}
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap shrink-0">
            {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 flex items-center hover:scale-105 transition-all duration-300 transform"
              >
                <BrandLogo name={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <span class="sc-cSHVUG sc-hMqMXs jqWiNE">
        <div>👇 ASSISTA ABAIXO ANTES QUE SAIA DO AR&nbsp;👇</div>
      </span>
    </div>

      {/* SEÇÃO VÍDEO COMPLEMENTAR — AULA GRATUITA - CASO DE USO REAL: PESQUISA BIBLIOGRÁFICA EM SEGUNDOS */}
      <section className="py-16 md:py-24 relative z-10 bg-transition" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <span className="text-[10px] sm:text-xs font-mono-jet font-bold text-[var(--gold-vibrant)] uppercase tracking-widest bg-[var(--gold-vibrant)]/10 px-3 py-1.5 rounded-full border border-[var(--gold-vibrant)]/20 animate-pulse inline-block">
              ✦ Caso de Uso Real
            </span>
            <h2 className="font-jakarta font-black text-3xl md:text-4xl lg:text-5xl text-[var(--text-primary)] mt-4 transition-colors">
              Veja o EvidentIA em Ação
            </h2>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed transition-colors">
              Um exemplo real de como pesquisadores utilizam o EvidentIA para acelerar sua revisão de literatura e produzir resultados que impressionam bancas e orientadores.
            </p>
          </div>

          <div 
            className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border bg-black aspect-video transition-all duration-300" 
            style={{ borderColor: "var(--card-border)" }}
          >
            <iframe 
              className="w-full h-full border-0"
              src="https://www.youtube.com/embed/abMIPIB5lcE" 
              title="EvidentIA em Ação — Caso de Uso Real" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            />
          </div>

          <div className="mt-10 md:mt-14 text-center">
            <a 
              href="https://chk.eduzz.com/6W4G1RYY0Z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-gold pulse-glow inline-block rounded-2xl px-12 py-5 text-base md:text-lg font-extrabold shadow-[0_10px_40px_rgba(232,189,86,0.3)] transition-all hover:-translate-y-1 cursor-pointer max-w-xs md:max-w-md w-full"
            >
              Quero Garantir o Evidentia --&gt;
            </a>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO TOUR VIRTUAL — VÍDEO COMPLETO */}
      <section className="py-16 md:py-24 relative z-10 bg-transition" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <span className="text-[10px] sm:text-xs font-mono-jet font-bold text-[var(--gold-vibrant)] uppercase tracking-widest bg-[var(--gold-vibrant)]/10 px-3 py-1.5 rounded-full border border-[var(--gold-vibrant)]/20 animate-pulse inline-block">
              ✦ Demonstração Completa
            </span>
            <h2 className="font-jakarta font-black text-3xl md:text-4xl lg:text-5xl text-[var(--text-primary)] mt-4 transition-colors">
              Tour Virtual pelo EvidentIA
            </h2>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed transition-colors">
              Assista ao vídeo abaixo para ver na prática como a nossa inteligência artificial automatiza o levantamento, classificação, fichamento e formatação da sua fundamentação teórica em segundos.
            </p>
          </div>

          <div 
            className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border bg-black aspect-video transition-all duration-300" 
            style={{ borderColor: "var(--card-border)" }}
          >
            <iframe 
              className="w-full h-full border-0"
              src="https://www.youtube.com/embed/_nzGxswKnn8" 
              title="Tour Virtual pelo EvidentIA" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            />
          </div>

          <div className="mt-10 md:mt-14 text-center">
            <a 
              href="https://chk.eduzz.com/6W4G1RYY0Z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-gold pulse-glow inline-block rounded-2xl px-12 py-5 text-base md:text-lg font-extrabold shadow-[0_10px_40px_rgba(232,189,86,0.3)] transition-all hover:-translate-y-1 cursor-pointer max-w-xs md:max-w-md w-full"
            >
              Quero Garantir o Evidentia --&gt;
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — DOR / PROBLEMA */}
      <section className="py-20 relative z-10 bg-transition" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-jakarta font-bold text-3xl md:text-4xl text-[var(--text-primary)] fade-up">
              Você Reconhece Essa Rotina?
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] fade-up">
              Fazer pesquisa científica no Brasil é um teste extremo de paciência. Veja se você já passou por isso:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full">
            {/* Cards */}
            <div className="glass-card rounded-2xl p-6 fade-up border-transparent hover:border-red-500/20 hover:bg-red-500/[0.02] hover:-translate-y-1 transition-all duration-300 bg-transition">
              <div className="text-red-400 text-2xl font-bold mb-4">⚠️</div>
              <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)]">Trabalho manual e repetitivo</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                Passa HORAS formatando referências em ABNT e mesmo assim o orientador encontra erros e devolve o texto.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 fade-up border-transparent hover:border-red-500/20 hover:bg-red-500/[0.02] hover:-translate-y-1 transition-all duration-300 bg-transition">
              <div className="text-red-400 text-2xl font-bold mb-4">⚠️</div>
              <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)]">Falta de visão panorâmica</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                Lê dezenas de abstracts no Google Scholar, um por um, sem conseguir ver o panorama geral e os caminhos temáticos.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 fade-up border-transparent hover:border-red-500/20 hover:bg-red-500/[0.02] hover:-translate-y-1 transition-all duration-300 bg-transition">
              <div className="text-red-400 text-2xl font-bold mb-4">⚠️</div>
              <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)]">Ferramentas caras em dólar</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                Paga assinaturas de ferramentas internacionais em DÓLAR que não entendem as normas ABNT nem o Qualis CAPES brasileiro.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 fade-up border-transparent hover:border-red-500/20 hover:bg-red-500/[0.02] hover:-translate-y-1 transition-all duration-300 bg-transition">
              <div className="text-red-400 text-2xl font-bold mb-4">⚠️</div>
              <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)]">Colagem sem estrutura visual</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                Monta revisões de literatura copiando e colando trechos isolados no Word, sem um nexo ou encadeamento metodológico robusto.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 fade-up border-transparent hover:border-red-500/20 hover:bg-red-500/[0.02] hover:-translate-y-1 transition-all duration-300 bg-transition">
              <div className="text-red-400 text-2xl font-bold mb-4">⚠️</div>
              <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)]">Opinião sem respaldo científico</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                Não consegue discernir se as evidências da literatura convergem ou divergem do seu tema, ficando preso ao &quot;achismo&quot;.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 fade-up border-transparent hover:border-red-500/20 hover:bg-red-500/[0.02] hover:-translate-y-1 transition-all duration-300 bg-transition">
              <div className="text-red-400 text-2xl font-bold mb-4">⚠️</div>
              <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)]">Perda de pontos cruciais</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                Entrega trabalhos acadêmicos com formatação amadora e perde notas por falhas bibliográficas que poderiam ser sanadas.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto fade-up">
            <p className="text-lg md:text-xl font-bold text-[var(--gold-vibrant)] leading-relaxed transition-colors">
              &quot;Se você respondeu &apos;sim&apos; para pelo menos UMA dessas situações, o EvidentIA foi construído especificamente para resolver TODAS elas — de uma vez.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — TRANSIÇÃO / REVELAÇÃO DO PRODUTO */}
      <section className="py-16 relative z-10 flex flex-col items-center justify-center text-center px-6 bg-transition bg-gradient-to-b" style={{ background: "linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))" }}>
        <div className="max-w-3xl">
          <h3 className="font-jakarta font-bold text-2xl md:text-3xl text-[var(--text-primary)] max-w-3xl leading-relaxed fade-up transition-colors">
            E se existisse uma plataforma que fizesse TUDO isso por você — em português, com precisão científica, e por um preço que cabe no bolso de qualquer pesquisador?
          </h3>

          {/* Glowing central icon logo */}
          <div className="my-8 relative">
            <img 
              src={theme === "light" ? "/logo_sem_nome_day.png" : "/logo_sem_nome_night.png"} 
              alt="EvidentIA Ícone" 
              className="w-20 h-20 mx-auto animate-pulse-logo transition-all duration-300"
            />
          </div>

          <p className="text-lg md:text-xl font-medium text-[var(--text-secondary)] fade-up transition-colors">
            Conheça o EvidentIA — a Central Bibliométrica com IA mais avançada do Brasil.
          </p>
        </div>
      </section>

      {/* SEÇÃO 4 — FEATURES */}
      <section id="features" className="py-20 relative z-10 w-full bg-transition" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-jakarta font-extrabold text-3xl md:text-4xl text-[var(--text-primary)] fade-up transition-colors">
              O Que o EvidentIA Faz Por Você
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] fade-up transition-colors">
              Combinamos mineração de dados em tempo real e inteligência artificial para facilitar sua rotina científica.
            </p>
          </div>

          {/* Grid de 6 features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full">
            
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-7 fade-up hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between bg-transition">
              <div>
                <div className="font-mono-jet text-[var(--gold-vibrant)] text-3xl font-bold flex items-center justify-between transition-colors">
                  <span>01</span>
                  <span>🔍</span>
                </div>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-4 transition-colors">
                  BUSCA BIBLIOMÉTRICA MULTI-FONTE
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Pesquise em OpenAlex, Crossref, Semantic Scholar, CORE e Google Scholar simultaneamente. Encontre até 500 artigos de uma vez — com metadados completos, abstract, citações e DOI verificado.
                </p>
              </div>
              <span className="badge-gold text-[10px] font-mono-jet font-semibold mt-4 px-3 py-1 rounded-full w-fit">
                5 BASES SIMULTÂNEAS
              </span>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-2xl p-7 fade-up hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between bg-transition">
              <div>
                <div className="font-mono-jet text-[var(--gold-vibrant)] text-3xl font-bold flex items-center justify-between transition-colors">
                  <span>02</span>
                  <span>🕸</span>
                </div>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-4 transition-colors">
                  GRAFOS DE CO-CITAÇÃO E SIMILARIDADE
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Visualize as conexões entre artigos em grafos interativos D3 de força-dirigida. Descubra obras seminais, trabalhos derivados e clusters temáticos — como um raio-X visual da sua área de pesquisa.
                </p>
              </div>
              <span className="badge-gold text-[10px] font-mono-jet font-semibold mt-4 px-3 py-1 rounded-full w-fit">
                ESTILO CONNECTED PAPERS
              </span>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-7 fade-up hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between bg-transition">
              <div>
                <div className="font-mono-jet text-[var(--gold-vibrant)] text-3xl font-bold flex items-center justify-between transition-colors">
                  <span>03</span>
                  <span>📊</span>
                </div>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-4 transition-colors">
                  MAPEAMENTO 3D BIBLIOMÉTRICO
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Explore seu corpus científico em uma dispersão tridimensional interativa (Plotly). Rotacione, aproxime e identifique padrões que são INVISÍVEIS em listas estáticas.
                </p>
              </div>
              <span className="badge-gold text-[10px] font-mono-jet font-semibold mt-4 px-3 py-1 rounded-full w-fit">
                EXCLUSIVO BRASIL
              </span>
            </div>

            {/* Feature 4 */}
            <div className="glass-card rounded-2xl p-7 fade-up hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between bg-transition">
              <div>
                <div className="font-mono-jet text-[var(--gold-vibrant)] text-3xl font-bold flex items-center justify-between transition-colors">
                  <span>04</span>
                  <span>🤖</span>
                </div>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-4 transition-colors">
                  FICHAMENTO AUTOMATIZADO COM IA
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Cada artigo recebe um fichamento acadêmico completo (11 campos: objetivo, metodologia, resultados, lacunas, palavras-chave, citação sugerida...) gerado por IA de nível científico — em português, formatado em ABNT.
                </p>
              </div>
              <span className="badge-gold text-[10px] font-mono-jet font-semibold mt-4 px-3 py-1 rounded-full w-fit">
                11 CAMPOS AUTOMÁTICOS
              </span>
            </div>

            {/* Feature 5 */}
            <div className="glass-card rounded-2xl p-7 fade-up hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between bg-transition">
              <div>
                <div className="font-mono-jet text-[var(--gold-vibrant)] text-3xl font-bold flex items-center justify-between transition-colors">
                  <span>05</span>
                  <span>📝</span>
                </div>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-4 transition-colors">
                  REVISÃO SISTEMÁTICA INSTANTÂNEA
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Gere RSL e RIL estruturadas em um clique. Exportáveis para Word (.DOCX) com formatação acadêmica oficial. O que levava semanas agora leva segundos.
                </p>
              </div>
              <span className="badge-gold text-[10px] font-mono-jet font-semibold mt-4 px-3 py-1 rounded-full w-fit">
                EXPORTA PARA WORD
              </span>
            </div>

            {/* Feature 6 */}
            <div className="glass-card rounded-2xl p-7 fade-up hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between bg-transition">
              <div>
                <div className="font-mono-jet text-[var(--gold-vibrant)] text-3xl font-bold flex items-center justify-between transition-colors">
                  <span>06</span>
                  <span>⚖</span>
                </div>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-4 transition-colors">
                  CONSENSO DE EVIDÊNCIAS
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Faça uma pergunta de pesquisa e o EvidentIA classifica computacionalmente o posicionamento de cada artigo (SIM / NÃO / POSSIVELMENTE). Descubra em segundos o percentual de consenso.
                </p>
              </div>
              <span className="badge-gold text-[10px] font-mono-jet font-semibold mt-4 px-3 py-1 rounded-full w-fit">
                ÚNICO NO MERCADO
              </span>
            </div>

          </div>

          <div className="mt-10 text-center text-sm text-[var(--text-secondary)] font-medium fade-up transition-colors">
            + Exportação completa: Word (.DOCX), CSV, PNG, SVG · Citações duais ABNT + APA 7ª · Modo escuro/claro · 100% online, sem instalação
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — PROVAS DE FUNCIONAMENTO EM AÇÃO (BENTO GRID GALLERY) */}
      <section id="gallery" className="py-24 relative z-10 w-full bg-transition border-t" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="badge-gold text-xs font-mono-jet font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block">
              🖥 Interface Real em Detalhes
            </span>
            <h2 className="font-jakarta font-extrabold text-3xl md:text-4xl text-[var(--text-primary)] transition-colors">
              Veja o EvidentIA em Ação
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] transition-colors">
              Nossa plataforma gera visualizações dinâmicas, grafos interativos e relatórios bibliométricos com acabamento de nível internacional. Conheça as principais telas geradas automaticamente:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-12 w-full">
            
            {/* Card A: Consenso Acadêmico */}
            <div className="lg:col-span-4 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">ESTATÍSTICA INTELIGENTE</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">
                  Consenso Acadêmico
                </h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Classificação computacional automática sobre cada posicionamento de autor em artigos.
                </p>
              </div>
              <div className="relative w-full h-56 md:h-64 overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]/55 p-4 border-t border-[var(--card-border)] bg-transition">
                <img 
                  src="/consenso_academico_Antonio_Candido__1_.png" 
                  alt="Consenso Acadêmico Clássico" 
                  className="max-h-full max-w-full object-contain rounded-lg select-none transition-transform duration-500 hover:scale-[1.025]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card B: Gráfico Trends */}
            <div className="lg:col-span-4 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">HISTÓRICO DE PRODUÇÃO</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">
                  Tendência Científica
                </h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Análise temporal precisa demonstrando o volume de discussões por períodos.
                </p>
              </div>
              <div className="relative w-full h-56 md:h-64 overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]/55 p-4 border-t border-[var(--card-border)] bg-transition">
                <img 
                  src={theme === "light" ? "/grafico_trends.png" : "/TRENDS.png"} 
                  alt="Gráfico de Tendências Temporais" 
                  className="max-h-full max-w-full object-contain rounded-lg select-none transition-transform duration-500 hover:scale-[1.025]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card C: Mapeamento 3D — DEMO INTERATIVA */}
            <div className="lg:col-span-4 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 transition-all duration-300 flex flex-col justify-between bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">VISUALIZAÇÃO ESPACIAL</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">
                  Mapeamento Tridimensional
                </h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Arraste para rotacionar, scroll para zoom, hover para ver detalhes de cada artigo.
                </p>
              </div>
              <div className="relative w-full h-56 md:h-64 overflow-hidden bg-[#030712] border-t border-[var(--card-border)]">
                <div ref={scatter3dDemoRef} className="w-full h-full" />
                {/* Demo badge */}
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm border border-[var(--gold-vibrant)]/30 rounded-full px-2.5 py-1 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-vibrant)] animate-pulse" />
                  <span className="text-[9px] font-mono-jet font-bold text-[var(--gold-vibrant)] uppercase tracking-wider">Demo · Dados Ilustrativos</span>
                </div>
                {/* Interaction hint */}
                <div className="absolute bottom-2 right-2 z-10 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5 pointer-events-none">
                  <span className="text-[8px] font-mono-jet text-[var(--text-secondary)]">arraste · rotacione · hover</span>
                </div>
              </div>
            </div>

            {/* Destaque Full Width: Rede de Similaridades */}
            <div className="lg:col-span-12 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.005] transition-all duration-300 flex flex-col lg:flex-row justify-between items-stretch bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-8 lg:w-1/3 flex flex-col justify-center text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold uppercase tracking-wider">Destaque Exclusivo</span>
                <h3 className="font-jakarta font-extrabold text-2xl text-[var(--text-primary)] mt-3 transition-colors">
                  Rede de Similaridades e Citações
                </h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Visualize relações epistemológicas diretas entre centenas de trabalhos. Identifique de forma visual os artigos mais seminais e as redes que guiam o estado da arte do seu tema.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="badge-gold text-[10px] font-mono-jet font-semibold px-3 py-1 rounded-full">D3 Force-Directed</span>
                  <span className="badge-gold text-[10px] font-mono-jet font-semibold px-3 py-1 rounded-full">Análise Vetorial</span>
                </div>
              </div>
              <div className="lg:w-2/3 h-64 md:h-[400px] relative overflow-hidden bg-[#030712]">
                <div ref={simNetDemoRef} className="w-full h-full" />
                {/* Demo badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm border border-[var(--gold-vibrant)]/30 rounded-full px-2.5 py-1 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-vibrant)] animate-pulse" />
                  <span className="text-[9px] font-mono-jet font-bold text-[var(--gold-vibrant)] uppercase tracking-wider">Demo · Dados Ilustrativos</span>
                </div>
                {/* Interaction hint */}
                <div className="absolute bottom-3 right-3 z-10 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5 pointer-events-none">
                  <span className="text-[8px] font-mono-jet text-[var(--text-secondary)]">arraste · zoom · hover nos nós</span>
                </div>
                {/* Color legend */}
                <div className="absolute top-3 right-3 z-10 bg-black/55 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 pointer-events-none space-y-1">
                  {[["#E8BD56","2023–2025 (recentes)"],["#848559","2020–2022"],["#40585E","Antes de 2020"]].map(([c,l]) => (
                    <div key={l} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c }} />
                      <span className="text-[8px] font-mono-jet text-[var(--text-secondary)]">{l}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-1 pt-1 border-t border-white/10">
                    <span className="text-[8px] font-mono-jet text-[var(--text-secondary)]">● tamanho = nº citações</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card D: Rede de Co-autoria — DEMO INTERATIVA */}
            <div className="lg:col-span-6 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 transition-all duration-300 flex flex-col justify-between bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6 text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">PARCERIAS CIENTÍFICAS</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">
                  Rede de Co-autoria
                </h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Arraste os nós, zoom com scroll — identifique grupos de colaboração entre pesquisadores.
                </p>
              </div>
              <div className="relative w-full h-[280px] overflow-hidden bg-[#030712] border-t border-[var(--card-border)]">
                <div ref={coauthorDemoRef} className="w-full h-full" />
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm border border-[var(--gold-vibrant)]/30 rounded-full px-2.5 py-1 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-vibrant)] animate-pulse" />
                  <span className="text-[9px] font-mono-jet font-bold text-[var(--gold-vibrant)] uppercase tracking-wider">Demo · Dados Ilustrativos</span>
                </div>
                <div className="absolute bottom-2 right-2 z-10 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5 pointer-events-none">
                  <span className="text-[8px] font-mono-jet text-[var(--text-secondary)]">arraste · zoom · hover</span>
                </div>
              </div>
            </div>

            {/* Card E: Gráfico Journals */}
            <div className="lg:col-span-6 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6 text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">PERIÓDICOS EM DESTAQUE</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">
                  Impacto por Periódicos / Journals
                </h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Identifique os journals e canais mais influentes e relevantes sobre o seu tema.
                </p>
              </div>
              <div className="relative w-full h-56 md:h-64 overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]/55 p-4 border-t border-[var(--card-border)] bg-transition">
                <img 
                  src={theme === "light" ? "/grafico_journals__1_.png" : "/JORNAIS.png"} 
                  alt="Distribuição e Impacto por Journals" 
                  className="max-h-full max-w-full object-contain rounded-lg select-none transition-transform duration-500 hover:scale-[1.025]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card F: Gráfico Countries */}
            <div className="lg:col-span-6 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6 text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">PRODUÇÃO GEOGRÁFICA</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">
                  Distribuição por Países
                </h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Analise quais regiões do mundo lideram os estudos e geram mais ciência no seu tema.
                </p>
              </div>
              <div className="relative w-full h-56 md:h-64 overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]/55 p-4 border-t border-[var(--card-border)] bg-transition">
                <img 
                  src={theme === "light" ? "/grafico_countries.png" : "/PAISES.png"} 
                  alt="Distribuição Global por Países" 
                  className="max-h-full max-w-full object-contain rounded-lg select-none transition-transform duration-500 hover:scale-[1.025]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card G: Gráfico de Autores */}
            <div className="lg:col-span-6 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6 text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">PRODUTIVIDADE INDIVIDUAL</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">
                  Ranking dos Principais Autores
                </h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Encontre os pesquisadores de referência nacional e internacional mais citados no nicho.
                </p>
              </div>
              <div className="relative w-full h-56 md:h-64 overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]/55 p-4 border-t border-[var(--card-border)] bg-transition">
                <img 
                  src={theme === "light" ? "/grafico_authors.png" : "/AUTORES.png"} 
                  alt="Ranking de Autores Influentes" 
                  className="max-h-full max-w-full object-contain rounded-lg select-none transition-transform duration-500 hover:scale-[1.025]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card H: Fichamento Acadêmico com IA */}
            <div className="lg:col-span-6 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6 text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">ANÁLISE INTELIGENTE</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">Fichamento Acadêmico com IA</h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  11 campos gerados automaticamente: objetivo, metodologia, resultados, lacunas, citação ABNT e APA.
                </p>
              </div>
              <div className="px-4 pb-4 flex-1">
                <div className="rounded-xl border bg-transition p-3 space-y-2 h-full" style={{ borderColor:"var(--card-border)", backgroundColor:"var(--bg-secondary)" }}>
                  <div className="text-[8px] font-mono-jet font-bold text-[var(--gold-vibrant)] uppercase tracking-widest text-center border-b pb-1.5" style={{ borderColor:"var(--card-border)" }}>
                    PEMBROKE COLLINS · FICHA DE FICHAMENTO CIENTÍFICO
                  </div>
                  {[
                    ["TÍTULO DA OBRA","Reflexões sobre o Ativismo Judicial e o Neoconstitucionalismo"],
                    ["TEMA CENTRAL","Ativismo judicial sob perspectiva do neoconstitucionalismo e hermenêutica constitucional contemporânea."],
                    ["METODOLOGIA","Pesquisa qualitativa — análise doutrinária, normativa e jurisprudencial sobre limites do ativismo."],
                    ["RESULTADOS","Autores concluem que ativismo é resposta a lacunas, mas requer limites democráticos claros."],
                    ["CONTRIBUIÇÃO","Debate sobre papel do judiciário na democracia; propõe critérios de autocontenção judicial."],
                  ].map(([label, text]) => (
                    <div key={label} className="space-y-0.5">
                      <div className="text-[7px] font-bold text-[var(--gold-classic)] uppercase tracking-wide">{label}:</div>
                      <div className="text-[8px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">{text}</div>
                    </div>
                  ))}
                  <div className="text-[7px] font-mono-jet text-[var(--text-secondary)] text-center pt-1 border-t" style={{ borderColor:"var(--card-border)" }}>
                    Metodologia Exclusiva Felipe Asensi · ABNT NBR 6023 + APA 7ª ed.
                  </div>
                </div>
              </div>
            </div>

            {/* Card I: Motor de Revisões de Literatura */}
            <div className="lg:col-span-6 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6 text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">IA LITERÁRIA EXCLUSIVA</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">Motor de Revisões de Literatura</h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  RSL, RIL, RBL ou Relatório Híbrido — gerados em português com metodologia PRISMA/PICO.
                </p>
              </div>
              <div className="px-4 pb-4 flex-1">
                <div className="rounded-xl border bg-transition p-3 space-y-2.5 h-full" style={{ borderColor:"var(--card-border)", backgroundColor:"var(--bg-secondary)" }}>
                  <div className="grid grid-cols-4 gap-1">
                    {[["RSL","Sistemática",true],["RIL","Integrativa",false],["RBL","Bibliométrica",false],["MISTO","Híbrido IA",false]].map(([tag,name,sel]) => (
                      <div key={String(tag)} className={`rounded-lg p-1.5 border text-center transition-colors ${sel ? "border-[var(--gold-vibrant)] bg-[var(--gold-vibrant)]/10" : "border-[var(--card-border)]"}`}>
                        <div className={`text-[8px] font-mono-jet font-bold ${sel ? "text-[var(--gold-vibrant)]" : "text-[var(--text-secondary)]"}`}>{tag}</div>
                        <div className="text-[7px] text-[var(--text-secondary)]">{name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-2 border" style={{ borderColor:"var(--card-border)" }}>
                    <div className="text-[7px] font-mono-jet font-bold text-[var(--text-secondary)] uppercase mb-1">Pergunta Norteadora</div>
                    <div className="text-[8px] text-[var(--text-primary)] leading-relaxed">Quais as principais evidências científicas sobre Judicialização da Política AND Politização do Judiciário?</div>
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-2 border text-[8px] text-[var(--text-secondary)]" style={{ borderColor:"var(--card-border)" }}>
                    📚 Corpus Metodológico Ativo — <span className="text-[var(--gold-vibrant)] font-bold">50 artigos indexados e prontos</span>
                  </div>
                  <div className="btn-gold rounded-lg py-1.5 text-center text-[9px] font-bold cursor-default select-none">
                    ✦ Gerar Revisão de Literatura por IA
                  </div>
                </div>
              </div>
            </div>

            {/* Card J: Relatórios & Exportações */}
            <div className="lg:col-span-4 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6 text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">EXPORTAÇÃO COMPLETA</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">Relatórios em Todos os Formatos</h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  KPIs, grafos, tabelas e revisões — exportáveis em 6 formatos prontos para entrega.
                </p>
              </div>
              <div className="px-4 pb-4 flex-1">
                <div className="rounded-xl border bg-transition p-3 space-y-2" style={{ borderColor:"var(--card-border)", backgroundColor:"var(--bg-secondary)" }}>
                  <div className="text-[8px] font-mono-jet text-[var(--text-secondary)] uppercase tracking-wider">Exportar KPIs e Relatório Completo:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[["📊","Excel (.xlsx)"],["📝","Word (.docx)"],["📋","CSV"],["🌐","HTML"],["🖼","SVG"],["🖼","PNG"]].map(([ico,fmt]) => (
                      <span key={fmt} className="flex items-center gap-1 bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-md px-2 py-1 text-[8px] font-mono-jet text-[var(--text-secondary)] cursor-default hover:border-[var(--gold-vibrant)]/40 transition-colors">
                        <span>{ico}</span><span>{fmt}</span>
                      </span>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-2 gap-1.5 text-[8px]">
                    {[["50","Artigos indexados"],["7","H-Index calculado"],["58%","Open Access"],["1994–2026","Cobertura temporal"]].map(([val,lbl]) => (
                      <div key={lbl} className="bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-lg p-1.5 text-center">
                        <div className="font-extrabold text-[var(--gold-vibrant)] text-[11px]">{val}</div>
                        <div className="text-[var(--text-secondary)] text-[7px]">{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card K: Download PDFs Open Access */}
            <div className="lg:col-span-4 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6 text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">ACESSO ABERTO</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">Download de PDFs Open Access</h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Acesso legal via Unpaywall e CORE — baixe o PDF completo direto pela plataforma.
                </p>
              </div>
              <div className="px-4 pb-4 flex-1">
                <div className="rounded-xl border bg-transition p-3 space-y-2" style={{ borderColor:"var(--card-border)", backgroundColor:"var(--bg-secondary)" }}>
                  {[
                    { title:"Reflexões sobre o Ativismo Judicial", authors:"Rocco Antônio et al.", year:2015, oa:true },
                    { title:"Judicialização da Política e Democracia", authors:"Fabiano Engelmann", year:2020, oa:true },
                    { title:"Neoconstitucionalismo Brasileiro", authors:"Dirley da Cunha Jr.", year:2018, oa:false },
                  ].map((p) => (
                    <div key={p.title} className="flex items-center justify-between gap-2 border-b last:border-0 pb-2 last:pb-0" style={{ borderColor:"var(--card-border)" }}>
                      <div className="flex-1 min-w-0">
                        <div className="text-[8px] font-bold text-[var(--text-primary)] leading-tight line-clamp-1">{p.title}</div>
                        <div className="text-[7px] text-[var(--text-secondary)]">{p.authors} · {p.year}</div>
                      </div>
                      <span className={`flex-shrink-0 text-[7px] font-bold rounded-full px-2 py-0.5 ${p.oa ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                        {p.oa ? "🔓 PDF" : "🔒 Pago"}
                      </span>
                    </div>
                  ))}
                  <div className="btn-gold rounded-lg py-1.5 text-center text-[9px] font-bold cursor-default select-none mt-1">
                    🔓 Baixar PDF Open Access
                  </div>
                  <div className="text-[7px] font-mono-jet text-[var(--text-secondary)] text-center">Via Unpaywall · CORE · arXiv</div>
                </div>
              </div>
            </div>

            {/* Card L: Sínteses Transversais IA */}
            <div className="lg:col-span-4 glass-card rounded-2xl overflow-hidden hover:border-[var(--gold-vibrant)]/30 hover:scale-[1.01] transition-all duration-300 flex flex-col bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div className="p-6 text-left">
                <span className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-bold">SÍNTESES COM IA</span>
                <h3 className="font-jakarta font-bold text-lg text-[var(--text-primary)] mt-2 transition-colors">Sínteses Transversais por IA</h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed transition-colors">
                  Convergências, divergências e lacunas — exportáveis em .docx com citações ABNT automáticas.
                </p>
              </div>
              <div className="px-4 pb-4 flex-1">
                <div className="rounded-xl border bg-transition p-3 space-y-2" style={{ borderColor:"var(--card-border)", backgroundColor:"var(--bg-secondary)" }}>
                  <div className="text-[7px] font-mono-jet font-bold text-[var(--gold-vibrant)] uppercase tracking-widest mb-1">SÍNTESES TRANSVERSAIS IA — Em Português-BR + ABNT</div>
                  {[
                    { icon:"📗", label:"Convergências da Literatura", desc:"Consensos teóricos e abordagens empíricas comuns entre os artigos." },
                    { icon:"📙", label:"Divergências da Literatura", desc:"Controvérsias e contrapontos entre as teses mapeadas." },
                    { icon:"📘", label:"Lacunas mais Recorrentes", desc:"Pontos cegos metodológicos e agendas de pesquisa futura." },
                  ].map((s) => (
                    <div key={s.label} className="flex items-start gap-2 bg-[var(--bg-primary)] rounded-lg p-2 border" style={{ borderColor:"var(--card-border)" }}>
                      <span className="text-base flex-shrink-0">{s.icon}</span>
                      <div>
                        <div className="text-[8px] font-bold text-[var(--text-primary)]">{s.label}</div>
                        <div className="text-[7px] text-[var(--text-secondary)] leading-relaxed">{s.desc}</div>
                        <div className="text-[7px] text-[var(--gold-vibrant)] font-bold mt-0.5 cursor-default">↓ Baixar Relatório (.doc)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — AUTORIDADE / QUEM CRIOU */}
      <section id="author" className="py-20 relative z-10 bg-transition" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Box: Photo */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Premium glowing background behind the picture */}
              <div 
                className="absolute -inset-6 rounded-3xl opacity-25 blur-3xl pointer-events-none" 
                style={{ background: "radial-gradient(circle, var(--gold-vibrant) 0%, transparent 70%)" }} 
              />
              
              <div 
                className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] rounded-2xl overflow-hidden border-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                style={{ borderColor: "rgba(232,189,86,0.3)" }}
              >
                <img 
                  ref={authorPhRef}
                  src="/felipe-asensi-4-1-765x1024.png"
                  alt="Prof. Dr. Felipe Asensi — Fundador do EvidentIA"
                  className="object-cover w-full h-auto min-h-[380px] sm:min-h-[440px] md:min-h-[500px] block select-none will-change-transform"
                  style={{ 
                    transform: "translateY(0px) translateZ(0)",
                    transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)" 
                  }}
                  loading="eager"
                />
                {/* Smooth premium bottom fade transition */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20" 
                  style={{ 
                    background: "linear-gradient(to top, var(--bg-primary) 5%, transparent 100%)"
                  }}
                />
              </div>
            </div>

            {/* Right Box: Bio Info */}
            <div className="lg:col-span-7 flex flex-col text-left justify-center fade-up">
              <div className="badge-gold text-xs font-mono-jet font-bold uppercase tracking-widest w-fit px-3 py-1.5 rounded-full mb-4">
                CRIADOR DO EVIDENTIA
              </div>

              <h2 className="font-jakarta font-extrabold text-3xl md:text-4xl text-[var(--text-primary)] transition-colors">
                Prof. Dr. Felipe Asensi
              </h2>

              <div className="h-0.5 w-16 bg-[var(--gold-vibrant)] my-4" />

              <div className="font-sans text-[var(--text-secondary)] text-sm md:text-base leading-relaxed space-y-4 font-normal transition-colors">
                <p>
                  Felipe Asensi é criador do Movimento #MaisClareza #MenosMistério que tem alavancado a vida acadêmica de mentorados de todas as áreas do conhecimento em mais de 47 países.
                </p>
                <p>
                  Pioneiro no mundo em cursos e treinamentos sobre inteligência artificial na vida acadêmica, Asensi é Autor BestSeller na Amazon e tem centenas de livros e artigos científicos. Também realiza consultorias acadêmicas para instituições de ensino e possui atuação como professor e pesquisador no Brasil, Estados Unidos, Colômbia e Portugal.
                </p>
                <p>
                  Asensi é CEO da Pembroke Collins, uma ScienceTech americana que possui mais de 30.000 clientes ao redor do mundo. Criou o EvidentIA porque viveu na pele o problema que todo pesquisador enfrenta: a distância brutal entre ter uma ideia brilhante e conseguir executá-la com rigor, velocidade e formatação impecável.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="glass-card rounded-full px-3 py-1.5 text-xs font-mono-jet text-[var(--text-secondary)] border bg-transition" style={{ borderColor: "var(--card-border)" }}>
                  🎓 Doutor em Sociologia (IESP/UERJ)
                </span>
                <span className="glass-card rounded-full px-3 py-1.5 text-xs font-mono-jet text-[var(--text-secondary)] border bg-transition" style={{ borderColor: "var(--card-border)" }}>
                  🎓 Doutor em Direito (UGF/IUPERJ)
                </span>
                <span className="glass-card rounded-full px-3 py-1.5 text-xs font-mono-jet text-[var(--text-secondary)] border bg-transition" style={{ borderColor: "var(--card-border)" }}>
                  📚 Professor Universitário — BR, EUA, CO, PT
                </span>
                <span className="glass-card rounded-full px-3 py-1.5 text-xs font-mono-jet text-[var(--text-secondary)] border bg-transition" style={{ borderColor: "var(--card-border)" }}>
                  🧬 Pesquisador Ativo
                </span>
                <span className="glass-card rounded-full px-3 py-1.5 text-xs font-mono-jet text-[var(--text-secondary)] border bg-transition" style={{ borderColor: "var(--card-border)" }}>
                  🏢 CEO Pembroke Collins (ScienceTech USA)
                </span>
                <span className="glass-card rounded-full px-3 py-1.5 text-xs font-mono-jet text-[var(--text-secondary)] border bg-transition" style={{ borderColor: "var(--card-border)" }}>
                  📖 Autor BestSeller Amazon
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — COMPARATIVO DE PREÇO (Anchor Pricing) */}
      <section className="py-20 relative z-10 border-t bg-transition" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-jakarta font-bold text-3xl md:text-4xl text-[var(--text-primary)] fade-up transition-colors">
              Quanto Você Pagaria Por Tudo Isso?
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] fade-up transition-colors">
              Comparação transparente: o custo real mensal das alternativas internacionais em dólar versus a praticidade nacional em português com ABNT nativa.
            </p>
          </div>

          {/* VIP Premium comparison layout */}
          <div className="mt-12 max-w-5xl mx-auto fade-up grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

            {/* Competitors column */}
            <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden border bg-transition flex flex-col" style={{ borderColor:"var(--card-border)" }}>
              {/* Header */}
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor:"var(--card-border)", backgroundColor:"rgba(239,68,68,0.05)" }}>
                <div>
                  <span className="text-xs font-mono-jet font-bold text-red-400 uppercase tracking-wider">Concorrentes — Custo Mensal</span>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Preços praticados em dólar, sem suporte a normas ABNT</p>
                </div>
              </div>
              {/* Rows */}
              {[
                ["Connected Papers","US$ 20","R$ 102,00"],
                ["Elicit","US$ 79","R$ 402,90"],
                ["SciSpace","US$ 200","R$ 1.020,00"],
                ["Consensus","US$ 45","R$ 229,50"],
                ["LitMaps","US$ 8","R$ 40,80"],
                ["Research Rabbit","US$ 10","R$ 51,00"],
              ].map(([name, usd, brl]) => (
                <div key={name} className="flex items-center justify-between px-6 py-3 border-b transition-colors hover:bg-red-500/5 bg-transition" style={{ borderColor:"var(--card-border)" }}>
                  <span className="font-semibold text-[var(--text-primary)] text-sm">{name}</span>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[var(--text-secondary)] text-xs font-mono-jet">{usd}/mês</span>
                    <span className="font-bold text-red-400 text-sm">{brl}</span>
                    <span className="hidden sm:inline text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5">❌ Sem ABNT</span>
                  </div>
                </div>
              ))}
              {/* Total row */}
              <div className="px-6 py-4 mt-auto flex items-center justify-between" style={{ backgroundColor:"rgba(239,68,68,0.07)" }}>
                <span className="font-extrabold text-red-400 text-sm font-mono-jet uppercase tracking-wide">SOMA / MÊS</span>
                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-red-400 font-mono-jet">US$ 362</span>
                  <span className="font-extrabold text-red-400 text-xl font-jakarta">R$ 1.846/mês</span>
                </div>
              </div>
            </div>

            {/* EvidentIA premium column */}
            <div className="relative flex flex-col rounded-2xl overflow-hidden bg-transition" style={{ boxShadow:"0 0 80px rgba(232,189,86,0.18), 0 20px 60px rgba(0,0,0,0.2)" }}>
              <div className="h-1.5 w-full bg-gradient-to-r from-[var(--gold-classic)] via-[var(--gold-vibrant)] to-[var(--gold-classic)] animate-shimmer-bar" />
              <div className="glass-card flex-1 flex flex-col p-6 border border-t-0 text-center gap-3 rounded-b-2xl bg-transition" style={{ borderColor:"rgba(232,189,86,0.35)" }}>
                <span className="badge-pulse badge-gold text-[10px] font-mono-jet font-bold uppercase px-3 py-1.5 rounded-full mx-auto">🚀 EvidentIA</span>
                <div className="text-xs text-[var(--text-secondary)] line-through mt-1">R$ 1.846/mês se separado</div>
                <div className="font-jakarta font-extrabold text-3xl sm:text-4xl text-[var(--gold-vibrant)] leading-[1.2] my-1">
                  12x 41,06 (BRL)<br/>
                  <span className="text-sm font-semibold text-[var(--text-secondary)]">ou 397,00 (BRL) à vista</span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] font-semibold">por ANO inteiro · cerca de R$1/dia</div>
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold-vibrant)]/30 to-transparent" />
                <div className="text-[11px] font-mono-jet text-[var(--gold-vibrant)] font-bold bg-[var(--gold-vibrant)]/10 rounded-full px-3 py-1.5">
                  Substitui TODAS as ferramentas
                </div>
                <div className="text-emerald-400 font-extrabold text-sm">✅ ABNT + APA Nativas</div>
                <div className="text-[var(--text-secondary)] text-xs">10+ ferramentas em uma única assinatura</div>
                {/* Savings */}
                <div className="mt-auto w-full bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-3">
                  <div className="text-emerald-400 text-[10px] font-mono-jet uppercase tracking-wider">Você economiza</div>
                  <div className="text-emerald-400 font-extrabold text-2xl font-jakarta">R$ 21.855</div>
                  <div className="text-emerald-400/70 text-[10px]">por ano vs. contratar separado</div>
                </div>
                <a href="#pricing" className="btn-gold rounded-xl py-3 text-xs font-extrabold text-center block mt-1">
                  GARANTIR AGORA →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 8 — PREÇO E CTA PRINCIPAL (#pricing) */}
      <section id="pricing" className="py-24 relative z-10 border-t bg-transition" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Section eyebrow */}
          <div className="text-center mb-12 fade-up">
            <span className="badge-gold text-xs font-mono-jet font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              💎 ACESSO VIP ANUAL
            </span>
            <h2 className="font-jakarta font-extrabold text-3xl md:text-4xl text-[var(--text-primary)] mt-5 transition-colors">
              Garanta Seu Acesso Completo Agora
            </h2>
            <p className="mt-3 text-base text-[var(--text-secondary)] max-w-xl mx-auto transition-colors">
              Uma única assinatura. Todas as ferramentas. Suporte ao vivo. Tudo em português, com ABNT nativa.
            </p>
          </div>

          {/* VIP Card */}
          <div className="max-w-2xl mx-auto fade-up">
            {/* Animated gold top bar */}
            <div className="h-1 rounded-t-3xl bg-gradient-to-r from-[var(--gold-classic)] via-[var(--gold-vibrant)] to-[var(--gold-classic)] bg-[length:200%_100%] animate-shimmer-bar" />

            <div
              className="glass-card rounded-b-3xl p-8 md:p-12 border border-t-0 bg-transition"
              style={{
                borderColor: "rgba(232,189,86,0.3)",
                boxShadow: "0 0 120px rgba(232,189,86,0.14), 0 30px 80px rgba(0,0,0,0.25), inset 0 1px 0 rgba(232,189,86,0.08)",
              }}
            >
              {/* Badge row */}
              <div className="flex justify-center">
                <span className="badge-pulse badge-gold text-xs font-mono-jet font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                  🔥 OFERTA DE LANÇAMENTO · VAGAS LIMITADAS
                </span>
              </div>

              {/* Price block */}
              <div className="text-center mt-8">
                <p className="text-[var(--text-secondary)] line-through text-lg transition-colors">De R$ 4.000/ano</p>
                <div className="mt-1 font-jakarta font-extrabold text-7xl md:text-8xl text-[var(--gold-vibrant)] flex items-start justify-center gap-1 transition-colors">
                  <span className="text-2xl md:text-3xl font-bold font-sans mt-4">R$</span>
                  <span>{count}</span>
                  <span className="text-2xl md:text-3xl font-bold font-sans mt-4">,00</span>
                </div>
                <p className="mt-2 text-lg text-[var(--text-primary)] font-semibold transition-colors">
                  em até <span className="text-[var(--gold-vibrant)] font-extrabold">12x 41,06 (BRL)</span> ou <span className="text-[var(--gold-vibrant)] font-extrabold">397,00 (BRL) à vista</span>
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)] transition-colors">Assinatura Anual · Acesso Imediato · Sem limite de uso</p>
              </div>

              {/* Gold divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold-vibrant)]/35 to-transparent my-8" />

              {/* Inclusions list */}
              <p className="text-xs font-mono-jet font-bold uppercase tracking-widest text-[var(--gold-vibrant)] mb-5 text-center transition-colors">
                O QUE ESTÁ INCLUÍDO
              </p>
              <div className="space-y-3">
                {[
                  "Busca em diversas bases simultâneas — até 500 artigos por pesquisa",
                  "Grafos interativos de co-citação e similaridade (D3)",
                  "Mapeamento 3D bibliométrico Plotly — exclusivo Brasil",
                  "Fichamento automático com IA — 11 campos ABNT + APA",
                  "Revisão Sistemática (RSL/RIL) exportável para Word",
                  "Consenso de Evidências por IA — único no mercado",
                  "Encontros quinzenais ao vivo com a equipe do Prof. Asensi",
                  "4 Bônus Exclusivos (valor original: R$488)",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/25">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              {/* Gold divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold-vibrant)]/35 to-transparent my-8" />

              {/* CTA */}
              <a
                href="https://chk.eduzz.com/6W4G1RYY0Z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold pulse-glow w-full rounded-2xl py-6 text-lg md:text-xl font-extrabold shadow-lg transition-all duration-300 block text-center"
              >
                GARANTIR MINHA ASSINATURA VIP ANUAL →
              </a>

              {/* Trust row */}
              <div className="mt-5 flex flex-col items-center gap-2">
                <p className="text-xs text-[var(--text-secondary)] font-medium flex items-center justify-center gap-2 transition-colors">
                  🔒 Pagamento seguro via Eduzz · Pix, Cartão, Boleto
                </p>
                <p className="text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors" style={{ color: "var(--gold-vibrant)" }}>
                  <Shield className="w-3.5 h-3.5" /> Garantia de 7 dias — satisfação total ou reembolso integral
                </p>
              </div>

              <p className="mt-6 text-red-500 dark:text-red-400 text-sm font-bold text-center leading-relaxed transition-colors">
                ⚠️ Após o lançamento, o preço sobe para R$497. Esta oferta pode encerrar a qualquer momento.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO 9 — BÔNUS (Temporariamente Oculto) */}
      {false && (
        <section className="py-20 relative z-10 border-t bg-transition" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-primary)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-jakarta font-bold text-3xl text-[var(--text-primary)] fade-up transition-colors">
                Bônus Exclusivos Para Quem Garantir Agora
              </h2>
              <p className="mt-3 text-base text-[var(--text-secondary)] fade-up transition-colors">
                Além da assinatura anual à ferramenta mais moderna de pesquisa, você leva estes recursos sem custo adicional:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full">
              
              {/* Bonus 1 */}
              <div className="glass-card rounded-2xl p-6 border-2 border-dashed border-[var(--gold-vibrant)]/25 hover:border-[var(--gold-vibrant)]/45 transition-all duration-300 fade-up bg-transition">
                <span className="badge-gold text-xs font-mono-jet font-bold px-3 py-1 rounded-full">BÔNUS 1</span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-3 transition-colors">Manual Premium de Redação Científica</h3>
                <p className="text-sm text-[var(--text-secondary)] italic mt-2 transition-colors">
                  Um e-book completo e direto ensinando a encadear argumentos científicos, do título à conclusão, sem mistérios.
                </p>
                <div className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-semibold mt-4 transition-colors">Valor: Grátis (Original: R$97)</div>
              </div>

              {/* Bonus 2 */}
              <div className="glass-card rounded-2xl p-6 border-2 border-dashed border-[var(--gold-vibrant)]/25 hover:border-[var(--gold-vibrant)]/45 transition-all duration-300 fade-up bg-transition">
                <span className="badge-gold text-xs font-mono-jet font-bold px-3 py-1 rounded-full">BÔNUS 2</span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-3 transition-colors">Template estruturado de Artigo em Word</h3>
                <p className="text-sm text-[var(--text-secondary)] italic mt-2 transition-colors">
                  Estrutura pré-formatada nas principais regras ABNT para que você comece seu artigo acadêmico sem tela em branco.
                </p>
                <div className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-semibold mt-4 transition-colors">Valor: Grátis (Original: R$47)</div>
              </div>

              {/* Bonus 3 */}
              <div className="glass-card rounded-2xl p-6 border-2 border-dashed border-[var(--gold-vibrant)]/25 hover:border-[var(--gold-vibrant)]/45 transition-all duration-300 fade-up bg-transition">
                <span className="badge-gold text-xs font-mono-jet font-bold px-3 py-1 rounded-full">BÔNUS 3</span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-3 transition-colors">Workshop Exclusivo &quot;IA na Prática&quot;</h3>
                <p className="text-sm text-[var(--text-secondary)] italic mt-2 transition-colors">
                  Gravação do treinamento ministrado pelo Dr. Felipe Asensi demonstrando o ciclo completo de revisão de literatura com IA.
                </p>
                <div className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-semibold mt-4 transition-colors">Valor: Grátis (Original: R$197)</div>
              </div>

              {/* Bonus 4 */}
              <div className="glass-card rounded-2xl p-6 border-2 border-dashed border-[var(--gold-vibrant)]/25 hover:border-[var(--gold-vibrant)]/45 transition-all duration-300 fade-up bg-transition">
                <span className="badge-gold text-xs font-mono-jet font-bold px-3 py-1 rounded-full">BÔNUS 4</span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-3 transition-colors">Grupo de Apoio e Novidades</h3>
                <p className="text-sm text-[var(--text-secondary)] italic mt-2 transition-colors">
                  Comunidade ativa com moderadores para sanar dúvidas operacionais e dar dicas sobre novos recursos da Pembroke Collins.
                </p>
                <div className="text-[var(--gold-vibrant)] text-xs font-mono-jet font-semibold mt-4 transition-colors">Valor: Grátis (Original: R$147)</div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* SEÇÃO 9.5 — SUPORTE AO VIVO QUINZENAL */}
      <section className="py-24 relative z-10 border-t bg-transition overflow-hidden" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-primary)" }}>
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl pointer-events-none bg-[var(--gold-vibrant)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Text side */}
            <div className="flex flex-col justify-center reveal-left">
              <span className="badge-gold text-xs font-mono-jet font-bold uppercase tracking-widest px-3 py-1.5 rounded-full w-fit mb-5">
                🎙 SUPORTE AO VIVO
              </span>

              <h2 className="font-jakarta font-extrabold text-3xl md:text-4xl text-[var(--text-primary)] leading-tight transition-colors">
                E mais —{" "}
                <span className="bg-gradient-to-r from-[var(--gold-vibrant)] via-[var(--gold-classic)] to-[var(--text-primary)] bg-clip-text text-transparent">
                  Encontros Quinzenais
                </span>
                {" "}ao Vivo
              </h2>

              <div className="h-0.5 w-16 bg-[var(--gold-vibrant)] my-5" />

              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed transition-colors">
                Suporte para você tirar suas dúvidas diretamente com a equipe do{" "}
                <strong className="text-[var(--text-primary)]">Prof. Felipe Asensi</strong> — a cada 15 dias, ao vivo, em tempo real.
              </p>

              <div className="mt-7 space-y-3.5">
                {[
                  "Sessões ao vivo a cada 15 dias, sem faltar",
                  "Tire dúvidas operacionais direto com a equipe",
                  "Receba dicas exclusivas de pesquisa acadêmica",
                  "Acesso antecipado a novos recursos do EvidentIA",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center bg-[var(--gold-vibrant)]/10 border border-[var(--gold-vibrant)]/35">
                      <Check className="w-3 h-3 text-[var(--gold-vibrant)]" />
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="https://chk.eduzz.com/6W4G1RYY0Z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold rounded-2xl px-8 py-4 text-base font-extrabold inline-block text-center transition-all"
                >
                  COMO VIVI ATÉ HOJE SEM ISSO?! →
                </a>
              </div>
            </div>

            {/* Image side */}
            <div className="relative flex items-center justify-center reveal-right">
              {/* Glow behind image */}
              <div className="absolute inset-[10%] rounded-3xl opacity-20 blur-3xl bg-gradient-to-tr from-[var(--gold-vibrant)] to-[var(--gold-classic)] pointer-events-none" />
              <div
                className="relative rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl border bg-transition"
                style={{
                  borderColor: "rgba(232,189,86,0.25)",
                  boxShadow: "0 0 60px rgba(232,189,86,0.1), 0 20px 60px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src="/suporte.png"
                  alt="Encontros quinzenais ao vivo — suporte com equipe do Prof. Felipe Asensi"
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 10 — FAQ (Accordion) */}
      <section className="py-20 relative z-10 border-t bg-transition" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-jakarta font-bold text-3xl text-[var(--text-primary)] fade-up transition-colors">
              Perguntas Frequentes
            </h2>
            <p className="mt-3 text-base text-[var(--text-secondary)] fade-up transition-colors">
              Restou alguma dúvida? Compilamos as principais respostas para você se decidir com segurança.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mt-10 space-y-3 fade-up">
            
            {/* FAQ Item 1 */}
            <div className="faq-item glass-card rounded-xl overflow-hidden transition-all duration-300 border bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div 
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                className="faq-header flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-[var(--bg-primary)]/40 transition-colors bg-transition"
              >
                <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)] transition-colors">Preciso instalar algo no computador?</h3>
                <span className="faq-icon text-[var(--gold-vibrant)] text-sm transition-transform duration-300" style={{ transform: activeFaq === 1 ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </div>
              <div 
                className="faq-body transition-all duration-350 ease-in-out overflow-hidden"
                style={{ maxHeight: activeFaq === 1 ? "200px" : "0px" }}
              >
                <div className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  Não. O EvidentIA funciona 100% online, direto no navegador. Funciona no computador, tablet e celular.
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="faq-item glass-card rounded-xl overflow-hidden transition-all duration-300 border bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div 
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                className="faq-header flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-[var(--bg-primary)]/40 transition-colors bg-transition"
              >
                <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)] transition-colors">Como funciona a assinatura do EvidentIA?</h3>
                <span className="faq-icon text-[var(--gold-vibrant)] text-sm transition-transform duration-300" style={{ transform: activeFaq === 2 ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </div>
              <div 
                className="faq-body transition-all duration-350 ease-in-out overflow-hidden"
                style={{ maxHeight: activeFaq === 2 ? "200px" : "0px" }}
              >
                <div className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  O EvidentIA é comercializado em formato de assinatura anual. Você garante 1 ano inteiro de suporte total, atualizações, buscas ilimitadas nas bases e formatação acadêmica por em até 12x 41,06 (BRL) ou 397,00 (BRL) à vista.
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="faq-item glass-card rounded-xl overflow-hidden transition-all duration-300 border bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div 
                onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
                className="faq-header flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-[var(--bg-primary)]/40 transition-colors bg-transition"
              >
                <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)] transition-colors">As referências seguem a ABNT atualizada?</h3>
                <span className="faq-icon text-[var(--gold-vibrant)] text-sm transition-transform duration-300" style={{ transform: activeFaq === 3 ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </div>
              <div 
                className="faq-body transition-all duration-350 ease-in-out overflow-hidden"
                style={{ maxHeight: activeFaq === 3 ? "200px" : "0px" }}
              >
                <div className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  Sim. O EvidentIA segue a NBR 6023 na versão mais recente, além da APA 7ª edição. Citações duais automáticas.
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="faq-item glass-card rounded-xl overflow-hidden transition-all duration-300 border bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div 
                onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}
                className="faq-header flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-[var(--bg-primary)]/40 transition-colors bg-transition"
              >
                <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)] transition-colors">Funciona para qualquer área do conhecimento?</h3>
                <span className="faq-icon text-[var(--gold-vibrant)] text-sm transition-transform duration-300" style={{ transform: activeFaq === 4 ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </div>
              <div 
                className="faq-body transition-all duration-350 ease-in-out overflow-hidden"
                style={{ maxHeight: activeFaq === 4 ? "400px" : "0px" }}
              >
                <div className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  Sim. O EvidentIA busca em bases multidisciplinares (OpenAlex, Crossref, Semantic Scholar, CORE, Google Scholar). Serve para Direito, Educação, Saúde, Engenharias, Humanas, Exatas — qualquer área.
                </div>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="faq-item glass-card rounded-xl overflow-hidden transition-all duration-300 border bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div 
                onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}
                className="faq-header flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-[var(--bg-primary)]/40 transition-colors bg-transition"
              >
                <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)] transition-colors">E se eu não souber usar?</h3>
                <span className="faq-icon text-[var(--gold-vibrant)] text-sm transition-transform duration-300" style={{ transform: activeFaq === 5 ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </div>
              <div 
                className="faq-body transition-all duration-350 ease-in-out overflow-hidden"
                style={{ maxHeight: activeFaq === 5 ? "200px" : "0px" }}
              >
                <div className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  A interface é intuitiva e autoexplicativa. Basta digitar seu tema de pesquisa e o EvidentIA organiza em grafos e tabelas. Se tiver dúvidas, há guias informativos integrados.
                </div>
              </div>
            </div>

            {/* FAQ Item 6 */}
            <div className="faq-item glass-card rounded-xl overflow-hidden transition-all duration-300 border bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div 
                onClick={() => setActiveFaq(activeFaq === 6 ? null : 6)}
                className="faq-header flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-[var(--bg-primary)]/40 transition-colors bg-transition"
              >
                <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)] transition-colors">Posso exportar para Word?</h3>
                <span className="faq-icon text-[var(--gold-vibrant)] text-sm transition-transform duration-300" style={{ transform: activeFaq === 6 ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </div>
              <div 
                className="faq-body transition-all duration-350 ease-in-out overflow-hidden"
                style={{ maxHeight: activeFaq === 6 ? "200px" : "0px" }}
              >
                <div className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  Sim. Fichamentos, revisões de literatura e relatórios de síntese são facilmente exportáveis para Word (.DOCX) formatado, CSV, PNG e SVG.
                </div>
              </div>
            </div>

            {/* FAQ Item 7 */}
            <div className="faq-item glass-card rounded-xl overflow-hidden transition-all duration-300 border bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div 
                onClick={() => setActiveFaq(activeFaq === 7 ? null : 7)}
                className="faq-header flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-[var(--bg-primary)]/40 transition-colors bg-transition"
              >
                <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)] transition-colors">Qual é a diferença para o ChatGPT?</h3>
                <span className="faq-icon text-[var(--gold-vibrant)] text-sm transition-transform duration-300" style={{ transform: activeFaq === 7 ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </div>
              <div 
                className="faq-body transition-all duration-350 ease-in-out overflow-hidden"
                style={{ maxHeight: activeFaq === 7 ? "400px" : "0px" }}
              >
                <div className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  O ChatGPT é um chatbot genérico que costuma &quot;alucinar&quot; referências inventando títulos, DOIs e links fictícios. O EvidentIA consulta bases científicas reais estruturadas (Crossref, Semantic Scholar, etc.), trazendo dados de artigos verídicos com DOI ativo, gerando gráficos e revisões sobre dados factuais.
                </div>
              </div>
            </div>

            {/* FAQ Item 8 */}
            <div className="faq-item glass-card rounded-xl overflow-hidden transition-all duration-300 border bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div 
                onClick={() => setActiveFaq(activeFaq === 8 ? null : 8)}
                className="faq-header flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-[var(--bg-primary)]/40 transition-colors bg-transition"
              >
                <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)] transition-colors">E se o preço promocional da assinatura subir?</h3>
                <span className="faq-icon text-[var(--gold-vibrant)] text-sm transition-transform duration-300" style={{ transform: activeFaq === 8 ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </div>
              <div 
                className="faq-body transition-all duration-350 ease-in-out overflow-hidden"
                style={{ maxHeight: activeFaq === 8 ? "200px" : "0px" }}
              >
                <div className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed transition-colors">
                  Quem garantir a assinatura hoje promocional por em até 12x 41,06 (BRL) ou 397,00 (BRL) à vista garante o preço promocional na renovação anual, mantendo-se protegido de eventuais aumentos no futuro.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 11 — CTA FINAL (Urgência e Decisão) */}
      <section className="py-20 relative z-10 border-t bg-transition bg-gradient-to-b" style={{ borderColor: "var(--card-border)", background: "linear-gradient(to bottom, var(--bg-secondary), #0a0a1a, var(--bg-primary))" }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-jakarta font-extrabold text-3xl md:text-4xl text-center text-[var(--text-primary)] fade-up transition-colors">
            Você Tem Duas Opções Agora
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            
            {/* Column 1: No Action */}
            <div className="glass-card rounded-2xl p-8 border hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between fade-up bg-transition" style={{ borderColor: "var(--card-border)" }}>
              <div>
                <h3 className="text-xl font-extrabold text-[var(--text-secondary)] opacity-85 transition-colors">Continuar do mesmo jeito</h3>
                <div className="h-0.5 w-12 bg-[var(--text-secondary)]/30 my-4" />
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal transition-colors">
                  Continuar formatando referências na mão, lendo abstracts um por um, pagando ferramentas caras em dólar que não compreendem as normas metodológicas brasileiras, e gastando semanas em tarefas mecânicas brutas.
                </p>
              </div>
              <span className="text-xs text-[var(--text-secondary)] font-bold opacity-75 mt-6 transition-colors">✗ Seguir com a rotina pesada e estressante</span>
            </div>

            {/* Column 2: Buy */}
            <div className="glass-card rounded-2xl p-8 border-2 border-[var(--gold-vibrant)]/45 [box-shadow:0_0_40px_rgba(232,189,86,0.1)] flex flex-col justify-between fade-up bg-transition">
              <div>
                <h3 className="text-xl font-bold text-[var(--gold-vibrant)] transition-colors">Transformar sua pesquisa agora</h3>
                <div className="h-0.5 w-12 bg-[var(--gold-vibrant)] my-4" />
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium font-jakarta transition-colors">
                  Garantir sua assinatura ao EvidentIA por em até 12x 41,06 (BRL) ou 397,00 (BRL) à vista e automatizar de forma profissional e confiável todo o levantamento, classificação e formatação da sua fundamentação teórica.
                </p>
              </div>
              <span className="text-xs text-[var(--gold-vibrant)] font-bold mt-6 transition-colors">✓ Economizar semanas de trabalho acadêmico</span>
            </div>

          </div>

          <div className="mt-12 text-center fade-up flex justify-center">
            <a 
              href="https://chk.eduzz.com/6W4G1RYY0Z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-gold pulse-glow inline-block rounded-2xl px-12 py-6 text-xl font-extrabold max-w-md w-full"
            >
              SIM, QUERO MINHA ASSINATURA ANUAL →
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 11.5 — SUPORTE WHATSAPP */}
      <section className="py-16 relative z-10 border-t bg-transition" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Green glowing ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* WhatsApp Premium Icon */}
            <div className="w-20 h-20 mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>

            <h3 className="font-jakarta font-bold text-2xl md:text-3xl text-[var(--text-primary)] mb-4 transition-colors">
              Ainda com dúvidas?
            </h3>
            
            <p className="font-sans text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-8 transition-colors leading-relaxed">
              Fale diretamente com nossa equipe no WhatsApp para tirar dúvidas sobre o seu acesso, formas de pagamento, ou verificação de recursos acadêmicos.
            </p>

            <a 
              href="https://wa.me/557130275587" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-extrabold bg-[#25D366] hover:bg-[#128C7E] transition-all hover:scale-[1.03] shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.45)] text-base md:text-lg cursor-pointer"
            >
              Fale com nossa Equipe no WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 12 — FOOTER MÍNIMO */}
      <footer className="py-12 relative z-10 border-t bg-transition" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 text-center text-xs transition-colors">
          <div style={{ marginBottom: "12px", display: "inline-block" }}>
            <img 
              src={theme === "light" ? "/Logo-Felipe-Asensi-250x64.png" : "/Logo-b-Felipe-Asensi.png"} 
              alt="Felipe Asensi Logo" 
              style={{ maxHeight: "38px", objectFit: "contain", display: "inline-block", verticalAlign: "middle" }} 
            />
            <span style={{ display: "inline-block", width: "1px", height: "25px", backgroundColor: theme === "light" ? "#cbd5e1" : "var(--card-border)", margin: "0 15px", verticalAlign: "middle" }}></span>
            <img 
              src={theme === "light" ? "/logo_evidencIA_day.png" : "/logo_evidencIA_night.png"} 
              alt="EvidentIA" 
              style={{ maxHeight: "40px", objectFit: "contain", display: "inline-block", verticalAlign: "middle" }} 
            />
          </div>

          <p style={{ fontWeight: 700, margin: "0 0 4px 0", color: theme === "light" ? "#40585E" : "var(--text-primary)" }} className="mt-2 text-sm md:text-base leading-relaxed transition-colors">
            Copyright© 2026 - Felipe Asensi | All rights reserved | <a href="https://www.felipeasensi.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#D8A63C", textDecoration: "none" }} className="hover:underline">https://www.felipeasensi.com/</a>
          </p>

          <p style={{ margin: "0 0 10px 0", fontSize: "10px", color: theme === "light" ? "#64748B" : "var(--text-secondary)" }} className="transition-colors">
            Pembroke Collins© | 1191 E Newport Center Dr #103 | Deerfield Beach, FL - United States | ZIP 33442
          </p>

          <div style={{ marginTop: "12px", fontWeight: 600, fontSize: "10px" }} className="flex flex-wrap gap-y-2 justify-center items-center">
            <a href="https://www.felipeasensi.com/termos-de-uso/" target="_blank" rel="noopener noreferrer" style={{ color: theme === "light" ? "#40585E" : "var(--text-primary)", textDecoration: "none", margin: "0 6px" }} className="hover:underline transition-colors">Termos de Uso</a> |
            <a href="https://www.felipeasensi.com/politica-de-privacidade/" target="_blank" rel="noopener noreferrer" style={{ color: theme === "light" ? "#40585E" : "var(--text-primary)", textDecoration: "none", margin: "0 6px" }} className="hover:underline transition-colors">Política de Privacidade</a> |
            <a href="https://www.felipeasensi.com/contato/" target="_blank" rel="noopener noreferrer" style={{ color: theme === "light" ? "#40585E" : "var(--text-primary)", textDecoration: "none", margin: "0 6px" }} className="hover:underline transition-colors">Contato</a>|
            <a href="mailto:felipe@felipeasensi.com" style={{ color: theme === "light" ? "#40585E" : "var(--text-primary)", textDecoration: "none", margin: "0 6px" }} className="hover:underline transition-colors">Fale Conosco</a>
          </div>

          <p style={{ fontSize: "10px", marginTop: "24px", opacity: 0.7, fontFamily: "monospace" }} className="transition-all">
            Developed by <a href="https://wa.me/5581994289239" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold transition-colors" style={{ color: "#D8A63C" }}>Marcos de Andrade Filho</a> | Powered by Pembroke Collins©
          </p>
        </div>
      </footer>

    </div>
  );
}

