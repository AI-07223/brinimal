import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled || !isHomePage
            ? "bg-sage/90 backdrop-blur-sm py-4"
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
            <Link
              to="/shop"
              className={`nav-link ${location.pathname === "/shop" ? "text-gold" : ""}`}
            >
              Shop
            </Link>
            <Link
              to="/lookbook"
              className={`nav-link ${location.pathname === "/lookbook" ? "text-gold" : ""}`}
            >
              Lookbook
            </Link>
            <Link
              to="/about"
              className={`nav-link ${location.pathname === "/about" ? "text-gold" : ""}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === "/contact" ? "text-gold" : ""}`}
            >
              Contact
            </Link>
          </div>

          {/* Contact Us & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#1A1A1A] hover:text-gold transition-colors"
            >
              <MessageCircle size={18} strokeWidth={1.5} />
              <span className="text-micro hidden sm:inline">Contact Us</span>
            </a>

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
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`heading-section text-3xl ${location.pathname === "/shop" ? "text-gold" : ""}`}
          >
            Shop
          </Link>
          <Link
            to="/lookbook"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`heading-section text-3xl ${location.pathname === "/lookbook" ? "text-gold" : ""}`}
          >
            Lookbook
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`heading-section text-3xl ${location.pathname === "/about" ? "text-gold" : ""}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`heading-section text-3xl ${location.pathname === "/contact" ? "text-gold" : ""}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}
