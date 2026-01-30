import { useEffect, useRef } from "react";
import { Gem, Leaf, Heart, Award, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const values = [
  {
    icon: Gem,
    title: "Quality First",
    description:
      "Every piece is crafted using premium materials—14k gold, sterling silver, and ethically sourced gemstones. We never compromise on quality.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practice",
    description:
      "Our jewelry is made with recycled metals and eco-conscious processes. We believe luxury should never come at the cost of our planet.",
  },
  {
    icon: Heart,
    title: "Made with Care",
    description:
      "Each piece is handcrafted by skilled artisans who share our passion for perfection. The human touch makes all the difference.",
  },
  {
    icon: Award,
    title: "Timeless Design",
    description:
      "We create jewelry that transcends trends. Our minimalist aesthetic ensures your pieces remain elegant for years to come.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description:
      "BRINIMAL was founded with a simple mission: to create jewelry that celebrates minimalism and empowers individual style.",
  },
  {
    year: "2021",
    title: "First Collection",
    description:
      "Launched our debut collection featuring 12 signature pieces. The response exceeded all expectations.",
  },
  {
    year: "2022",
    title: "Sustainable Shift",
    description:
      "Transitioned to 100% recycled metals and carbon-neutral shipping. Sustainability became our core value.",
  },
  {
    year: "2023",
    title: "Global Reach",
    description:
      "Expanded to serve customers in over 30 countries while maintaining our commitment to craftsmanship.",
  },
  {
    year: "2024",
    title: "The Future",
    description:
      "Continuing to innovate with new materials and designs while staying true to our minimalist roots.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout>
      {/* Hero Section */}
      <div ref={heroRef} className="relative bg-sage overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero_portrait.jpg"
            alt="About BRINIMAL"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage via-sage/90 to-sage/70" />
        </div>

        <div className="relative z-10 min-h-[70vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
            <div className="max-w-2xl">
              <span className="text-micro text-gold mb-4 block">
                Our Story
              </span>
              <h1 className="heading-section text-[#1A1A1A] text-4xl lg:text-6xl xl:text-7xl mb-6">
                Minimal by Design
              </h1>
              <p className="text-[#3D3D3D] text-lg lg:text-xl leading-relaxed">
                BRINIMAL was born from a belief that true luxury lies in
                simplicity. We create jewelry for those who understand that
                less is not just more—it's everything.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-offwhite py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
            <span className="text-micro text-gold mb-6 block">Our Mission</span>
            <h2 className="font-serif text-2xl lg:text-4xl text-[#1A1A1A] leading-relaxed mb-8">
              "To create timeless pieces that empower self-expression through
              thoughtful design, sustainable practices, and uncompromising
              quality."
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-[#1A1A1A]/20" />
              <span className="text-micro text-[#3D3D3D]">
                Our Promise to You
              </span>
              <div className="w-12 h-px bg-[#1A1A1A]/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Craftsmanship Section */}
      <div className="bg-[#1A1A1A] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Grid */}
            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/lookbook_01.jpg"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden mt-8">
                <img
                  src="/lookbook_02.jpg"
                  alt="Details"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content */}
            <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
              <span className="text-micro text-gold mb-4 block">Craftsmanship</span>
              <h2 className="heading-section text-offwhite text-3xl lg:text-5xl mb-6">
                The Art of Detail
              </h2>
              <div className="space-y-4 text-offwhite/70 text-base lg:text-lg leading-relaxed">
                <p>
                  Every BRINIMAL piece begins with a sketch, refined through
                  countless iterations until the design achieves perfect
                  balance. Our artisans then bring these designs to life using
                  time-honored techniques combined with modern precision.
                </p>
                <p>
                  We work exclusively with 14k solid gold and sterling silver,
                  ensuring each piece maintains its beauty for a lifetime. Our
                  gemstones are ethically sourced, selected for their clarity
                  and character.
                </p>
                <p>
                  The result is jewelry that feels as good as it looks—pieces
                  you'll reach for every day, treasures that become part of
                  your story.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-offwhite/10">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <span className="text-3xl lg:text-4xl font-serif text-gold">
                      14k
                    </span>
                    <p className="text-micro text-offwhite/60 mt-2">
                      Solid Gold
                    </p>
                  </div>
                  <div>
                    <span className="text-3xl lg:text-4xl font-serif text-gold">
                      925
                    </span>
                    <p className="text-micro text-offwhite/60 mt-2">
                      Sterling Silver
                    </p>
                  </div>
                  <div>
                    <span className="text-3xl lg:text-4xl font-serif text-gold">
                      100%
                    </span>
                    <p className="text-micro text-offwhite/60 mt-2">
                      Handcrafted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-offwhite py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 reveal opacity-0 translate-y-8 transition-all duration-700">
            <span className="text-micro text-gold mb-4 block">Our Values</span>
            <h2 className="heading-section text-[#1A1A1A] text-3xl lg:text-5xl">
              What We Believe
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="reveal opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-sage/50 flex items-center justify-center mb-6">
                  <value.icon size={24} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#1A1A1A] font-medium text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-[#3D3D3D] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-sage/30 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 reveal opacity-0 translate-y-8 transition-all duration-700">
            <span className="text-micro text-gold mb-4 block">Our Journey</span>
            <h2 className="heading-section text-[#1A1A1A] text-3xl lg:text-5xl">
              The Story So Far
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-[#1A1A1A]/20 lg:-translate-x-px" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`reveal opacity-0 translate-y-8 transition-all duration-700 relative flex items-start gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-px lg:-translate-x-1.5 mt-2" />

                  {/* Content */}
                  <div
                    className={`pl-12 lg:pl-0 lg:w-1/2 ${
                      index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"
                    }`}
                  >
                    <span className="text-gold font-serif text-2xl lg:text-3xl">
                      {item.year}
                    </span>
                    <h3 className="text-[#1A1A1A] font-medium text-lg mt-2 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#3D3D3D] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-offwhite py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 relative overflow-hidden bg-sage rounded-2xl">
            <div className="absolute inset-0">
              <img
                src="/collection_right.jpg"
                alt="Collection"
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            <div className="relative z-10 py-16 lg:py-24 px-8 lg:px-16 text-center">
              <h2 className="heading-section text-[#1A1A1A] text-2xl lg:text-4xl mb-4">
                Discover Our Collection
              </h2>
              <p className="text-[#3D3D3D] text-base lg:text-lg max-w-lg mx-auto mb-8">
                Explore our curated selection of minimal jewelry, designed to
                be worn, loved, and treasured.
              </p>
              <a
                href="/shop"
                className="btn-primary inline-flex items-center gap-2"
              >
                Shop Now
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
