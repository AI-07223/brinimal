import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

interface SignatureSectionProps {
  className?: string;
}

export default function SignatureSection({
  className = "",
}: SignatureSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states (hidden/off-screen)
      gsap.set(leftPanelRef.current, { x: "-55vw", opacity: 0 });
      gsap.set(centerPanelRef.current, { y: "100vh", opacity: 0 });
      gsap.set(rightPanelRef.current, { x: "55vw", opacity: 0 });
      gsap.set(headlineRef.current, { y: "18vh", opacity: 0, scale: 0.98 });
      gsap.set([subcopyRef.current, ctaRef.current], { y: 24, opacity: 0 });
      gsap.set(scrollHintRef.current, { y: 10, opacity: 0 });

      // Entrance animation timeline (auto-play) - SMOOTHER
      const entranceTl = gsap.timeline({ paused: true });

      entranceTl.to(
        leftPanelRef.current,
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0,
      );

      entranceTl.to(
        centerPanelRef.current,
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0.08,
      );

      entranceTl.to(
        rightPanelRef.current,
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0.15,
      );

      entranceTl.to(
        headlineRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
        0.25,
      );

      entranceTl.to(
        [subcopyRef.current, ctaRef.current],
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
        0.4,
      );

      entranceTl.to(
        scrollHintRef.current,
        { y: 0, opacity: 0.7, duration: 0.6, ease: "power3.out" },
        0.6,
      );

      // Exit animation timeline (auto-play) - SMOOTHER
      const exitTl = gsap.timeline({ paused: true });

      exitTl.to(
        leftPanelRef.current,
        { x: "-20vw", opacity: 0, duration: 0.6, ease: "power3.in" },
        0,
      );

      exitTl.to(
        centerPanelRef.current,
        { y: "-20vh", opacity: 0, duration: 0.6, ease: "power3.in" },
        0.05,
      );

      exitTl.to(
        rightPanelRef.current,
        { x: "20vw", opacity: 0, duration: 0.6, ease: "power3.in" },
        0.05,
      );

      exitTl.to(
        headlineRef.current,
        { y: "-12vh", opacity: 0, duration: 0.6, ease: "power3.in" },
        0.1,
      );

      exitTl.to(
        [subcopyRef.current, ctaRef.current],
        { opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.in" },
        0.1,
      );

      exitTl.to(
        scrollHintRef.current,
        { y: 15, opacity: 0, duration: 0.4, ease: "power3.in" },
        0,
      );

      // ScrollTrigger with callbacks for auto-play behavior
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        onEnter: () => entranceTl.play(0),
        onLeave: () => exitTl.play(0),
        onEnterBack: () => {
          entranceTl.play(0);
        },
        onLeaveBack: () => exitTl.play(0),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("lookbook");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="signature"
      className={`section-pinned bg-sage ${className}`}
    >
      {/* Vignette */}
      <div className="vignette" />

      {/* Left Model Panel */}
      <div ref={leftPanelRef} className="absolute left-0 top-0 w-1/3 h-full">
        <img
          src="/signature_model.jpg"
          alt="Signature Collection"
          className="w-full h-full editorial-image"
        />
      </div>

      {/* Center Jewelry Panel */}
      <div
        ref={centerPanelRef}
        className="absolute left-1/3 top-0 w-1/3 h-full panel-border"
      >
        <img
          src="/signature_jewelry.jpg"
          alt="Jewelry Detail"
          className="w-full h-full editorial-image"
        />
      </div>

      {/* Right Portrait Panel */}
      <div ref={rightPanelRef} className="absolute right-0 top-0 w-1/3 h-full">
        <img
          src="/signature_portrait.jpg"
          alt="Portrait"
          className="w-full h-full editorial-image"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <h2
          ref={headlineRef}
          className="heading-section text-[#1A1A1A] mb-4 drop-shadow-lg text-shadow-subtle"
          style={{ textShadow: "0 2px 20px rgba(183, 196, 182, 0.8)" }}
        >
          SIGNATURE
        </h2>
        <p
          ref={subcopyRef}
          className="text-center text-[#1A1A1A] text-sm lg:text-base tracking-wide mb-6 max-w-md drop-shadow-md text-shadow-subtle"
          style={{ textShadow: "0 1px 10px rgba(183, 196, 182, 0.9)" }}
        >
          Pieces that stay with you—day to night.
        </p>
        <button ref={ctaRef} className="cta-gold pointer-events-auto">
          Explore the edit
        </button>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity z-30"
      >
        <ChevronDown size={20} className="text-[#3D3D3D] animate-bounce" />
      </div>
    </section>
  );
}
