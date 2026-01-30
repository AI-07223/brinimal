import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, ChevronDown, Heart, ShoppingBag } from "lucide-react";
import PageLayout from "@/components/PageLayout";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Eternity Chain Necklace",
    category: "necklaces",
    price: 189,
    image: "/collection_left.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: "Minimal Hoop Earrings",
    category: "earrings",
    price: 129,
    image: "/lookbook_01.jpg",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Stackable Signet Ring",
    category: "rings",
    price: 145,
    image: "/lookbook_02.jpg",
  },
  {
    id: 4,
    name: "Delicate Chain Bracelet",
    category: "bracelets",
    price: 98,
    image: "/lookbook_03.jpg",
    isNew: true,
  },
  {
    id: 5,
    name: "Pearl Drop Necklace",
    category: "necklaces",
    price: 245,
    image: "/lookbook_04.jpg",
    isBestseller: true,
  },
  {
    id: 6,
    name: "Threader Earrings",
    category: "earrings",
    price: 115,
    image: "/lookbook_05.jpg",
  },
  {
    id: 7,
    name: "Twist Band Ring",
    category: "rings",
    price: 165,
    image: "/lookbook_06.jpg",
    isNew: true,
  },
  {
    id: 8,
    name: "Cuff Bracelet",
    category: "bracelets",
    price: 175,
    image: "/collection_right.jpg",
  },
  {
    id: 9,
    name: "Layered Pendant Set",
    category: "necklaces",
    price: 220,
    image: "/hero_portrait.jpg",
  },
  {
    id: 10,
    name: "Stud Earring Trio",
    category: "earrings",
    price: 85,
    image: "/contact_portrait.jpg",
    isNew: true,
  },
  {
    id: 11,
    name: "Bold Statement Ring",
    category: "rings",
    price: 195,
    image: "/campaign_01.jpg",
    isBestseller: true,
  },
  {
    id: 12,
    name: "Charm Bracelet",
    category: "bracelets",
    price: 135,
    image: "/essence_left.jpg",
  },
];

const categories = [
  { value: "all", label: "All Jewelry" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earrings" },
  { value: "rings", label: "Rings" },
  { value: "bracelets", label: "Bracelets" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    switch (sortBy) {
      case "newest":
        filtered = filtered.filter((p) => p.isNew).concat(filtered.filter((p) => !p.isNew));
        break;
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default:
        // Keep default order (featured)
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
    setIsFilterOpen(false);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <PageLayout>
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] bg-sage overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/collection_left.jpg"
            alt="Shop Collection"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage/80 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <span className="text-micro text-[#3D3D3D] mb-4 block">
              Curated Collection
            </span>
            <h1 className="heading-section text-[#1A1A1A] text-4xl lg:text-6xl mb-4">
              Shop Jewelry
            </h1>
            <p className="text-[#3D3D3D] text-base lg:text-lg max-w-md">
              Timeless pieces designed for stacking, styling, and everyday elegance.
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="sticky top-16 lg:top-20 z-40 bg-offwhite/95 backdrop-blur-sm border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Category Filter - Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`text-sm tracking-wide transition-colors ${
                    selectedCategory === cat.value
                      ? "text-gold font-medium"
                      : "text-[#3D3D3D] hover:text-[#1A1A1A]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Category Filter - Mobile */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 text-sm text-[#1A1A1A]"
              >
                <Filter size={16} />
                <span>Filter</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-micro text-[#3D3D3D] hidden sm:block">
                Sort by
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-[#1A1A1A] border border-[#1A1A1A]/20 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          {isFilterOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-[#1A1A1A]/10">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`px-4 py-2 text-sm rounded-full border transition-all ${
                      selectedCategory === cat.value
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "bg-transparent text-[#3D3D3D] border-[#1A1A1A]/20 hover:border-[#1A1A1A]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-sage/30 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="text-micro bg-[#1A1A1A] text-white px-3 py-1">
                      New
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="text-micro bg-gold text-white px-3 py-1">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-[#1A1A1A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <button className="btn-primary flex items-center gap-2">
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                >
                  <Heart
                    size={18}
                    className={
                      favorites.includes(product.id)
                        ? "fill-gold text-gold"
                        : "text-[#1A1A1A]"
                    }
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <p className="text-micro text-[#3D3D3D]">
                  {categories.find((c) => c.value === product.category)?.label}
                </p>
                <h3 className="text-[#1A1A1A] font-medium text-sm lg:text-base">
                  {product.name}
                </h3>
                <p className="text-gold font-medium">${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#3D3D3D] text-lg mb-4">
              No products found in this category.
            </p>
            <button
              onClick={() => handleCategoryChange("all")}
              className="cta-gold"
            >
              View All Products
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-sage/30 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="heading-section text-[#1A1A1A] text-2xl lg:text-4xl mb-4">
            Join the List
          </h2>
          <p className="text-[#3D3D3D] text-base mb-8">
            Be the first to know about new arrivals and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-[#1A1A1A]/20 px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-gold transition-all"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
