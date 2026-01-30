import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavigationProps {
  cartCount?: number;
}

export default function Navigation({ cartCount = 0 }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? 'bg-sage/90 backdrop-blur-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="heading-display text-xl lg:text-2xl tracking-[0.2em] text-[#1A1A1A] hover:text-gold transition-colors"
          >
            BRINIMAL
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <button onClick={() => scrollToSection('collection')} className="nav-link">
              Shop
            </button>
            <button onClick={() => scrollToSection('lookbook')} className="nav-link">
              Lookbook
            </button>
            <button onClick={() => scrollToSection('story')} className="nav-link">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Contact
            </button>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[#1A1A1A] hover:text-gold transition-colors">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="text-micro hidden sm:inline">Cart ({cartCount})</span>
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
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={() => scrollToSection('collection')}
            className="heading-section text-3xl"
          >
            Shop
          </button>
          <button
            onClick={() => scrollToSection('lookbook')}
            className="heading-section text-3xl"
          >
            Lookbook
          </button>
          <button
            onClick={() => scrollToSection('story')}
            className="heading-section text-3xl"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="heading-section text-3xl"
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
}
