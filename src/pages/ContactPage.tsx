import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Instagram,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Jewelry Lane", "New York, NY 10001"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@brinimal.com", "support@brinimal.com"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "Mon-Fri 9am-6pm EST"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon-Fri: 9am - 6pm", "Saturday: 10am - 4pm"],
  },
];

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. International orders typically arrive within 7-14 business days depending on the destination.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. Items must be unworn and in original packaging. Custom pieces are final sale.",
  },
  {
    question: "How do I care for my jewelry?",
    answer:
      "Store in a dry place, avoid contact with perfumes and lotions, and clean gently with a soft cloth. We include care instructions with every order.",
  },
  {
    question: "Do you offer custom designs?",
    answer:
      "Yes! We love creating custom pieces. Contact us to schedule a consultation with our design team.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="relative bg-sage overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/contact_portrait.jpg"
            alt="Contact BRINIMAL"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sage/80 to-sage" />
        </div>

        <div className="relative z-10 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <span className="text-micro text-gold mb-4 block">Get in Touch</span>
            <h1 className="heading-section text-[#1A1A1A] text-4xl lg:text-6xl mb-6">
              Let's Connect
            </h1>
            <p className="text-[#3D3D3D] text-base lg:text-lg max-w-2xl mx-auto">
              Have a question about our pieces, need styling advice, or want to
              discuss a custom order? We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="bg-sage pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-8">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-offwhite p-6 lg:p-8 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-sage/50 flex items-center justify-center mb-4">
                  <info.icon size={20} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#1A1A1A] font-medium mb-2">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-[#3D3D3D] text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Map Section */}
      <div className="bg-offwhite py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div>
              <span className="text-micro text-gold mb-4 block">
                Send a Message
              </span>
              <h2 className="heading-section text-[#1A1A1A] text-2xl lg:text-4xl mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-[#3D3D3D] text-base mb-8">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-micro text-[#3D3D3D] block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-transparent border border-[#1A1A1A]/20 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-micro text-[#3D3D3D] block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent border border-[#1A1A1A]/20 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-micro text-[#3D3D3D] block mb-2">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-transparent border border-[#1A1A1A]/20 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="custom">Custom Design</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                <div>
                  <label className="text-micro text-[#3D3D3D] block mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full bg-transparent border border-[#1A1A1A]/20 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-gold transition-all resize-none"
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={18} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* WhatsApp Quick Connect */}
              <div className="mt-8 pt-8 border-t border-[#1A1A1A]/10">
                <p className="text-[#3D3D3D] text-sm mb-4">
                  Prefer a quicker response?
                </p>
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1A1A1A] hover:text-gold transition-colors"
                >
                  <MessageCircle size={18} />
                  <span className="text-sm">Chat with us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Map & Image */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="relative aspect-[4/3] bg-sage/30 overflow-hidden">
                <img
                  src="/collection_left.jpg"
                  alt="Our Location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-offwhite p-6 shadow-lg text-center max-w-xs">
                    <MapPin size={24} className="text-gold mx-auto mb-2" />
                    <h3 className="text-[#1A1A1A] font-medium mb-1">
                      BRINIMAL Studio
                    </h3>
                    <p className="text-[#3D3D3D] text-sm">
                      123 Jewelry Lane, New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              {/* Store Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src="/lookbook_06.jpg"
                  alt="Our Store"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-micro text-gold mb-2 block">
                    Visit Our Studio
                  </span>
                  <p className="text-sm text-white/80">
                    By appointment only. Book a private styling session.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-sage/30 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-micro text-gold mb-4 block">
              Common Questions
            </span>
            <h2 className="heading-section text-[#1A1A1A] text-2xl lg:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-offwhite overflow-hidden"
              >
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-[#1A1A1A] font-medium pr-8">
                    {faq.question}
                  </span>
                  <span
                    className={`text-gold transition-transform ${
                      activeFaq === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-[#3D3D3D] text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#3D3D3D] text-sm mb-4">
              Still have questions?
            </p>
            <a href="mailto:hello@brinimal.com" className="cta-gold">
              Email us directly
            </a>
          </div>
        </div>
      </div>

      {/* Social Section */}
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h3 className="text-offwhite font-serif text-2xl mb-4">
            Follow Our Journey
          </h3>
          <p className="text-offwhite/60 text-sm mb-6">
            Stay connected for new releases, behind-the-scenes content, and
            styling inspiration.
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://instagram.com/brinimal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-offwhite/20 flex items-center justify-center text-offwhite hover:text-gold hover:border-gold transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-offwhite/20 flex items-center justify-center text-offwhite hover:text-gold hover:border-gold transition-colors"
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
    </PageLayout>
  );
}
