"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { homeHero, culturePillars } from "@/content/home";

/**
 * Homepage hero — layered, editorial. Rotating headline (the existing slider
 * lines) on the left; a dark-glass pillar panel with floating glass chips on
 * the right. Rotation runs only after mount (useEffect) so SSR renders the
 * first headline deterministically — no hydration mismatch.
 */
export function Hero() {
  const { eyebrow, headlines, lead, primaryCta, secondaryCta } = homeHero;
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (headlines.length <= 1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % headlines.length);
    }, 4500);
    return () => clearInterval(id);
  }, [headlines.length]);

  // Pause the background video for users who prefer reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    }
  }, []);

  return (
    <section className="relative flex items-center overflow-hidden bg-ink text-paper md:min-h-[90vh]">
      {/* Background video */}
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Legibility + brand overlays (left/bottom darker for text) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
      />
      {/* texture + colour wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[140px]"
      />

      <Container className="relative grid grid-cols-1 items-center gap-14 pb-20 pt-36 md:pb-28 md:pt-44 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Left — headline */}
        <div>
          <Eyebrow tone="paper" className="mb-6">
            {eyebrow}
          </Eyebrow>

          <h1 className="text-hero max-w-3xl text-paper">
            <span className="sr-only">{headlines[0]}</span>
            <span aria-hidden className="grid grid-cols-1">
              {headlines.map((line, i) => (
                <span
                  key={line}
                  className="col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: i === index ? 1 : 0,
                    transform: i === index ? "translateY(0)" : "translateY(14px)",
                    pointerEvents: i === index ? "auto" : "none",
                  }}
                >
                  {line}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lead text-paper/75">{lead}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={primaryCta.href} variant="onDark">
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              withArrow={false}
              className="border border-paper/30 bg-transparent text-paper hover:bg-paper hover:text-ink"
            >
              {secondaryCta.label}
            </Button>
          </div>

          <div className="mt-12 flex gap-2" aria-hidden>
            {headlines.map((line, i) => (
              <span
                key={line}
                className={`h-1 w-8 transition-colors duration-500 ${
                  i === index ? "bg-gold" : "bg-paper/25"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right — glass pillar panel + floating chips */}
        <div className="relative hidden lg:block">
          <div className="glass-dark rounded-2xl p-7 shadow-float">
            <p className="text-eyebrow text-gold">What we stand for</p>
            <ul className="mt-5 divide-y divide-white/10">
              {culturePillars.map((pillar, i) => (
                <li key={pillar.name} className="flex gap-4 py-4">
                  <span className="font-serif text-2xl leading-none text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display font-bold tracking-tight text-paper">
                      {pillar.name}
                    </p>
                    <p className="mt-0.5 text-sm text-paper/60">{pillar.tagline}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
