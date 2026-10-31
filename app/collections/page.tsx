import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
export const metadata = { title: "Collections | SOLEA" };
const collections = [
 { title: "Men’s", subtitle: "Made for your everyday", image: "photo-1560769629-975ec94e6a86", href: "/men" },
 { title: "Women’s", subtitle: "Effortless by design", image: "photo-1515955656352-a1fa3ffcd111", href: "/women" },
 { title: "Kids’", subtitle: "Small steps. Big adventures.", image: "photo-1608231387042-66d1773070a5", href: "/kids" },
 { title: "Performance", subtitle: "Find your own pace", image: "photo-1542291026-7eec264c27ff", href: "/shop?category=PERFORMANCE%20SERIES" },
 { title: "Street Lifestyle", subtitle: "A different kind of daily essential", image: "photo-1549298916-b41d501d3772", href: "/shop?category=STREET%20LIFESTYLE" },
];
export default function CollectionsPage() {
 return <div className="catalog-page"><div className="container">
  <nav className="catalog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Collections</span></nav>
  <Reveal><header className="catalog-heading"><div><p className="section-label">The SOLEA Edit</p><h1 className="section-title">A collection for<br /><em>every direction.</em></h1></div><p>From slow mornings to city streets. Explore footwear designed around the way you move, with thoughtful details in every pair.</p></header></Reveal>
  <div className="collection-page-grid">{collections.map((c, i) => <Reveal key={c.title} delay={i * 100}><Link href={c.href} className="category-card"><Image src={`https://images.unsplash.com/${c.image}?w=1000&h=1000&fit=crop`} alt={`${c.title} footwear collection`} fill sizes="(max-width: 640px) 100vw, 50vw" /><div className="category-card-content"><p className="category-card-subtitle">{c.subtitle}</p><h2 className="category-card-title">{c.title}</h2><span className="category-card-arrow" aria-hidden="true">↗</span></div></Link></Reveal>)}</div>
  <Reveal><div className="catalog-end"><p>A fresh step forward.</p><Link className="btn-ghost" href="/shop">Discover New Arrivals <span aria-hidden="true">↗</span></Link></div></Reveal>
 </div></div>;
}

