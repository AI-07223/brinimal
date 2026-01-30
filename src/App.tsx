import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

// Import sections
import Navigation from "./sections/Navigation";
import NavigationDots from "./components/NavigationDots";
import HeroSection from "./sections/HeroSection";
import SignatureSection from "./sections/SignatureSection";
import LookbookSection from "./sections/LookbookSection";
import CollectionSection from "./sections/CollectionSection";
import CampaignSection from "./sections/CampaignSection";
import EssenceSection from "./sections/EssenceSection";
import StorySection from "./sections/StorySection";
import DetailSection from "./sections/DetailSection";
import MoodSection from "./sections/MoodSection";
import LightSection from "./sections/LightSection";
import SilhouetteSection from "./sections/SilhouetteSection";
import FormSection from "./sections/FormSection";
import GraceSection from "./sections/GraceSection";
import ContactSection from "./sections/ContactSection";

// Import pages
import ShopPage from "./pages/ShopPage";
import LookbookPage from "./pages/LookbookPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

gsap.registerPlugin(ScrollTrigger);

// Main Home component with scroll sections
function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount before setting up global snap
    const timer = setTimeout(() => {
      setupGlobalSnap();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const setupGlobalSnap = () => {
    const pinned = ScrollTrigger.getAll()
      .filter((st) => st.vars.pin)
      .sort((a, b) => a.start - b.start);

    const maxScroll = ScrollTrigger.maxScroll(window);
    if (!maxScroll || pinned.length === 0) return;

    // Build ranges and snap targets for each pinned section
    const pinnedRanges = pinned.map((st) => ({
      start: st.start / maxScroll,
      end: (st.end ?? st.start) / maxScroll,
      // Snap to center of pin range - where content is fully visible
      center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
    }));

    // Get the last pinned section (GraceSection) - snapping stops after this
    const lastPinnedEnd = pinnedRanges[pinnedRanges.length - 1]?.end ?? 1;

    ScrollTrigger.create({
      snap: {
        snapTo: (value: number) => {
          // Don't snap if we're past the last pinned section (in flowing content)
          if (value > lastPinnedEnd + 0.02) {
            return value;
          }

          // Check if within any pinned section range (with buffer for smoothness)
          const inPinned = pinnedRanges.some(
            (r) => value >= r.start - 0.05 && value <= r.end + 0.05,
          );

          // If not in a pinned section (in flowing content), don't snap
          if (!inPinned) return value;

          // Find nearest section center
          const target = pinnedRanges.reduce(
            (closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value)
                ? r.center
                : closest,
            pinnedRanges[0]?.center ?? 0,
          );

          // Only snap if we're close enough to a section center (within 15%)
          const distance = Math.abs(target - value);
          if (distance > 0.15) return value;

          return target;
        },
        duration: { min: 0.35, max: 0.6 },
        delay: 0.02,
        ease: "power2.inOut",
      },
    });
  };

  return (
    <div ref={mainRef} className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Dot Navigation - Only on home page */}
      <NavigationDots />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection className="z-10" />

        {/* Section 2: Signature (Three Panels) */}
        <SignatureSection className="z-20" />

        {/* Section 3: Lookbook (Full Frame) */}
        <LookbookSection className="z-30" />

        {/* Section 4: Collection (Two Panels) */}
        <CollectionSection className="z-40" />

        {/* Section 5: Campaign (Full Frame, Right Title) */}
        <CampaignSection className="z-50" />

        {/* Section 6: Essence (Two Panels) */}
        <EssenceSection className="z-[60]" />

        {/* Section 7: Story (Full Frame, Bottom-Left Title) */}
        <StorySection className="z-[70]" />

        {/* Section 8: Detail (Two Panels) */}
        <DetailSection className="z-[80]" />

        {/* Section 9: Mood (Full Frame, Top-Center Title) */}
        <MoodSection className="z-[90]" />

        {/* Section 10: Light (Two Panels) */}
        <LightSection className="z-[100]" />

        {/* Section 11: Silhouette (Full Frame, Bottom-Right Title) */}
        <SilhouetteSection className="z-[110]" />

        {/* Section 12: Form (Two Panels) */}
        <FormSection className="z-[120]" />

        {/* Section 13: Grace (Full Frame, Top-Left Title) - LAST PINNED SECTION */}
        <GraceSection className="z-[130]" />

        {/* Section 14: Contact (Flowing) - Snapping stops before this section */}
        <ContactSection />
      </main>
    </div>
  );
}

// Main App with Router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/lookbook" element={<LookbookPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
