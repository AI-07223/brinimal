import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface LookbookSectionProps {
  className?: string;
}

export default function LookbookSection({
  className = "",
}: LookbookSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(imageRef.current, { scale: 1.1, opacity: 0 });
      gsap.set(topBarRef.current, { y: "-12vh" });
      gsap.set(bottomBarRef.current, { y: "12vh" });
      gsap.set([headlineRef.current, bodyRef.current, ctaRef.current], {
        y: 18,
        opacity: 0,
      });
      gsap.set(scrollHintRef.current, { y: 10, opacity: 0 });

      // Entrance timeline - SMOOTHER
      const entranceTl = gsap.timeline({ paused: true });
      entranceTl
        .fromTo(
          imageRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
          0,
        )
        .fromTo(
          topBarRef.current,
          { y: "-15vh" },
          { y: 0, duration: 0.9, ease: "power3.out" },
          0,
        )
        .fromTo(
          bottomBarRef.current,
          { y: "15vh" },
          { y: 0, duration: 0.9, ease: "power3.out" },
          0,
        )
        .fromTo(
          [headlineRef.current, bodyRef.current, ctaRef.current],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.25,
        )
        .fromTo(
          scrollHintRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 0.7, duration: 0.6, ease: "power3.out" },
          0.55,
        );

      // Exit timeline - SMOOTHER
      const exitTl = gsap.timeline({ paused: true });
      exitTl
        .fromTo(
          imageRef.current,
          { scale: 1, opacity: 1 },
          { scale: 1.08, opacity: 0, duration: 0.6, ease: "power3.in" },
          0,
        )
        .fromTo(
          topBarRef.current,
          { y: 0 },
          { y: "-15vh", duration: 0.6, ease: "power3.in" },
          0,
        )
        .fromTo(
          bottomBarRef.current,
          { y: 0 },
          { y: "15vh", duration: 0.6, ease: "power3.in" },
          0,
        )
        .fromTo(
          [headlineRef.current, bodyRef.current, ctaRef.current],
          { opacity: 1 },
          { opacity: 0, duration: 0.5, ease: "power3.in" },
          0,
        )
        .fromTo(
          scrollHintRef.current,
          { y: 0, opacity: 0.7 },
          { y: 15, opacity: 0, duration: 0.4, ease: "power3.in" },
          0,
        );

      // ScrollTrigger with callbacks
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
    const nextSection = document.getElementById("collection");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      className={`section-pinned bg-sage ${className}`}
    >
      {/* Full-bleed Image */}
      <img
        ref={imageRef}
        src="/lookbook_01.jpg"
        alt="Lookbook"
        className="absolute inset-0 w-full h-full editorial-image"
      />

      {/* Vignette */}
      <div className="vignette" />

      {/* Top Frame Bar */}
      <div
        ref={topBarRef}
        className="frame-bar frame-bar-top flex items-center justify-center"
      >
        <h2
          ref={headlineRef}
          className="heading-section text-[#1A1A1A] text-2xl lg:text-4xl text-shadow-subtle"
        >
          LOOKBOOK
        </h2>
      </div>

      {/* Bottom Frame Bar */}
      <div
        ref={bottomBarRef}
        className="frame-bar frame-bar-bottom flex items-center justify-center px-6"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-4xl gap-4">
          <p
            ref={bodyRef}
            className="text-center lg:text-left text-[#1A1A1A] text-sm lg:text-base max-w-lg text-shadow-subtle"
          >
            A study in light, metal, and movement—shot in natural daylight.
          </p>
          <button ref={ctaRef} className="cta-gold flex items-center gap-2">
            View the gallery <ArrowRight size={14} />
          </button>
        </div>
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
