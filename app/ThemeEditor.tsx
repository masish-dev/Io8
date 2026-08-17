"use client";

import { useEffect, useState } from "react";

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
  { id: "new-amsterdam", name: "New Amsterdam" }, { id: "alumni", name: "Alumni Pinstripe" },
  { id: "text-me-one", name: "Text Me One" }, { id: "syne", name: "Syne" },
  { id: "figtree", name: "Figtree" }, { id: "anta", name: "Anta" },
  { id: "quattrocento", name: "Quattrocento" }, { id: "zodiak", name: "Zodiak" },
  { id: "chillax", name: "Chillax" },
];

export default function ThemeEditor() {
  const [theme, setTheme] = useState<Theme>("momo");
  const [typeface, setTypeface] = useState<Typeface>("syne");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("io8-theme") as Theme | null;
    const savedTypeface = localStorage.getItem("io8-typeface") as Typeface | null;
    if (savedTheme && themes.some(({ id }) => id === savedTheme)) setTheme(savedTheme);
    if (savedTypeface && typefaces.some(({ id }) => id === savedTypeface)) setTypeface(savedTypeface);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.font = typeface;
    localStorage.setItem("io8-theme", theme);
    localStorage.setItem("io8-typeface", typeface);
  }, [theme, typeface]);

  return <>
    <button className={`edit-design-button ${open ? "drawer-is-open" : ""}`} type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="design-drawer" aria-label="Edit colors and typography"><span>✎</span><b>Edit</b></button>
    <aside id="design-drawer" className={`theme-switcher ${open ? "open" : ""}`} aria-label="Edit colors and typography" aria-hidden={!open}>
      <div className="drawer-head"><div><small>Io8 Design System</small><h2>Set the atmosphere.</h2></div><button type="button" onClick={() => setOpen(false)} aria-label="Close design panel">×</button></div>
      <span className="theme-caption">Palette</span>
      <div className="theme-options">{themes.map((item) => <button key={item.id} type="button" className={theme === item.id ? "active" : ""} onClick={() => setTheme(item.id)} aria-pressed={theme === item.id} aria-label={`Use ${item.name} theme`} title={item.name}><i>{item.colors.map((color) => <b key={color} style={{ background: color }} />)}</i><span>{item.name}</span></button>)}</div>
      <span className="theme-caption font-caption">Typeface</span>
      <div className="font-options">{typefaces.map((item) => <button key={item.id} type="button" data-preview-font={item.id} className={typeface === item.id ? "active" : ""} onClick={() => setTypeface(item.id)} aria-pressed={typeface === item.id} aria-label={`Use ${item.name} typeface`} title={item.name}><b>Aa</b><span>{item.name}</span></button>)}</div>
    </aside>
  </>;
}
