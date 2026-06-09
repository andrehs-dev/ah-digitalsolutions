import { useEffect, useRef, useState, type FormEvent } from "react";

const WA = "https://wa.me/5519993174538";
const waLink = (text: string) => `${WA}?text=${encodeURIComponent(text)}`;
const BLOG_URL = "https://ah-digital-blog.vercel.app";

const NAV = [
  { id: "servicos", label: "Serviços" },
  { id: "projetos", label: "Projetos" },
  { id: "processo", label: "Processo" },
  { id: "sobre", label: "Sobre" },
  { id: "faq", label: "FAQ" },
  { id: "contato", label: "Contato" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = "+", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/75 backdrop-blur-xl border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container-x flex items-center justify-between h-16">
        <button onClick={() => scrollToId("top")} className="flex items-center gap-2 group">
          <span className="font-display font-extrabold text-2xl tracking-tight text-foreground">
            AH
          </span>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground hidden sm:inline">
            Digital Solutions
          </span>
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollToId(n.id)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border hover:border-primary text-foreground px-4 py-2 text-sm font-medium transition-colors"
          >
            Blog
          </a>
          <button
            onClick={() => scrollToId("contato")}
            className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 text-sm font-medium transition-colors"
          >
            Solicitar Proposta
          </button>
        </div>
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container-x py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  setOpen(false);
                  scrollToId(n.id);
                }}
                className="text-left py-2 text-foreground"
              >
                {n.label}
              </button>
            ))}
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noreferrer"
              className="text-left py-2 text-foreground"
              onClick={() => setOpen(false)}
            >
              📖 Blog
            </a>
            <button
              onClick={() => {
                setOpen(false);
                scrollToId("contato");
              }}
              className="rounded-full bg-primary text-primary-foreground py-3 mt-2 text-sm font-medium"
            >
              Solicitar Proposta
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-44 md:pb-28">
      <div
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, var(--color-primary), transparent 40%), radial-gradient(circle at 80% 0%, var(--color-primary), transparent 35%)",
        }}
      />
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground border border-border rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Americana, SP · Atende todo o Brasil
          </span>
          <h1 className="mt-6 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
            Soluções digitais criadas para fazer{" "}
            <span className="text-primary">empresas crescerem.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Sites modernos, sistemas personalizados e automações com IA — entregues por quem entende de
            engenharia e de negócio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToId("contato")}
              className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Solicitar Proposta
            </button>
            <button
              onClick={() => scrollToId("projetos")}
              className="inline-flex items-center justify-center rounded-full border border-border hover:border-primary text-foreground px-7 py-3.5 text-sm font-semibold transition-colors"
            >
              Ver Projetos
            </button>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border hover:border-primary text-foreground px-7 py-3.5 text-sm font-semibold transition-colors"
            >
              📖 Blog
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "⚡ A partir de R$450",
              "📅 Prazo flexível",
              "🇧🇷 100% remoto",
            ].map((p) => (
              <span
                key={p}
                className="text-xs sm:text-sm text-muted-foreground border border-border rounded-full px-3.5 py-1.5"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="reveal lg:justify-self-end w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Live · Painel
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Últimos 30d</span>
            </div>
            <div className="space-y-5">
              <MetricRow label="Conversões" value="+248%" trend="up" />
              <MetricRow label="Tempo de resposta" value="−87%" trend="down" />
              <MetricRow label="Tarefas automatizadas" value="12.4k" trend="up" />
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-end justify-between h-24">
              {[40, 65, 50, 78, 60, 90, 72, 95].map((h, i) => (
                <div
                  key={i}
                  className="w-3 bg-primary/70 rounded-sm"
                  style={{ height: `${h}%`, opacity: 0.4 + i * 0.07 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricRow({ label, value, trend }: { label: string; value: string; trend: "up" | "down" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-display font-bold text-xl ${trend === "up" ? "text-primary" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

function Credibility() {
  /* TODO: substituir — números reais de projetos e clientes */
  const items = [
    { n: 12, suffix: "+", label: "Projetos entregues" },
    { n: 10, suffix: "+", label: "Clientes atendidos" },
    { n: 18, suffix: "+", label: "Soluções implementadas" },
    { n: 4, suffix: "", label: "Segmentos atendidos" },
  ];
  return (
    <section className="border-y border-border bg-card/40">
      <div className="container-x py-12 text-center">
        <p className="text-sm text-muted-foreground reveal">
          Projetos reais entregues para negócios em crescimento
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((it) => (
            <div key={it.label} className="reveal">
              <div className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
                <Counter to={it.n} suffix={it.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Service = {
  icon: string;
  name: string;
  price: string;
  deadline: string;
  desc: string;
  wa: string;
  featured?: boolean;
};

const SERVICES: Service[] = [
  {
    icon: "🌐",
    name: "Página / Site Profissional",
    price: "A partir de R$550",
    deadline: "Prazo sob consulta",
    desc: "Site completo com suas informações, serviços, fotos e botão de WhatsApp. Aparece no Google e funciona no celular.",
    wa: "Oi André, quero uma Página Profissional",
    featured: true,
  },
  {
    icon: "🤖",
    name: "Automação com IA",
    price: "Sob consulta",
    deadline: "Prazo sob consulta",
    desc: "Chatbots, agentes de IA e automações que trabalham por você 24/7.",
    wa: "Oi André, quero uma Automação com IA",
  },
  {
    icon: "💻",
    name: "Sistemas Personalizados",
    price: "Sob consulta",
    deadline: "Prazo sob consulta",
    desc: "Soluções desenvolvidas sob medida para necessidades específicas da sua operação.",
    wa: "Oi André, quero um Sistema Personalizado",
  },
  {
    icon: "🎨",
    name: "Artes para Redes Sociais",
    price: "R$250 (10 artes)",
    deadline: "⚡ Entrega em 24h",
    desc: "Posts e stories no tamanho certo com a identidade visual do seu negócio.",
    wa: "Oi André, quero Artes para Redes Sociais",
  },
  {
    icon: "📷",
    name: "Fotos Profissionais com IA",
    price: "A partir de R$150",
    deadline: "⚡ Entrega em 24h",
    desc: "Transforme fotos comuns em profissionais ou restaure fotos antigas com IA.",
    wa: "Oi André, quero Fotos Profissionais com IA",
  },
];

function Services() {
  return (
    <section id="servicos" className="py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl reveal">
          <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
            Serviços
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-foreground leading-tight">
            Tecnologia aplicada a problemas reais de negócio.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className="reveal group relative rounded-2xl border border-border bg-card p-7 hover:border-primary/50 hover:-translate-y-1 transition-all"
            >
              {s.featured && (
                <span className="absolute -top-3 left-7 text-xs font-medium bg-primary text-primary-foreground px-3 py-1 rounded-full">
                  ⭐ Mais pedido
                </span>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="text-4xl">{s.icon}</div>
                <div className="text-right">
                  <div className="text-foreground font-display font-bold text-lg">{s.price}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.deadline}</div>
                </div>
              </div>
              <h3 className="mt-5 font-display font-bold text-xl text-foreground">{s.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <a
                href={waLink(s.wa)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
              >
                Quero esse <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    segment: "💈 Barbearia",
    name: "Barbearia do Bomba",
    desc: "Site completo com agendamento, galeria, barbeiros e identidade urbana.",
    tech: ["React", "TanStack Start", "Tailwind"],
    url: "https://barbeariadobomba.netlify.app",
  },
  {
    segment: "🏍️ Motos",
    name: "Cebola Motos",
    desc: "Landing page moderna para loja de motos com Catálogo e WhatsApp.",
    tech: ["React", "TanStack Start", "Tailwind"],
    url: "https://tourmaline-pothos-991cd5.netlify.app",
  },
  {
    segment: "💪 Fitness",
    name: "Personal Leonardo",
    desc: "Site de alta conversão para personal trainer com depoimentos e contato direto.",
    tech: ["React", "TanStack Start", "Tailwind"],
    url: "https://dreamy-belekoy-f9bfa6.netlify.app",
  },
  {
    segment: "💈 Barbearia",
    name: "Barbearia Zavalha & Co.",
    desc: "Site institucional com agendamento e identidade visual marcante.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://andrehs-dev.github.io/portfolio1/",
  },
  {
    segment: "💇 Beleza",
    name: "Salão de Beleza",
    desc: "Landing page para captação de clientes via WhatsApp.",
    tech: ["HTML", "Tailwind", "JS"],
    url: "https://andrehs-dev.github.io/portfolio3/",
  },
  {
    segment: "🏠 Organização",
    name: "Personal Organizer",
    desc: "Portfolio com galeria antes e depois.",
    tech: ["HTML", "Tailwind", "JS"],
    url: "https://andrehs-dev.github.io/portfolio4/",
  },
];

function Projects() {
  return (
    <section id="projetos" className="py-24 md:py-32 bg-card/30 border-y border-border">
      <div className="container-x">
        <div className="max-w-2xl reveal">
          <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Projetos</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-foreground leading-tight">
            Casos reais. Resultados mensuráveis.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Projetos de demonstração — em breve, casos reais de clientes.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="reveal group rounded-2xl border border-border bg-background p-7 hover:border-primary/50 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground">
                  {p.segment}
                </span>
                <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
                  Demonstração
                </span>
              </div>
              <h3 className="mt-5 font-display font-bold text-2xl text-foreground">{p.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                Ver projeto <span aria-hidden>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", t: "Diagnóstico", d: "Entendimento dos objetivos e gargalos do negócio." },
  { n: "02", t: "Planejamento", d: "Definição do escopo e solução técnica ideal." },
  { n: "03", t: "Design", d: "Experiência visual com foco em clareza e conversão." },
  { n: "04", t: "Desenvolvimento", d: "Implementação com tecnologias modernas." },
  { n: "05", t: "Entrega", d: "Publicação, revisão e ajustes finais." },
];

function Process() {
  return (
    <section id="processo" className="py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl reveal">
          <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Processo</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-foreground leading-tight">
            Da conversa à entrega — simples assim.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-5 gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="reveal rounded-2xl border border-border bg-card p-6">
              <div className="font-display font-extrabold text-3xl text-primary">{s.n}</div>
              <div className="mt-4 font-display font-bold text-lg text-foreground">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const badges = [
    { n: "24h–7d", l: "Você escolhe o prazo" },
    { n: "+12", l: "Seguimentos atendidos" },
    { n: "100%", l: "Satisfação garantida" },
    { n: "🇧🇷", l: "Todo o Brasil" },
  ];
  return (
    <section id="sobre" className="py-24 md:py-32 bg-card/30 border-y border-border">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          {/* TODO: substituir por foto real do André */}
          <div className="aspect-square max-w-md rounded-3xl border border-border overflow-hidden p-4
      bg-gradient-to-br from-purple-900/40 via-purple-800/20 to-black">
            <img
              src="/Copilot_20260528_162036.png"
              alt="André Henrique - AH Digital Solutions"
              className="w-full h-full object-cover rounded-2xl object-top"
            />
          </div>

        </div>
        <div className="reveal">
          <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Sobre</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-foreground leading-tight">
            Engenharia de software com visão de negócio.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Sou André Henrique, estudante de Engenharia de Software em Americana, SP. Fundei a AH Digital
            Solutions porque vi bons profissionais sendo invisíveis na internet enquanto concorrentes piores
            apareciam na frente. Entrego soluções digitais reais — sites, sistemas e automações — com a
            seriedade de um engenheiro e o preço acessível de quem entende o seu lado.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <div key={b.l} className="rounded-xl border border-border bg-background p-4">
                <div className="font-display font-bold text-xl text-foreground">{b.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{b.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* TODO: SUBSTITUIR POR DEPOIMENTOS REAIS */
const TESTIMONIALS = [
  {
    initials: "MR",
    text: "Entrega muito acima do que esperava pelo preço. O site ficou pronto antes do prazo e já comecei a receber contatos no primeiro dia.",
    name: "Marcos R.",
    role: "Proprietário · Barbearia",
  },
  {
    initials: "JC",
    text: "Profissionalismo do início ao fim. Entendeu o que eu precisava sem eu precisar explicar três vezes.",
    name: "Juliana C.",
    role: "Diretora · Salão de Beleza",
  },
  {
    initials: "RP",
    text: "Automatizou tarefas que tomavam horas do meu dia. Recomendo de olhos fechados.",
    name: "Rafael P.",
    role: "Personal Trainer",
  },
];

function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl reveal">
          <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Depoimentos</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-foreground leading-tight">
            O que dizem quem já trabalhou com a gente.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="reveal rounded-2xl border border-border bg-card p-7 flex flex-col"
            >
              <blockquote className="text-foreground leading-relaxed">"{t.text}"</blockquote>
              <figcaption className="mt-6 pt-6 border-t border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-display font-bold text-primary text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const STACK = [
  "Next.js", "React", "TypeScript", "Tailwind", "Node.js",
  "Python", "OpenAI", "Supabase", "PostgreSQL", "Vercel",
];

function Stack() {
  return (
    <section className="py-24 md:py-32 bg-card/30 border-y border-border">
      <div className="container-x text-center">
        <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Stack</span>
        <h2 className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-foreground leading-tight max-w-2xl mx-auto">
          Stack moderno, escolhido com critério.
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-3 reveal">
          {STACK.map((s) => (
            <span
              key={s}
              className="px-5 py-2.5 rounded-full border border-border bg-background text-sm text-foreground"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground max-w-xl mx-auto">
          Usamos as ferramentas certas para cada projeto. Nada de tecnologia por modismo.
        </p>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Por que pagar 50% antes?", a: "Para garantir o compromisso de ambos os lados. O restante só é pago quando você aprovar o resultado." },
  { q: "E se eu não gostar do resultado?", a: "Você tem direito a 2 rodadas de revisão incluídas. Trabalhamos até você aprovar antes de qualquer pagamento final." },
  { q: "Tem mensalidade?", a: "Não. Os serviços são pagamento único. Há mensalidade apenas se você optar pelo plano de manutenção mensal, totalmente opcional." },
  { q: "Atende fora de Americana?", a: "Sim! Atendo todo o Brasil de forma remota. O processo é 100% pelo WhatsApp." },
  { q: "Como funciona o pagamento?", a: "Aceitamos Pix, boleto e cartão de crédito." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-x max-w-3xl">
        <div className="reveal text-center">
          <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">FAQ</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-foreground leading-tight">
            Perguntas frequentes.
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="reveal rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-medium text-foreground">{f.q}</span>
                  <span className={`text-primary transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-card/50 border-y border-border">
      <div className="container-x text-center max-w-3xl reveal">
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-foreground leading-tight">
          Pronto para levar seu negócio para outro nível?
        </h2>
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          Me chama no WhatsApp. A conversa é gratuita e sem compromisso — em 15 minutos você já sabe o
          que precisa e quanto vai investir.
        </p>
        <a
          href={waLink("Oi André, vim pelo site e quero um orçamento")}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-base font-semibold transition-all hover:-translate-y-0.5"
        >
          💬 Falar com André no WhatsApp
        </a>
        <p className="mt-5 text-xs text-muted-foreground">
          Respondo em até 1 hora · Seg a Sex, 8h às 18h
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nome = String(fd.get("nome") || "");
    const empresa = String(fd.get("empresa") || "");
    const whatsapp = String(fd.get("whatsapp") || "");
    const email = String(fd.get("email") || "");
    const tipo = String(fd.get("tipo") || "");
    const projeto = String(fd.get("projeto") || "");
    const text =
      `Olá André! Vim pelo site.\n\n` +
      `Nome: ${nome}\n` +
      (empresa ? `Empresa: ${empresa}\n` : "") +
      `WhatsApp: ${whatsapp}\n` +
      (email ? `Email: ${email}\n` : "") +
      `Tipo: ${tipo}\n\n${projeto}`;
    window.open(waLink(text), "_blank");
    setSent(true);
  }
  return (
    <section id="contato" className="py-24 md:py-32">
      <div className="container-x grid lg:grid-cols-2 gap-12">
        <div className="reveal">
          <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Contato</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-foreground leading-tight">
            Vamos conversar sobre o seu projeto.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Conte sobre o desafio do seu negócio. Respondemos em até 1 dia útil.
          </p>
          <ul className="mt-10 space-y-5">
            <ContactItem icon="💬" label="WhatsApp" value="(19) 9.9317-4538" href={WA} />
            <ContactItem icon="📧" label="E-mail" value="andrehs.dev@gmail.com" href="mailto:andrehs.dev@gmail.com" />
            <ContactItem icon="📍" label="Localização" value="Americana, SP · Brasil" />
            <ContactItem icon="🕐" label="Atendimento" value="Seg a Sex, 8h às 18h" />
          </ul>
        </div>
        <form
          onSubmit={onSubmit}
          className="reveal rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4"
        >
          <Field label="Nome" name="nome" required />
          <Field label="Empresa (opcional)" name="empresa" />
          <Field label="WhatsApp" name="whatsapp" required placeholder="(00) 00000-0000" />
          <Field label="E-mail" name="email" type="email" />
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Tipo de projeto</label>
            <select
              name="tipo"
              required
              className="w-full rounded-lg bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary"
            >
              <option value="">Selecione...</option>
              <option>Site institucional</option>
              <option>Sistema personalizado</option>
              <option>Automação com IA</option>
              <option>E-commerce</option>
              <option>Artes para redes sociais</option>
              <option>Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Sobre o projeto</label>
            <textarea
              name="projeto"
              rows={4}
              required
              className="w-full rounded-lg bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 font-semibold text-sm transition-colors"
          >
            Enviar solicitação <span aria-hidden>→</span>
          </button>
          <p className="text-xs text-muted-foreground text-center">
            {sent ? "✅ Abrindo WhatsApp... Resposta em até 1 dia útil." : "Resposta em até 1 dia útil."}
          </p>
        </form>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-foreground mt-0.5">{value}</div>
      </div>
    </div>
  );
  return (
    <li>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors block">
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

function Field({
  label, name, type = "text", required, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-2xl text-foreground">AH</span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Digital Solutions</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            Empresa de tecnologia especializada em sites, sistemas e automações com IA para empresas que
            querem crescer com eficiência.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">📍 Americana, SP · Brasil</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-foreground font-semibold">Navegação</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NAV.filter((n) => n.id !== "contato").map((n) => (
              <li key={n.id}>
                <button onClick={() => scrollToId(n.id)} className="hover:text-primary transition-colors">
                  {n.label}
                </button>
              </li>
            ))}
            <li>
              <a href={BLOG_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-foreground font-semibold">Contato</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href={WA} target="_blank" rel="noreferrer" className="hover:text-primary">WhatsApp</a></li>
            <li><a href="mailto:andrehs.dev@gmail.com" className="hover:text-primary">E-mail</a></li>
            <li><a href="https://www.linkedin.com/in/andré-henrique-engsoft/" target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/andrehs.dev/" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 text-center text-xs text-muted-foreground">
          © 2026 AH Digital Solutions. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 md:bottom-6 md:right-6 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center justify-center shadow-lg shadow-black/40 transition-all hover:scale-105"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

export function Landing() {
  useReveal();
  return (
    <div className="bg-background min-h-screen text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Credibility />
        <Services />
        <Projects />
        <Process />
        <About />
        <Testimonials />
        <Stack />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}