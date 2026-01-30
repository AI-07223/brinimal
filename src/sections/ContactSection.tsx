import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Instagram, Send, MapPin, Mail, Phone } from "lucide-react";

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({
  className = "",
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blockARef = useRef<HTMLDivElement>(null);
  const blockBRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Block A animation
      gsap.fromTo(
        blockARef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blockARef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Block B animation
      gsap.fromTo(
        blockBRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blockBRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setIsNewsletterSubscribed(false);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`bg-offwhite ${className}`}
    >
      {/* Block A: Contact Form */}
      <div ref={blockARef} className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[70vh] rounded-2xl overflow-hidden">
              <img
                src="/contact_portrait.jpg"
                alt="Contact"
                className="w-full h-full editorial-image"
              />
            </div>

            {/* Form */}
            <div className="flex flex-col">
              <h2 className="heading-section text-[#1A1A1A] text-3xl lg:text-5xl mb-4 text-shadow-edge">
                Let's create your stack.
              </h2>
              <p className="text-[#3D3D3D] text-base lg:text-lg mb-8 text-shadow-subtle">
                Book a private styling session or ask us anything.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-micro text-[#3D3D3D] block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border border-[#1A1A1A]/20 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="text-micro text-[#3D3D3D] block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border border-[#1A1A1A]/20 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-micro text-[#3D3D3D] block mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border border-[#1A1A1A]/20 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-gold transition-all resize-none"
                    rows={4}
                    placeholder="Tell us what you're looking for..."
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full lg:w-auto">
                  {isSubmitted ? "Message sent!" : "Send message"}
                </button>
              </form>

              {/* Contact Info */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gold" />
                  <span className="text-sm text-[#3D3D3D]">New York, NY</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gold" />
                  <span className="text-sm text-[#3D3D3D]">
                    hello@brinimal.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gold" />
                  <span className="text-sm text-[#3D3D3D]">
                    +1 (555) 123-4567
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Block B: Newsletter */}
      <div ref={blockBRef} className="py-16 lg:py-24 px-6 lg:px-12 bg-sage/30">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="heading-section text-[#1A1A1A] text-2xl lg:text-4xl mb-4">
            Join the list
          </h3>
          <p className="text-[#3D3D3D] text-base mb-8">
            Early access to drops and lookbook updates.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-transparent border border-[#1A1A1A]/20 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-gold transition-all"
              placeholder="your@email.com"
              required
            />
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2"
            >
              {isNewsletterSubscribed ? "Subscribed!" : "Subscribe"}
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer ref={footerRef} className="py-12 px-6 lg:px-12 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="heading-display text-xl text-offwhite mb-4">
                BRINIMAL
              </h4>
              <p className="text-sm text-offwhite/60">
                Minimal. Metallic. You.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h5 className="text-micro text-offwhite/40 mb-4">Shop</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#collection"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Necklaces
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Earrings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Rings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Bracelets
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 className="text-micro text-offwhite/40 mb-4">Support</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Shipping
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Size Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Care
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h5 className="text-micro text-offwhite/40 mb-4">Connect</h5>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-offwhite/80 hover:text-gold transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-offwhite/80 hover:text-gold transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-offwhite/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-offwhite/40">
              © 2026 BRINIMAL. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-offwhite/40 hover:text-offwhite transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-offwhite/40 hover:text-offwhite transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
