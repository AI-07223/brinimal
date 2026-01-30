import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface MoodSectionProps {
  className?: string;
}

export default function MoodSection({ className = "" }: MoodSectionProps) {
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
      gsap.set(headlineBlockRef.current, { y: "-18vh", opacity: 0 });
      gsap.set(scrollHintRef.current, { y: 10, opacity: 0 });

      // Entrance timeline
      const entranceTl = gsap.timeline({
        paused: true,
        defaults: { duration: 1.2, ease: "power3.out" },
      });

      entranceTl
        .to(imageRef.current, { scale: 1, opacity: 1 }, 0)
        .to(topBarRef.current, { y: 0 }, 0)
        .to(bottomBarRef.current, { y: 0 }, 0)
        .to(headlineBlockRef.current, { y: 0, opacity: 1 }, 0.1)
        .to(scrollHintRef.current, { y: 0, opacity: 0.7 }, 0.4);

      // Exit timeline
      const exitTl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.6, ease: "power3.in" },
      });

      exitTl
        .to(imageRef.current, { scale: 1.06, opacity: 0 }, 0)
        .to(topBarRef.current, { y: "-12vh" }, 0)
        .to(bottomBarRef.current, { y: "12vh" }, 0)
        .to(headlineBlockRef.current, { y: "-10vh", opacity: 0 }, 0)
        .to(scrollHintRef.current, { y: 10, opacity: 0 }, 0);

      // Create ScrollTrigger with callbacks
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
    const nextSection = document.getElementById("light");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="mood"
      className={`section-pinned bg-sage ${className}`}
    >
      {/* Full-bleed Image */}
      <img
        ref={imageRef}
        src="/lookbook_04.jpg"
        alt="Mood"
        className="absolute inset-0 w-full h-full editorial-image"
      />

      {/* Vignette */}
      <div className="vignette" />

      {/* Top Frame Bar */}
      <div ref={topBarRef} className="frame-bar frame-bar-top" />

      {/* Bottom Frame Bar */}
      <div ref={bottomBarRef} className="frame-bar frame-bar-bottom" />

      {/* Headline Block - Top Center */}
      <div
        ref={headlineBlockRef}
        className="absolute left-1/2 -translate-x-1/2 top-[14vh] text-center z-20"
      >
        <h2
          className="heading-section text-[#1A1A1A] mb-4 drop-shadow-lg text-shadow-subtle"
          style={{ textShadow: "0 2px 20px rgba(183, 196, 182, 0.8)" }}
        >
          MOOD
        </h2>
        <p
          className="text-[#1A1A1A] text-sm lg:text-base tracking-wide mb-6 max-w-md drop-shadow-md text-shadow-subtle"
          style={{ textShadow: "0 1px 10px rgba(183, 196, 182, 0.9)" }}
        >
          Jewelry that moves with you—never against you.
        </p>
        <button className="cta-gold">Shop everyday pieces</button>
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
