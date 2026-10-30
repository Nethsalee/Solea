"use client";
import { useState, useEffect, useRef, type ReactNode } from "react";
export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
 const ref = useRef<HTMLDivElement>(null);
 const [visible, setVisible] = useState(false);
 useEffect(() => {
  if (!ref.current) return;
  const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.12 });
  observer.observe(ref.current);
  return () => observer.disconnect();
 }, []);
 return <div ref={ref} className={`catalog-reveal${visible ? " animate-fade-up" : ""}`} style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}
