"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WaterRippleImage from "./WaterRippleImage";
import CustomCursor from "./CustomCursor";

type Theme = "signal" | "momo" | "emerald" | "lagoon" | "burgundy" | "bay" | "oxford" | "azure" | "heritage";
type Typeface = "new-amsterdam" | "alumni" | "text-me-one" | "syne" | "figtree" | "anta" | "quattrocento" | "zodiak" | "chillax";

const themes: { id: Theme; name: string; colors: string[] }[] = [
  { id: "signal", name: "Mirage Signal", colors: ["#16232A", "#FF5B04", "#075056", "#E4EEF0"] },
  { id: "momo", name: "Momo Trust", colors: ["#021024", "#052659", "#5483B3", "#7DA0CA", "#C1E8FF"] },
  { id: "emerald", name: "Emerald Club", colors: ["#154230", "#5D1E21", "#101111", "#A6824A", "#E6E2DA"] },
  { id: "lagoon", name: "Teal Lagoon", colors: ["#0F2A2A", "#00BFA6", "#D9FAF4"] },
  { id: "burgundy", name: "Burgundy Study", colors: ["#722F37", "#8B1538", "#A0522D", "#F5F5DC"] },
  { id: "bay", name: "Bay View", colors: ["#5596A5", "#0A4B61", "#2FA1B7", "#BAC8DB", "#C6B08F"] },
  { id: "oxford", name: "Oxford", colors: ["#D9B970", "#102D4F", "#1E4268", "#55595D", "#D4D5D6"] },
  { id: "azure", name: "Azure", colors: ["#1E90FF", "#00BFFF", "#87CEEB", "#B0E0E6", "#ADD8E6"] },
  { id: "heritage", name: "Heritage", colors: ["#0E0E0D", "#1C1C1A", "#C9A24B", "#9A958C", "#F2EFE9"] },
];

const typefaces: { id: Typeface; name: string }[] = [
  { id: "new-amsterdam", name: "New Amsterdam" },
  { id: "alumni", name: "Alumni Pinstripe" },
  { id: "text-me-one", name: "Text Me One" },
  { id: "syne", name: "Syne" },
  { id: "figtree", name: "Figtree" },
  { id: "anta", name: "Anta" },
  { id: "quattrocento", name: "Quattrocento" },
  { id: "zodiak", name: "Zodiak" },
  { id: "chillax", name: "Chillax" },
];

const pillars = [
  ["01", "Capital", "Patient capital, thoughtfully aligned with generational ambition."],
  ["02", "Intelligence", "Private context from those who have navigated consequential decisions."],
  ["03", "Legacy", "Stewardship that moves beyond wealth into meaning and continuity."],
  ["04", "Access", "The right room, the right conversation, at precisely the right moment."],
  ["05", "Community", "A small circle built on discretion, contribution and uncommon trust."],
  ["06", "Marketplace", "Curated opportunities exchanged privately between members."],
  ["07", "Experiences", "Intimate gatherings designed around ideas, culture and place."],
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) node.classList.add("is-visible");
    }, { threshold: .16 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [theme, setTheme] = useState<Theme>("momo");
  const [typeface, setTypeface] = useState<Typeface>("syne");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const upperPillars = useRef<HTMLDivElement>(null);
  const lowerPillars = useRef<HTMLDivElement>(null);
  const heroChapter = useRef<HTMLDivElement>(null);
  const heroHalo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chapter = heroChapter.current;
    const halo = heroHalo.current;
    if (!chapter || !halo) return;
    let frame = 0;
    let currentX = chapter.clientWidth * .5;
    let currentY = Math.min(innerHeight * .38, chapter.clientHeight * .3);
    let targetX = currentX;
    let targetY = currentY;
    const paint = () => {
      currentX += (targetX - currentX) * .12;
      currentY += (targetY - currentY) * .12;
      halo.style.transform = `translate3d(${currentX}px,${currentY}px,0) translate(-50%,-50%)`;
      if (Math.abs(targetX - currentX) > .25 || Math.abs(targetY - currentY) > .25) {
        frame = requestAnimationFrame(paint);
      } else {
        frame = 0;
      }
    };
    const move = (event: PointerEvent) => {
      const rect = chapter.getBoundingClientRect();
      targetX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
      targetY = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
      if (!frame) frame = requestAnimationFrame(paint);
    };
    halo.style.transform = `translate3d(${currentX}px,${currentY}px,0) translate(-50%,-50%)`;
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const saved = (localStorage.getItem("io8-theme") || localStorage.getItem("1o8-theme")) as Theme | null;
    const savedTypeface = (localStorage.getItem("io8-typeface") || localStorage.getItem("1o8-typeface")) as Typeface | null;
    if (saved && themes.some((item) => item.id === saved)) setTheme(saved);
    if (savedTypeface && typefaces.some((item) => item.id === savedTypeface)) setTypeface(savedTypeface);
  }, []);

  useEffect(() => {
    localStorage.setItem("io8-theme", theme);
    localStorage.setItem("io8-typeface", typeface);
  }, [theme, typeface]);

  useEffect(() => {
    const preservePillarHeight = () => {
      const zoom = Math.max(.5, Math.min(2, window.outerWidth / window.innerWidth));
      document.documentElement.style.setProperty("--pillar-card-height", `${580 / zoom}px`);
      document.documentElement.style.setProperty("--pillar-rail-height", `${580 / zoom}px`);
    };
    preservePillarHeight();
    window.addEventListener("resize", preservePillarHeight);
    window.visualViewport?.addEventListener("resize", preservePillarHeight);
    return () => {
      window.removeEventListener("resize", preservePillarHeight);
      window.visualViewport?.removeEventListener("resize", preservePillarHeight);
    };
  }, []);

  useEffect(() => {
    const upper = upperPillars.current;
    const lower = lowerPillars.current;
    if (!upper || !lower) return;

    const cardStep = (element: HTMLDivElement) => {
      const card = element.firstElementChild as HTMLElement | null;
      return card ? card.getBoundingClientRect().width + 16 : element.clientWidth / 1.5;
    };
    const centerLoops = () => {
      upper.scrollLeft = upper.scrollWidth / 3;
      lower.scrollLeft = lower.scrollWidth * 2 / 3;
    };
    centerLoops();

    const frames: number[] = [];
    const animateBothRails = () => {
      const upperStart = upper.scrollLeft;
      const lowerStart = lower.scrollLeft;
      const upperDistance = cardStep(upper);
      const lowerDistance = cardStep(lower);
      const startedAt = performance.now();
      const duration = 1000;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = progress < .5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        upper.scrollLeft = upperStart + upperDistance * eased;
        lower.scrollLeft = lowerStart - lowerDistance * eased;
        if (progress < 1) frames.push(requestAnimationFrame(tick));
      };
      frames.push(requestAnimationFrame(tick));
    };

    const advance = () => {
      if (upper.scrollLeft >= upper.scrollWidth * 2 / 3) upper.scrollTo({ left: upper.scrollWidth / 3, behavior: "auto" });
      if (lower.scrollLeft <= lower.scrollWidth / 3) lower.scrollTo({ left: lower.scrollWidth * 2 / 3, behavior: "auto" });
      animateBothRails();
    };
    let timer = 0;
    const starter = window.setTimeout(() => {
      advance();
      timer = window.setInterval(advance, 3000);
    }, 2000);
    const resizeObserver = new ResizeObserver(centerLoops);
    resizeObserver.observe(upper);

    return () => {
      window.clearTimeout(starter);
      window.clearInterval(timer);
      resizeObserver.disconnect();
      frames.forEach(cancelAnimationFrame);
    };
  }, []);

  const foundationLoop = Array.from({ length: 3 }, () => pillars.slice(0, 4)).flat();
  const connectionLoop = Array.from({ length: 3 }, () => pillars.slice(4)).flat();

  return (
    <main data-theme={theme} data-font={typeface}>
      <CustomCursor />
      <div className="grain" aria-hidden />
      <button
        className={`edit-design-button ${drawerOpen ? "drawer-is-open" : ""}`}
        type="button"
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-expanded={drawerOpen}
        aria-controls="design-drawer"
        aria-label="Edit colors and typography"
      >
        <span>✎</span><b>Edit</b>
      </button>
      <aside id="design-drawer" className={`theme-switcher ${drawerOpen ? "open" : ""}`} aria-label="Edit colors and typography" aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <div><small>Io8 Design System</small><h2>Set the atmosphere.</h2></div>
          <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close design panel">×</button>
        </div>
        <span className="theme-caption">Palette</span>
        <div className="theme-options">
          {themes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={theme === item.id ? "active" : ""}
              onClick={() => setTheme(item.id)}
              aria-pressed={theme === item.id}
              aria-label={`Use ${item.name} theme`}
              title={item.name}
            >
              <i>{item.colors.map((color) => <b key={color} style={{ background: color }} />)}</i>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <span className="theme-caption font-caption">Typeface</span>
        <div className="font-options">
          {typefaces.map((item) => (
            <button
              key={item.id}
              type="button"
              data-preview-font={item.id}
              className={typeface === item.id ? "active" : ""}
              onClick={() => setTypeface(item.id)}
              aria-pressed={typeface === item.id}
              aria-label={`Use ${item.name} typeface`}
              title={item.name}
            >
              <b>Aa</b><span>{item.name}</span>
            </button>
          ))}
        </div>
      </aside>
      <nav className="nav">
        <Link className="mark brand-logo" href="/" aria-label="Io8 home"><img src="/io8-logo.svg" alt="Io8" /></Link>
        <div className="nav-center" aria-hidden />
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation">
          <span /> <span />
        </button>
        <div className={`nav-links ${menu ? "open" : ""}`}>
          <a href="#circle">The Circle</a>
          <a href="#pillars">Pillars</a>
          <Link href="/signin">Member Access</Link>
        </div>
      </nav>

      <div ref={heroChapter} className="hero-chapter">
      <div ref={heroHalo} className="hero-halo" aria-hidden="true" />
      <section className="hero">
        <div className="ambient" aria-hidden />
        <div className="hero-index">Private members&apos; circle<br />India · Est. 2026</div>
        <div className="hero-copy">
          <div className="eyebrow"><span /> Io8</div>
          <h1>For families who build<br />what <em>outlives</em> them.</h1>
          <p>A private members&apos; circle for India&apos;s most established founders, families and investors.</p>
          <Link className="outline-link" href="/invitation"><span>Request invitation</span><b>↗</b></Link>
        </div>
        <div className="scroll-note">Scroll to enter <span>↓</span></div>
      </section>

      <WaterRippleImage />

      <section className="statement">
        <Reveal>
          <p>Not a network.</p>
          <h2>A private circle.</h2>
        </Reveal>
      </section>
      </div>

      <section className="about" id="circle">
        <Reveal className="section-label">01 / The Circle</Reveal>
        <Reveal className="about-grid">
          <h2>Built for the<br />long horizon.</h2>
          <div>
            <p>Io8 is a private institution for families shaping the next century. A place where capital, intelligence and conviction meet without spectacle.</p>
            <p>Membership is deliberately limited. Every relationship is considered. Every exchange begins with trust.</p>
          </div>
        </Reveal>
      </section>

      <section className="pillars" id="pillars">
        <Reveal className="pillars-head">
          <div className="section-label">02 / The Seven Pillars</div>
          <div className="pillars-title">
            <h2>What endures.</h2>
            <p>Seven principles. Two perspectives. One enduring circle.</p>
          </div>
        </Reveal>
        <div className="pillar-sliders">
          <div className="pillar-slider">
            <div className="pillar-rail upper" ref={upperPillars}>
              {foundationLoop.flatMap(([number, title, copy], index) => [
                <article className="pillar-card image-card" key={`${title}-${index}-image`} aria-hidden={index < 4 || index >= 8}>
                  <div className={`pillar-card-art atlas-${index % 4 + 1}`} role="img" aria-label={`${title}, an editorial interpretation`} />
                  <div className="image-card-label"><span>{number}</span><h3>{title}</h3></div>
                </article>,
                <article className="pillar-card text-card" key={`${title}-${index}-text`} aria-hidden={index < 4 || index >= 8}>
                  <div className="pillar-card-copy"><span>{number}</span><h3>{title}</h3><p>{copy}</p><i>Explore ↗</i></div>
                </article>
              ])}
            </div>
          </div>
          <div className="pillar-slider lower-slider">
            <div className="pillar-rail lower" ref={lowerPillars}>
              {connectionLoop.flatMap(([number, title, copy], index) => [
                <article className="pillar-card image-card" key={`${title}-${index}-image`} aria-hidden={index < 3 || index >= 6}>
                  <div className={`pillar-card-art atlas-${index % 3 + 5}`} role="img" aria-label={`${title}, an editorial interpretation`} />
                  <div className="image-card-label"><span>{number}</span><h3>{title}</h3></div>
                </article>,
                <article className="pillar-card text-card" key={`${title}-${index}-text`} aria-hidden={index < 3 || index >= 6}>
                  <div className="pillar-card-copy"><span>{number}</span><h3>{title}</h3><p>{copy}</p><i>Explore ↗</i></div>
                </article>
              ])}
            </div>
          </div>
          <p className="slider-hint">Drag to explore · Two continuous perspectives</p>
        </div>
      </section>

      <section className="architecture">
        <div className="architectural-image image-one" role="img" aria-label="Light falling across a monolithic stone interior"><span>House of quiet</span></div>
        <Reveal className="architecture-caption">
          <div className="section-label">03 / A place apart</div>
          <p>Spaces that allow the important conversation to unfold.</p>
        </Reveal>
        <div className="architectural-image image-two" role="img" aria-label="A quiet architectural courtyard"><span>New Delhi · Mumbai · Bengaluru</span></div>
      </section>

      <section className="privacy">
        <div className="section-label">04 / Discretion</div>
        <Reveal><h2>No member lists.</h2></Reveal>
        <Reveal><h2>No testimonials.</h2></Reveal>
        <Reveal><h2>No publicity.</h2></Reveal>
        <Reveal><h2 className="gold">Only trust.</h2></Reveal>
      </section>

      <section className="invitation" id="invitation">
        <Reveal className="invite-copy">
          <div className="section-label">05 / Invitation</div>
          <h2>The door is<br />rarely visible.</h2>
          <p>Membership is considered by invitation or private introduction.</p>
        </Reveal>
        <Reveal className="form-wrap">
          {sent ? <div className="success"><span>Request received</span><h3>We will be in touch,<br />privately.</h3></div> :
          <form onSubmit={(e) => {e.preventDefault(); setSent(true)}}>
            <div className="field-row"><label>Name<input required name="name" /></label><label>Email<input required type="email" name="email" /></label></div>
            <div className="field-row"><label>Company<input name="company" /></label><label>Family office<input name="office" /></label></div>
            <label>Invitation code <small>Optional</small><input name="code" /></label>
            <label>Why Io8?<textarea name="reason" rows={2} /></label>
            <button className="outline-link" type="submit"><span>Request invitation</span><b>↗</b></button>
          </form>}
        </Reveal>
      </section>

      <footer>
        <div className="footer-logo"><img src="/io8-logo.svg" alt="Io8" /></div>
        <p>Private.<br />Confidential.<br />By invitation.</p>
        <div className="footer-meta"><span>Io8 © 2026</span><Link href="/signin">Member access ↗</Link></div>
      </footer>
    </main>
  );
}
