"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { VolumeOn, VolumeOff } from "@/components/ui/icons";
import { homeHero } from "@/content/home";

/**
 * Homepage hero, full-bleed video with a simple ink overlay, rotating
 * headline on the left. Rotation runs only after mount so SSR renders the
 * first headline deterministically.
 */
export function Hero() {
  const { eyebrow, headlines, lead, primaryCta, secondaryCta } = homeHero;
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    if (!next) void video.play().catch(() => {});
    setMuted(next);
  };

  useEffect(() => {
    if (headlines.length <= 1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % headlines.length);
    }, 4500);
    return () => clearInterval(id);
  }, [headlines.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    }
  }, []);

  // Auto-mute the video once the hero scrolls out of view so its audio doesn't
  // keep playing further down the page. We only force-mute on exit; we never
  // auto-unmute — the user stays in control of turning sound back on.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.muted) {
          video.muted = true;
          setMuted(true);
        }
      },
      // Fire as soon as the hero is mostly out of frame.
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mt-[89px] flex items-center overflow-hidden bg-ink text-paper md:min-h-[calc(100vh-89px)]"
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20"
      />
      {/* Bottom scrim: darkens the lower area so the lead copy + CTAs stay
          readable over bright video frames. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent"
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
                  className="col-start-1 row-start-1 transition-opacity duration-500"
                  style={{
                    opacity: i === index ? 1 : 0,
                    pointerEvents: i === index ? "auto" : "none",
                  }}
                >
                  {line}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lead text-paper/70 [text-shadow:0_1px_14px_rgba(0,0,0,0.7)]">
            {lead}
          </p>

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
        </div>
      </Container>

      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute hero video" : "Mute hero video"}
        aria-pressed={!muted}
        className="absolute right-5 top-5 z-30 flex items-center gap-2 border border-paper/25 bg-ink/80 px-3 py-2 text-sm font-medium text-paper transition-colors hover:border-paper/50 md:right-8 md:top-8"
      >
        {muted ? (
          <VolumeOff className="h-4 w-4" />
        ) : (
          <VolumeOn className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">{muted ? "Sound off" : "Sound on"}</span>
      </button>
    </section>
  );
}
