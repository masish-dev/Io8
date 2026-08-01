import Link from "next/link";

export default function SignIn() {
  return <main className="access-page centered">
    <nav className="nav"><Link className="mark brand-logo" href="/" aria-label="Io8 home"><img src="/io8-logo.svg" alt="Io8" /></Link><div className="nav-center">Member access</div><Link className="close-link" href="/">Close ×</Link></nav>
    <div className="signin-card"><div className="section-label">Private access</div><h1>Welcome<br /><em>back.</em></h1><form><label>Email address<input required type="email" /></label><label>Password<input required type="password" /></label><button className="outline-link"><span>Enter Io8</span><b>→</b></button></form><Link className="setup-link" href="/setup-access">Set up access</Link></div>
  </main>
}
