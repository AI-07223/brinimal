import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FormSectionProps {
  className?: string;
}

export default function FormSection({ className = "" }: FormSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftModelRef = useRef<HTMLDivElement>(null);
  const rightJewelryRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(leftModelRef.current, { x: "-60vw", opacity: 0 });
      gsap.set(rightJewelryRef.current, { x: "60vw", opacity: 0 });
      gsap.set(headlineRef.current, { y: "14vh", opacity: 0 });
      gsap.set([subcopyRef.current, ctaRef.current], { y: 24, opacity: 0 });
      gsap.set(scrollHintRef.current, { y: 10, opacity: 0 });

      // Entrance timeline
      const entranceTl = gsap.timeline({ paused: true });

      entranceTl.to(
        leftModelRef.current,
        { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
        0,
      );

      entranceTl.to(
        rightJewelryRef.current,
        { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
        0,
      );

      entranceTl.to(
        headlineRef.current,
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0.1,
      );

      entranceTl.to(
        [subcopyRef.current, ctaRef.current],
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
        0.2,
      );

      entranceTl.to(
        scrollHintRef.current,
        { y: 0, opacity: 0.7, duration: 0.5, ease: "power3.out" },
        0.4,
      );

      // Exit timeline
      const exitTl = gsap.timeline({ paused: true });

      exitTl.to(
        leftModelRef.current,
        { x: "-18vw", opacity: 0, duration: 0.6, ease: "power3.in" },
        0,
      );

      exitTl.to(
        rightJewelryRef.current,
        { x: "18vw", opacity: 0, duration: 0.6, ease: "power3.in" },
        0,
      );

      exitTl.to(
        headlineRef.current,
        { y: "-10vh", opacity: 0, duration: 0.6, ease: "power3.in" },
        0,
      );

      exitTl.to(
        [subcopyRef.current, ctaRef.current],
        { opacity: 0, duration: 0.6, ease: "power3.in" },
        0,
      );

      exitTl.to(
        scrollHintRef.current,
        { y: 10, opacity: 0, duration: 0.6, ease: "power3.in" },
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
    const nextSection = document.getElementById("grace");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="form"
      className={`section-pinned bg-sage ${className}`}
    >
      {/* Vignette */}
      <div className="vignette" />

      {/* Left Model Panel */}
      <div ref={leftModelRef} className="absolute left-0 top-0 w-1/2 h-full">
        <img
          src="/form_left.jpg"
          alt="Form"
          className="w-full h-full editorial-image"
        />
      </div>

      {/* Right Jewelry Panel */}
      <div
        ref={rightJewelryRef}
        className="absolute right-0 top-0 w-1/2 h-full"
      >
        <img
          src="/form_right.jpg"
          alt="Form Detail"
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
          FORM
        </h2>
        <p
          ref={subcopyRef}
          className="text-center text-[#1A1A1A] text-sm lg:text-base tracking-wide mb-6 max-w-md drop-shadow-md px-4 text-shadow-subtle"
          style={{ textShadow: "0 1px 10px rgba(183, 196, 182, 0.9)" }}
        >
          Clean geometry. Soft wearability.
        </p>
        <button ref={ctaRef} className="cta-gold pointer-events-auto">
          Shop the core edit
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
