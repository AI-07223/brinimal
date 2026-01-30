import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "signature", label: "Signature" },
  { id: "lookbook", label: "Lookbook" },
  { id: "collection", label: "Collection" },
  { id: "campaign", label: "Campaign" },
  { id: "essence", label: "Essence" },
  { id: "story", label: "Story" },
  { id: "detail", label: "Detail" },
  { id: "mood", label: "Mood" },
  { id: "light", label: "Light" },
  { id: "silhouette", label: "Silhouette" },
  { id: "form", label: "Form" },
  { id: "grace", label: "Grace" },
  { id: "contact", label: "Contact" },
];

export default function NavigationDots() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait for ScrollTriggers to be created
    const timer = setTimeout(() => {
      setIsVisible(true);

      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      // Create ScrollTrigger to track active section
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const scrollY = self.scroll();

          // Find which section is currently in view
          let currentIndex = 0;
          for (let i = 0; i < pinned.length; i++) {
            const st = pinned[i];
            if (scrollY >= st.start - 100) {
              currentIndex = i;
            }
          }

          // Check if we're in the contact section (flowing)
          const maxScroll = ScrollTrigger.maxScroll(window);
          if (scrollY > maxScroll - window.innerHeight * 1.5) {
            currentIndex = sections.length - 1;
          }

          setActiveIndex(currentIndex);
        },
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (index: number) => {
    const sectionId = sections[index]?.id;
    if (!sectionId) return;

    const element = document.getElementById(sectionId);
    if (element) {
      // Use native smooth scroll
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[200] flex flex-col items-center gap-2 sm:gap-3">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(index)}
          className="group relative flex items-center justify-center w-6 h-6 transition-all duration-300"
          aria-label={`Go to ${section.label}`}
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-4 px-3 py-1.5 bg-[#1A1A1A]/90 text-white text-xs tracking-widest uppercase rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {section.label}
          </span>

          {/* Dot */}
          <span
            className={`block rounded-full transition-all duration-500 ease-out ${
              index === activeIndex
                ? "w-3 h-3 bg-[#D8A14F]"
                : "w-2 h-2 bg-[#1A1A1A]/30 hover:bg-[#1A1A1A]/60"
            }`}
          />

          {/* Active ring */}
          {index === activeIndex && (
            <span className="absolute inset-0 rounded-full border border-[#D8A14F]/50 animate-ping" />
          )}
        </button>
      ))}
    </div>
  );
}
