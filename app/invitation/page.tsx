import Link from "next/link";

export default function Invitation() {
  return <main className="access-page">
    <nav className="nav"><Link className="mark brand-logo" href="/" aria-label="Io8 home"><img src="/io8-logo.svg" alt="Io8" /></Link><div className="nav-center">Private invitation</div><Link className="close-link" href="/">Close ×</Link></nav>
    <div className="access-intro"><div className="section-label">Membership / 01</div><h1>Request<br /><em>invitation.</em></h1><p>Membership is considered by private introduction. Share only what you feel is relevant.</p></div>
    <form className="full-form">
      <label>Full name<input required /></label><label>Email address<input required type="email" /></label>
      <label>Company or family office<input /></label><label>Invitation code <small>Optional</small><input /></label>
      <label className="wide">A brief introduction<textarea rows={3} /></label>
      <button className="outline-link" type="submit"><span>Submit privately</span><b>↗</b></button>
    </form>
  </main>
}
