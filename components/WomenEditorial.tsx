import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export function WomenHero() {
  return <header className="women-studio">
    <div className="women-studio-layout">
      <Reveal><div className="women-studio-copy"><p className="section-label">Move in your own way</p><h1>All day.<br />All you<span>.</span></h1><p>For the plans you made.<br />And the places you end up.</p><a href="#footwear" className="btn-primary">Shop women’s footwear <span aria-hidden="true">↗</span></a><div className="women-studio-note"><span>01 — THE DAILY COMPANION</span><p>Thoughtful shapes.<br />Uncomplicated comfort.</p></div></div></Reveal>
      <Reveal delay={120}><Link href="/product/cloud-one" className="women-studio-visual"><span className="women-studio-word" aria-hidden="true">SOLEA</span><div className="women-studio-image"><Image src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1400&h=1400&fit=crop" alt="Cloud One sneakers in warm orange tones" fill priority sizes="(max-width: 800px) 100vw, 60vw" /></div><div className="women-studio-caption"><span><strong>Cloud One</strong><small>Street Lifestyle / $145</small></span><span className="women-circle-arrow" aria-hidden="true">↗</span></div></Link></Reveal>
    </div>
    <Reveal><div className="women-studio-strip"><span>YOUR PACE. YOUR PERSPECTIVE.</span><span>Considered design</span><span>Everyday versatility</span><a href="#women-style-notes">Meet your everyday edit ↓</a></div></Reveal>
  </header>;
}

export function WomenStory() {
  return <section id="women-style-notes" className="women-lookbook" aria-labelledby="women-lookbook-title">
    <Reveal><div className="women-lookbook-heading"><p className="section-label">Wear it your way</p><h2 id="women-lookbook-title">Two moods.<br /><em>Endless possibilities.</em></h2><p>A few ideas for wherever the day takes you.</p></div></Reveal>
    <div className="women-lookbook-grid">
      <Reveal><Link href="/product/pace-knit" className="women-mood-card"><div className="women-mood-image"><Image src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1000&h=900&fit=crop" alt="Pace Knit sneakers for a relaxed everyday outfit" fill sizes="(max-width: 640px) 100vw, 50vw" /><span>01 / OFF THE CLOCK</span></div><div className="women-mood-copy"><h3>Take the slower route.</h3><p>Soft layers, relaxed tailoring, and Pace Knit. Your off-duty uniform, sorted.</p><span>Discover Pace Knit ↗</span></div></Link></Reveal>
      <Reveal delay={100}><Link href="/product/sol-terra" className="women-mood-card"><div className="women-mood-image"><Image src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1000&h=900&fit=crop" alt="Sol Terra Court sneakers for the weekend edit" fill sizes="(max-width: 640px) 100vw, 50vw" /><span>02 / OUT OF OFFICE</span></div><div className="women-mood-copy"><h3>Leave the day open.</h3><p>Your favourite denim, a simple tee, and Sol Terra Court. Ready for the unplanned.</p><span>Discover Sol Terra Court ↗</span></div></Link></Reveal>
    </div>
  </section>;
}
