import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { WomenHero, WomenStory } from "./WomenEditorial";

type Edition = "men" | "women" | "arrivals";
const photo = (id: string) => `https://images.unsplash.com/${id}?w=1400&h=1200&fit=crop`;

export function EditorialHero({ edition }: { edition: Edition }) {
 if (edition === "men") return <Reveal><header className="men-editorial">
  <div className="men-editorial-copy"><p className="section-label">Men’s Collection / Everyday Motion</p><h1>Built for<br />the long way<br /><em>home.</em></h1><p>Early starts. Last trains. The detour worth taking. Meet the rotation that keeps up with your everyday.</p><a href="#footwear" className="btn-primary">Find your everyday pair ↗</a><div className="editorial-footnote"><span>01 / CITY ESSENTIALS</span><span>SOLEA — STOCKHOLM</span></div></div>
  <div className="editorial-photo men-espresso-photo"><Image src="/images/men-modern-editorial.png" alt="Floating ivory and silver technical sneaker against a dark studio backdrop" fill priority sizes="(max-width: 800px) 100vw, 50vw" /><a href="#footwear" className="editorial-photo-caption"><span>Everyday Motion / 2026<br /><small>A fresh perspective on movement.</small></span><span>Explore ↗</span></a></div>
 </header></Reveal>;
 if (edition === "women") return <WomenHero />;
 return <Reveal><header className="arrivals-editorial"><div className="arrivals-intro"><div><p className="section-label">Fresh in / Collection 2026</p><h1>The next<br /><em>step starts here.</em></h1></div><div><p>New perspectives on movement. Explore our latest footwear edit, from responsive runners to everyday city silhouettes.</p><a href="#footwear" className="btn-ghost">See the latest styles ↓</a></div></div><div className="drop-spotlight"><div className="drop-number"><span>IN THE SPOTLIGHT</span><strong>01</strong><span>PERFORMANCE SERIES</span></div><Link href="/product/aero-runner" className="drop-photo editorial-photo"><Image src={photo("photo-1608231387042-66d1773070a5")} alt="Aero Runner, the featured new arrival" fill priority sizes="(max-width: 800px) 100vw, 45vw" /></Link><div className="drop-copy"><span className="section-label">New Drop</span><h2>Aero Runner</h2><p>Light Grey / Pure White</p><p>Breathable mesh. Responsive cushioning. A lighter way to take on the day.</p><Link href="/product/aero-runner" className="btn-primary">Discover the Aero Runner ↗</Link><span className="drop-price">$129 / EU 37–45</span></div></div></header></Reveal>;
}

export function EditorialStory({ edition }: { edition: Edition }) {
 if (edition === "men") return <Reveal><section className="editorial-story men-story"><div><p className="section-label">Build your rotation</p><h2>One day.<br /><em>Different directions.</em></h2></div><div className="story-notes"><article><span>01 / PICK UP THE PACE</span><h3>Aero Runner</h3><p>Breathable construction for the active part of your day.</p><Link href="/product/aero-runner">Explore performance ↗</Link></article><article><span>02 / AFTER HOURS</span><h3>Motion 02</h3><p>A charcoal palette and a technical silhouette for city evenings.</p><Link href="/product/motion-02">Explore city essentials ↗</Link></article></div></section></Reveal>;
 if (edition === "women") return <WomenStory />;
 return <Reveal><section className="editorial-story arrivals-story"><div><p className="section-label">Find your direction</p><h2>Fresh arrivals.<br /><em>Your own way.</em></h2><p>Explore the full edit for your everyday rotation.</p></div><Link href="/men"><span>01 / THE MEN’S EDIT</span><h3>Made for movement ↗</h3></Link><Link href="/women"><span>02 / THE WOMEN’S EDIT</span><h3>Everyday expression ↗</h3></Link></section></Reveal>;
}
