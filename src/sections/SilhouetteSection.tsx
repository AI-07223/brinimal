import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SilhouetteSectionProps {
  className?: string;
}

export default function SilhouetteSection({
  className = "",
}: SilhouetteSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const headlineBlockRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(imageRef.current, { scale: 1.1, opacity: 0 });
      gsap.set(topBarRef.current, { y: "-12vh" });
      gsap.set(bottomBarRef.current, { y: "12vh" });
      gsap.set(headlineBlockRef.current, { x: "40vw", opacity: 0 });
      gsap.set(scrollHintRef.current, { y: 10, opacity: 0 });

      // Entrance timeline
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          onEnter: () => {
            entranceTl.restart();
          },
          onLeaveBack: () => {
            // Reset to initial states when scrolling back past start
            gsap.set(imageRef.current, { scale: 1.1, opacity: 0 });
            gsap.set(topBarRef.current, { y: "-12vh" });
            gsap.set(bottomBarRef.current, { y: "12vh" });
            gsap.set(headlineBlockRef.current, { x: "40vw", opacity: 0 });
            gsap.set(scrollHintRef.current, { y: 10, opacity: 0 });
          },
        },
      });

      // Entrance animations
      entranceTl.to(
        imageRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        0,
      );

      entranceTl.to(
        topBarRef.current,
        {
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        0,
      );

      entranceTl.to(
        bottomBarRef.current,
        {
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        0,
      );

      entranceTl.to(
        headlineBlockRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        0,
      );

      entranceTl.to(
        scrollHintRef.current,
        { y: 0, opacity: 0.7, duration: 0.5, ease: "power3.out" },
        0.3,
      );

      // Exit timeline - triggered at end of pin
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          onLeave: () => {
            exitTl.restart();
          },
          onEnterBack: () => {
            entranceTl.play(0);
          },
        },
      });

      // Exit animations (paused initially)
      exitTl.to(imageRef.current, {
        scale: 1.06,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      });

      exitTl.to(
        topBarRef.current,
        {
          y: "-12vh",
          duration: 0.6,
          ease: "power3.in",
        },
        "<",
      );

      exitTl.to(
        bottomBarRef.current,
        {
          y: "12vh",
          duration: 0.6,
          ease: "power3.in",
        },
        "<",
      );

      exitTl.to(
        headlineBlockRef.current,
        {
          x: "18vw",
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        },
        "<",
      );

      exitTl.to(
        scrollHintRef.current,
        { y: 10, opacity: 0, duration: 0.3, ease: "power3.in" },
        0,
      );

      exitTl.pause();
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("form");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="silhouette"
      className={`section-pinned bg-sage ${className}`}
    >
      {/* Full-bleed Image */}
      <img
        ref={imageRef}
        src="/lookbook_05.jpg"
        alt="Silhouette"
        className="absolute inset-0 w-full h-full editorial-image"
      />

      {/* Vignette */}
      <div className="vignette" />

      {/* Top Frame Bar */}
      <div ref={topBarRef} className="frame-bar frame-bar-top" />

      {/* Bottom Frame Bar */}
      <div ref={bottomBarRef} className="frame-bar frame-bar-bottom" />

      {/* Headline Block - Bottom Right */}
      <div
        ref={headlineBlockRef}
        className="absolute right-[6vw] bottom-[14vh] text-right max-w-[34vw] z-20"
      >
        <h2
          className="heading-section text-[#1A1A1A] mb-4 drop-shadow-lg text-shadow-subtle"
          style={{ textShadow: "0 2px 20px rgba(183, 196, 182, 0.8)" }}
        >
          SILHOUETTE
        </h2>
        <p
          className="text-[#1A1A1A] text-sm lg:text-base tracking-wide mb-6 drop-shadow-md text-shadow-subtle"
          style={{ textShadow: "0 1px 10px rgba(183, 196, 182, 0.9)" }}
        >
          Shape that speaks before you do.
        </p>
        <button className="cta-gold">Shop statement pieces</button>
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
