import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
const links = [{ href: "/our-story", label: "Our Story" }, { href: "/sustainability", label: "Sustainability" }, { href: "/materials", label: "Materials" }, { href: "/press", label: "Press" }];
export default function AboutShell({ current, label, title, intro, children }: { current: string; label: string; title: ReactNode; intro: string; children: ReactNode }) {
  return <div className="catalog-page about-page"><div className="container"><nav className="catalog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>About</span><span>/</span><span aria-current="page">{current}</span></nav><Reveal><header className="about-heading"><p className="section-label">{label}</p><h1>{title}</h1><p>{intro}</p></header></Reveal><nav className="about-nav" aria-label="About SOLEA">{links.map(link => <Link href={link.href} key={link.href} aria-current={current === link.label ? "page" : undefined}>{link.label}<span aria-hidden="true">↗</span></Link>)}</nav>{children}<Reveal><section className="about-closing"><p className="section-label">Made for your everyday</p><h2>Find your next<br /><em>favourite pair.</em></h2><Link className="btn-primary" href="/collections">Explore the collections ↗</Link></section></Reveal></div></div>;
}
