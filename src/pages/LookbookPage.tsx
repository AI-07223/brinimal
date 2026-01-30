import { useState } from "react";
import PageLayout from "@/components/PageLayout";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
  size: "large" | "medium" | "small";
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/hero_portrait.jpg",
    title: "The Essence",
    description: "Minimal chains that speak volumes",
    category: "Campaign",
    size: "large",
  },
  {
    id: 2,
    src: "/lookbook_01.jpg",
    title: "Golden Hour",
    description: "Earrings in natural light",
    category: "Details",
    size: "medium",
  },
  {
    id: 3,
    src: "/lookbook_02.jpg",
    title: "Stacked Stories",
    description: "Rings meant for layering",
    category: "Details",
    size: "medium",
  },
  {
    id: 4,
    src: "/lookbook_03.jpg",
    title: "Soft Focus",
    description: "Delicate moments captured",
    category: "Campaign",
    size: "small",
  },
  {
    id: 5,
    src: "/lookbook_04.jpg",
    title: "Pearl Perfection",
    description: "Timeless elegance redefined",
    category: "Collection",
    size: "medium",
  },
  {
    id: 6,
    src: "/lookbook_05.jpg",
    title: "Light Touch",
    description: "Where minimal meets bold",
    category: "Campaign",
    size: "large",
  },
  {
    id: 7,
    src: "/lookbook_06.jpg",
    title: "Everyday Luxury",
    description: "Designed for daily wear",
    category: "Collection",
    size: "medium",
  },
  {
    id: 8,
    src: "/collection_left.jpg",
    title: "The Collection",
    description: "Curated pieces for every occasion",
    category: "Campaign",
    size: "small",
  },
  {
    id: 9,
    src: "/collection_right.jpg",
    title: "Contrast",
    description: "Light and shadow interplay",
    category: "Details",
    size: "medium",
  },
  {
    id: 10,
    src: "/contact_portrait.jpg",
    title: "Personal Style",
    description: "Make it uniquely yours",
    category: "Campaign",
    size: "large",
  },
];

const categories = ["All", "Campaign", "Collection", "Details"];

export default function LookbookPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-offwhite pt-12 lg:pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-micro text-gold mb-4 block">
              Visual Stories
            </span>
            <h1 className="heading-section text-[#1A1A1A] text-4xl lg:text-6xl mb-6">
              Lookbook
            </h1>
            <p className="text-[#3D3D3D] text-base lg:text-lg max-w-2xl mx-auto">
              Explore our jewelry through an editorial lens. Each image captures
              the essence of minimal luxury—where less becomes infinitely more.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-4 lg:gap-8 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm tracking-wide transition-all relative pb-2 ${
                  selectedCategory === cat
                    ? "text-[#1A1A1A] font-medium"
                    : "text-[#3D3D3D] hover:text-[#1A1A1A]"
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Gallery */}
      <div className="bg-offwhite pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="break-inside-avoid group cursor-pointer"
              >
                <div
                  className={`relative overflow-hidden ${
                    image.size === "large"
                      ? "aspect-[3/4]"
                      : image.size === "medium"
                      ? "aspect-[4/5]"
                      : "aspect-square"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-micro text-gold mb-2 block">
                      {image.category}
                    </span>
                    <h3 className="text-white font-serif text-xl lg:text-2xl mb-1">
                      {image.title}
                    </h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Quote Section */}
      <div className="bg-sage py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <blockquote className="heading-section text-[#1A1A1A] text-2xl lg:text-4xl mb-8 leading-relaxed">
            "Jewelry is not just an accessory. It's a form of self-expression,
            a way to tell your story without words."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-[#1A1A1A]/30" />
            <span className="text-micro text-[#3D3D3D]">BRINIMAL ethos</span>
            <div className="w-16 h-px bg-[#1A1A1A]/30" />
          </div>
        </div>
      </div>

      {/* Editorial Story Section */}
      <div className="bg-offwhite py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/lookbook_04.jpg"
                alt="Editorial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-[#1A1A1A]/10" />
            </div>

            {/* Content */}
            <div className="lg:pl-8">
              <span className="text-micro text-gold mb-4 block">
                Behind the Lens
              </span>
              <h2 className="heading-section text-[#1A1A1A] text-3xl lg:text-5xl mb-6">
                The Art of Less
              </h2>
              <div className="space-y-4 text-[#3D3D3D] text-base lg:text-lg leading-relaxed">
                <p>
                  Our lookbook is more than product photography—it's a visual
                  narrative of intentionality. Each frame is carefully composed
                  to capture the quiet confidence of minimal design.
                </p>
                <p>
                  We believe that true luxury lies in restraint. By stripping
                  away the unnecessary, we allow the essential elements to
                  breathe: the curve of a chain, the weight of a pendant, the
                  way light catches a polished surface.
                </p>
                <p>
                  This collection celebrates the beauty of simplicity and the
                  power of understatement.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-[#1A1A1A]/10">
                <div className="flex items-center gap-8">
                  <div>
                    <span className="text-3xl lg:text-4xl font-serif text-[#1A1A1A]">
                      24
                    </span>
                    <p className="text-micro text-[#3D3D3D] mt-1">Pieces</p>
                  </div>
                  <div className="w-px h-12 bg-[#1A1A1A]/20" />
                  <div>
                    <span className="text-3xl lg:text-4xl font-serif text-[#1A1A1A]">
                      4
                    </span>
                    <p className="text-micro text-[#3D3D3D] mt-1">Collections</p>
                  </div>
                  <div className="w-px h-12 bg-[#1A1A1A]/20" />
                  <div>
                    <span className="text-3xl lg:text-4xl font-serif text-[#1A1A1A]">
                      ∞
                    </span>
                    <p className="text-micro text-[#3D3D3D] mt-1">Possibilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[2000] bg-[#1A1A1A]/95 flex items-center justify-center p-6 lg:p-12"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="max-w-5xl w-full max-h-full flex flex-col lg:flex-row gap-8 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 max-h-[70vh]">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>
            <div className="lg:w-72 text-white">
              <span className="text-micro text-gold mb-2 block">
                {selectedImage.category}
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl mb-3">
                {selectedImage.title}
              </h3>
              <p className="text-white/70 mb-6">{selectedImage.description}</p>
              <button
                className="cta-gold text-white"
                onClick={() => setSelectedImage(null)}
              >
                <span className="text-white">Close view</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
