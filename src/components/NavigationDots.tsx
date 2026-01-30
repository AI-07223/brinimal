import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface Section {
  id: string;
  label: string;
  pinned: boolean;
}

// All sections with their pinned status
const sections: Section[] = [
  { id: "hero", label: "Home", pinned: true },
  { id: "signature", label: "Signature", pinned: true },
  { id: "lookbook", label: "Lookbook", pinned: true },
  { id: "collection", label: "Collection", pinned: true },
  { id: "campaign", label: "Campaign", pinned: true },
  { id: "essence", label: "Essence", pinned: true },
  { id: "story", label: "Story", pinned: true },
  { id: "detail", label: "Detail", pinned: true },
  { id: "mood", label: "Mood", pinned: true },
  { id: "light", label: "Light", pinned: true },
  { id: "silhouette", label: "Silhouette", pinned: true },
  { id: "form", label: "Form", pinned: true },
  { id: "grace", label: "Grace", pinned: true },
  { id: "contact", label: "Contact", pinned: false },
];

// Only show dots for pinned sections on the home page
const pinnedSections = sections.filter((s) => s.pinned);

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

      if (pinned.length === 0) return;

      // Create ScrollTrigger to track active section
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const scrollY = self.scroll();

          // Find which pinned section is currently in view
          let currentIndex = 0;
          for (let i = 0; i < pinned.length; i++) {
            const st = pinned[i];
            // Check if we're past the start of this section
            if (scrollY >= st.start - window.innerHeight * 0.3) {
              currentIndex = i;
            }
          }

          // Check if we're in the contact section (flowing)
          const maxScroll = ScrollTrigger.maxScroll(window);
          const contactThreshold = maxScroll - window.innerHeight * 1.5;

          if (
            scrollY > contactThreshold &&
            scrollY > pinned[pinned.length - 1].end
          ) {
            // We're in the contact section, show last dot as active
            currentIndex = pinned.length - 1;
          }

          setActiveIndex(currentIndex);
        },
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (index: number) => {
    const section = pinnedSections[index];
    if (!section) return;

    const element = document.getElementById(section.id);
    if (element) {
      // Use GSAP for smoother scrolling to the pinned center
      const st = ScrollTrigger.getAll()
        .filter((s) => s.vars.pin)
        .sort((a, b) => a.start - b.start)[index];

      if (st) {
        // Scroll to the center of the pinned range for best viewing
        const targetScroll = st.start + ((st.end ?? st.start) - st.start) * 0.5;
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: targetScroll, autoKill: false },
          ease: "power2.inOut",
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[200] flex flex-col items-center gap-2 sm:gap-3">
      {pinnedSections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(index)}
          className="group relative flex items-center justify-center w-6 h-6 transition-all duration-300"
          aria-label={`Go to ${section.label}`}
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-4 px-3 py-1.5 bg-[#1A1A1A]/90 text-white text-xs tracking-widest uppercase rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none text-shadow-subtle">
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
