import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Left panel entrance
      loadTl.fromTo(
        leftPanelRef.current,
        { opacity: 0, x: "-6vw" },
        { opacity: 1, x: 0, duration: 0.9 },
        0,
      );

      // Right panel entrance
      loadTl.fromTo(
        rightPanelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0,
      );

      // Headline letter animation
      const headline = headlineRef.current;
      if (headline) {
        const text = headline.textContent || "";
        headline.innerHTML = text
          .split("")
          .map(
            (char) =>
              `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`,
          )
          .join("");
        const chars = headline.querySelectorAll("span");
        loadTl.fromTo(
          chars,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.03 },
          0.3,
        );
      }

      // Tagline + CTA entrance
      loadTl.fromTo(
        [taglineRef.current, ctaRef.current],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.7,
      );

      // Scroll hint entrance
      loadTl.fromTo(
        scrollHintRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 0.7, duration: 0.5 },
        0.9,
      );

      // Divider entrance
      loadTl.fromTo(
        dividerRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8 },
        0.4,
      );

      // Entrance animation timeline (for onEnter callback) - SMOOTHER
      const entranceTl = gsap.timeline({ paused: true });
      entranceTl.fromTo(
        leftPanelRef.current,
        { x: "-8vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0,
      );
      entranceTl.fromTo(
        rightPanelRef.current,
        { opacity: 0, x: "4vw" },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        0.1,
      );
      entranceTl.fromTo(
        [taglineRef.current, ctaRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        0.3,
      );
      entranceTl.fromTo(
        scrollHintRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.7, duration: 0.7, ease: "power3.out" },
        0.6,
      );
      entranceTl.fromTo(
        dividerRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 0.35, duration: 1, ease: "power3.out" },
        0.2,
      );

      // Exit animation timeline (for onLeave and onLeaveBack callbacks) - SMOOTHER
      const exitTl = gsap.timeline({ paused: true });
      exitTl.fromTo(
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: "-20vw", opacity: 0, duration: 0.7, ease: "power3.in" },
        0,
      );
      exitTl.fromTo(
        rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: "15vw", opacity: 0, duration: 0.7, ease: "power3.in" },
        0,
      );
      exitTl.fromTo(
        dividerRef.current,
        { scaleY: 1, opacity: 0.35 },
        { scaleY: 0.6, opacity: 0, duration: 0.7, ease: "power3.in" },
        0,
      );

      // ScrollTrigger with callbacks for auto-play animations
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        onEnter: () => {
          entranceTl.play(0);
        },
        onLeave: () => {
          exitTl.play(0);
        },
        onEnterBack: () => {
          entranceTl.play(0);
        },
        onLeaveBack: () => {
          exitTl.play(0);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const signatureSection = document.getElementById("signature");
    if (signatureSection) {
      signatureSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned bg-sage ${className}`}
    >
      {/* Vignette */}
      <div className="vignette" />

      {/* Left Photo Panel */}
      <div ref={leftPanelRef} className="absolute left-0 top-0 w-1/2 h-full">
        <img
          src="/hero_portrait.jpg"
          alt="BRINIMAL Jewelry"
          className="w-full h-full editorial-image"
        />
      </div>

      {/* Right Content Panel */}
      <div
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-1/2 h-full flex flex-col items-center justify-center"
      >
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="heading-hero text-[#1A1A1A] mb-6 text-shadow-subtle"
        >
          BRINIMAL
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-center text-[#3D3D3D] text-sm lg:text-base tracking-wide mb-8 max-w-xs text-shadow-subtle"
        >
          Minimal jewelry, designed to be lived in.
        </p>

        {/* CTA */}
        <button ref={ctaRef} className="cta-gold">
          Shop the collection
        </button>
      </div>

      {/* Vertical Divider */}
      <div
        ref={dividerRef}
        className="vertical-divider left-1/2 top-[18vh] h-[64vh] origin-top"
      />

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity"
      >
        <span className="text-micro text-[#3D3D3D] text-shadow-subtle">
          Scroll to explore
        </span>
        <ChevronDown size={16} className="text-[#3D3D3D] animate-bounce" />
      </div>
    </section>
  );
}
