import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface GraceSectionProps {
  className?: string;
}

export default function GraceSection({ className = "" }: GraceSectionProps) {
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
      gsap.set(headlineBlockRef.current, { x: "-40vw", opacity: 0 });
      gsap.set(scrollHintRef.current, { y: 10, opacity: 0 });

      // Entrance timeline
      const entranceTl = gsap.timeline({ paused: true });
      entranceTl
        .fromTo(
          imageRef.current,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
          0,
        )
        .fromTo(
          topBarRef.current,
          { y: "-12vh" },
          { y: 0, duration: 0.9, ease: "power3.out" },
          0,
        )
        .fromTo(
          bottomBarRef.current,
          { y: "12vh" },
          { y: 0, duration: 0.9, ease: "power3.out" },
          0,
        )
        .fromTo(
          headlineBlockRef.current,
          { x: "-40vw", opacity: 0 },
          { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
          0.15,
        )
        .fromTo(
          scrollHintRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 0.7, duration: 0.5, ease: "power3.out" },
          0.5,
        );

      // Exit timeline
      const exitTl = gsap.timeline({ paused: true });
      exitTl
        .fromTo(
          imageRef.current,
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0, duration: 0.6, ease: "power3.in" },
          0,
        )
        .fromTo(
          topBarRef.current,
          { y: 0 },
          { y: "-12vh", duration: 0.6, ease: "power3.in" },
          0,
        )
        .fromTo(
          bottomBarRef.current,
          { y: 0 },
          { y: "12vh", duration: 0.6, ease: "power3.in" },
          0,
        )
        .fromTo(
          headlineBlockRef.current,
          { x: 0, opacity: 1 },
          { x: "-18vw", opacity: 0, duration: 0.6, ease: "power3.in" },
          0,
        )
        .fromTo(
          scrollHintRef.current,
          { y: 0, opacity: 0.7 },
          { y: 10, opacity: 0, duration: 0.3, ease: "power3.in" },
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
    const nextSection = document.getElementById("contact");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="grace"
      className={`section-pinned bg-sage ${className}`}
    >
      {/* Full-bleed Image */}
      <img
        ref={imageRef}
        src="/grace_portrait.jpg"
        alt="Grace"
        className="absolute inset-0 w-full h-full editorial-image"
      />

      {/* Vignette */}
      <div className="vignette" />

      {/* Top Frame Bar */}
      <div ref={topBarRef} className="frame-bar frame-bar-top" />

      {/* Bottom Frame Bar */}
      <div ref={bottomBarRef} className="frame-bar frame-bar-bottom" />

      {/* Headline Block - Top Left */}
      <div
        ref={headlineBlockRef}
        className="absolute left-[6vw] top-[14vh] max-w-[34vw] z-20"
      >
        <h2
          className="heading-section text-[#1A1A1A] mb-4 drop-shadow-lg text-shadow-subtle"
          style={{ textShadow: "0 2px 20px rgba(183, 196, 182, 0.8)" }}
        >
          GRACE
        </h2>
        <p
          className="text-[#1A1A1A] text-sm lg:text-base tracking-wide mb-6 drop-shadow-md text-shadow-subtle"
          style={{ textShadow: "0 1px 10px rgba(183, 196, 182, 0.9)" }}
        >
          Minimal effort. Maximum presence.
        </p>
        <button className="cta-gold">Book a private viewing</button>
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
