import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, ShoppingBag } from "lucide-react";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { to: "/shop", label: "Shop" },
    { to: "/lookbook", label: "Lookbook" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className={`min-h-screen bg-offwhite ${className}`}>
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? "bg-sage/95 backdrop-blur-sm py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="heading-display text-xl lg:text-2xl tracking-[0.2em] text-[#1A1A1A] hover:text-gold transition-colors"
          >
            BRINIMAL
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${
                  location.pathname === link.to ? "text-gold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[#1A1A1A] hover:text-gold transition-colors">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="text-micro hidden sm:inline">Cart (0)</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#1A1A1A]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] bg-sage transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Link to="/" className="heading-section text-3xl">
            Home
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`heading-section text-3xl ${
                location.pathname === link.to ? "text-gold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-20 lg:pt-24">{children}</main>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 bg-[#1A1A1A] mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link
                to="/"
                className="heading-display text-xl text-offwhite mb-4 inline-block"
              >
                BRINIMAL
              </Link>
              <p className="text-sm text-offwhite/60">
                Minimal. Metallic. You.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h5 className="text-micro text-offwhite/40 mb-4">Shop</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/shop"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop?category=necklaces"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Necklaces
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop?category=earrings"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Earrings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop?category=rings"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Rings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop?category=bracelets"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Bracelets
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="text-micro text-offwhite/40 mb-4">Company</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lookbook"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Lookbook
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-offwhite/80 hover:text-gold transition-colors"
                  >
                    Contact
                  </Link>
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
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-offwhite/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-offwhite/40">
              © 2026 BRINIMAL. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-offwhite/60 hover:text-gold transition-colors"
              >
                <Instagram size={18} />
              </a>
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
    </div>
  );
}
