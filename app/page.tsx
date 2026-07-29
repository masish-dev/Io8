"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  const [pointer, setPointer] = useState({ x: 50, y: 38 });
  const [sent, setSent] = useState(false);

  return (
    <main onMouseMove={(e) => setPointer({ x: e.clientX / innerWidth * 100, y: e.clientY / innerHeight * 100 })}>
      <div className="grain" aria-hidden />
      <nav className="nav">
        <Link className="mark" href="/">1o8</Link>
        <div className="nav-center">One Hundred Eight</div>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation">
          <span /> <span />
        </button>
        <div className={`nav-links ${menu ? "open" : ""}`}>
          <a href="#circle">The Circle</a>
          <a href="#pillars">Pillars</a>
          <Link href="/signin">Member Access</Link>
        </div>
      </nav>

      <section className="hero" style={{"--mx": `${pointer.x}%`, "--my": `${pointer.y}%`} as React.CSSProperties}>
        <div className="ambient" aria-hidden />
        <div className="hero-index">Private members&apos; circle<br />India · Est. 2026</div>
        <div className="hero-copy">
          <div className="eyebrow"><span /> One Hundred Eight</div>
          <h1>For families who build<br />what <em>outlives</em> them.</h1>
          <p>A private members&apos; circle for India&apos;s most established founders, families and investors.</p>
          <Link className="outline-link" href="/invitation"><span>Request invitation</span><b>↗</b></Link>
        </div>
        <div className="scroll-note">Scroll to enter <span>↓</span></div>
      </section>

      <section className="statement">
        <Reveal>
          <p>Not a network.</p>
          <h2>A private circle.</h2>
        </Reveal>
      </section>

      <section className="about" id="circle">
        <Reveal className="section-label">01 / The Circle</Reveal>
        <Reveal className="about-grid">
          <h2>Built for the<br />long horizon.</h2>
          <div>
            <p>1o8 is a private institution for families shaping the next century. A place where capital, intelligence and conviction meet without spectacle.</p>
            <p>Membership is deliberately limited. Every relationship is considered. Every exchange begins with trust.</p>
          </div>
        </Reveal>
      </section>

      <section className="pillars" id="pillars">
        <Reveal className="pillars-head">
          <div className="section-label">02 / The Seven Pillars</div>
          <h2>What endures.</h2>
        </Reveal>
        <div className="pillar-list">
          {pillars.map(([number, title, copy]) => (
            <Reveal className="pillar" key={title}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p><i>↗</i>
            </Reveal>
          ))}
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
            <label>Why 1o8?<textarea name="reason" rows={2} /></label>
            <button className="outline-link" type="submit"><span>Request invitation</span><b>↗</b></button>
          </form>}
        </Reveal>
      </section>

      <footer>
        <div className="footer-mark">1o8</div>
        <p>Private.<br />Confidential.<br />By invitation.</p>
        <div className="footer-meta"><span>One Hundred Eight © 2026</span><Link href="/signin">Member access ↗</Link></div>
      </footer>
    </main>
  );
}
