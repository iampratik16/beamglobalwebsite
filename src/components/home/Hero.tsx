"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { homeHero } from "@/content/home";

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
    <section className="relative mt-[73px] flex items-center overflow-hidden bg-ink text-paper md:min-h-[calc(100vh-73px)]">
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
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[140px]"
      />

      <Container className="relative py-20 md:py-24">
        <div className="max-w-3xl">
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
      </Container>
    </section>
  );
}
