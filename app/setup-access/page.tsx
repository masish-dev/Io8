import Link from "next/link";
export default function SetupAccess() {
  return <main className="access-page centered"><nav className="nav"><Link className="mark brand-logo" href="/" aria-label="Io8 home"><img src="/io8-logo.svg" alt="Io8" /></Link><div className="nav-center">Set up access</div><Link className="close-link" href="/">Close ×</Link></nav><div className="signin-card"><div className="section-label">Members / First entry</div><h1>Your private<br /><em>doorway.</em></h1><p>Use the access code shared in your membership correspondence.</p><form><label>Invitation code<input required /></label><label>Email address<input required type="email" /></label><button className="outline-link"><span>Continue</span><b>→</b></button></form></div></main>
}
