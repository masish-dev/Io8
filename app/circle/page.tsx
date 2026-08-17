import Link from "next/link";

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

    <section className="circle-image-story">
      <figure><img src="/io8-gold-emblem-pattern.png" alt="Gold Io8 emblems arranged on a dark tactile surface" /></figure>
      <div><div className="section-label">Continuity / 02</div><h2>A circle shaped by contribution.</h2><p>What members bring matters as much as what they seek: judgement earned over time, access offered with care, and a willingness to help the next generation build with conviction.</p><Link className="outline-link" href="/invitation"><span>Request invitation</span><b>↗</b></Link></div>
    </section>
  </main>;
}
