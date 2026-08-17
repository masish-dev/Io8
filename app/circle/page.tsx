import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Circle — Io8",
  description: "Inside Io8: a private institution built around trust, perspective, continuity and generational stewardship.",
  openGraph: { title: "The Circle — Io8", description: "A private institution built around the quality of the conversation.", images: ["https://io8-preview.msshekhawat63.workers.dev/royal-circle-interior.png"] },
  twitter: { card: "summary_large_image", title: "The Circle — Io8", description: "A private institution built around the quality of the conversation.", images: ["https://io8-preview.msshekhawat63.workers.dev/royal-circle-interior.png"] },
};

export default function CirclePage() {
  return <main className="circle-page">
    <nav className="nav circle-nav"><Link className="mark brand-logo" href="/" aria-label="Io8 home"><img src="/io8-logo.svg" alt="Io8" /></Link><div className="nav-center">The Circle</div><Link className="close-link" href="/">Close ×</Link></nav>

    <header className="circle-hero">
      <div className="section-label">The institution / 01</div>
      <h1>Where perspective<br />becomes <em>legacy.</em></h1>
      <div className="circle-hero-copy"><span>Private by design</span><p>Io8 brings together families, founders and investors whose decisions are measured in generations—not quarters.</p></div>
    </header>

    <figure className="circle-lead-image"><img src="/royal-circle-interior.png" alt="A vaulted private gathering space framed by historic stone architecture" /><figcaption><span>House of quiet</span><span>India · Est. 2026</span></figcaption></figure>

    <section className="circle-editorial">
      <div className="section-label">A considered room</div>
      <h2>Built around the quality of the conversation.</h2>
      <div className="circle-columns"><p>Some decisions require more than information. They require context, candour and the confidence that everyone in the room understands the weight of what is being considered.</p><p>Io8 is designed for those moments. Membership is deliberately limited, introductions are thoughtful, and every exchange begins with discretion.</p></div>
    </section>

    <section className="circle-principles">
      <div className="circle-principles-head"><div className="section-label">What the circle holds / 02</div><h2>Four qualities.<br />One shared standard.</h2></div>
      <div className="circle-principle-list">
        <article><span>01</span><h3>Trust</h3><p>Not assumed, announced or accelerated. Trust is built through consistency, discretion and the quiet confidence of being understood.</p></article>
        <article><span>02</span><h3>Perspective</h3><p>The value of a room lies in the distance its members can see. Different histories create a clearer view of what comes next.</p></article>
        <article><span>03</span><h3>Continuity</h3><p>Success becomes meaningful when it can be carried forward. Conversations include the next generation, not only the present one.</p></article>
        <article><span>04</span><h3>Stewardship</h3><p>Capital is treated as responsibility as much as opportunity—deployed with judgement, patience and a sense of consequence.</p></article>
      </div>
    </section>

    <section className="circle-passage">
      <div className="section-label">The long view</div>
      <blockquote>“The most consequential conversations rarely happen in the largest rooms.”</blockquote>
      <p>Io8 creates the conditions for those conversations to happen naturally: without spectacle, without an audience, and without pressure to perform.</p>
    </section>

    <section className="circle-image-story">
      <figure><img src="/io8-gold-emblem-pattern.png" alt="Gold Io8 emblems arranged on a dark tactile surface" /></figure>
      <div><div className="section-label">Continuity / 02</div><h2>A circle shaped by contribution.</h2><p>What members bring matters as much as what they seek: judgement earned over time, access offered with care, and a willingness to help the next generation build with conviction.</p><Link className="outline-link" href="/invitation"><span>Request invitation</span><b>↗</b></Link></div>
    </section>

    <section className="circle-membership">
      <div className="circle-membership-intro"><div className="section-label">How relationships begin / 03</div><h2>Considered at<br />every step.</h2><p>Io8 grows through private introduction. The process is intentionally personal, allowing both the individual and the institution to understand whether there is genuine alignment.</p></div>
      <div className="circle-membership-steps">
        <article><span>01</span><div><h3>Introduced</h3><p>A relationship begins through a member, trusted intermediary or considered private enquiry.</p></div></article>
        <article><span>02</span><div><h3>Understood</h3><p>We learn what has shaped your journey, what matters now and what you hope to contribute.</p></div></article>
        <article><span>03</span><div><h3>Welcomed</h3><p>When values and expectations align, access unfolds thoughtfully and at a human pace.</p></div></article>
      </div>
    </section>

    <section className="circle-closing"><div className="section-label">Private by design</div><h2>For those building<br />beyond themselves.</h2><p>Membership is considered by invitation or private introduction.</p><Link className="outline-link" href="/invitation"><span>Begin privately</span><b>↗</b></Link></section>
  </main>;
}
