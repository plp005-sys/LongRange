import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import babyImg from "../assets/images/african_baby_banner_1782732961309.jpg";
import firstAidImg from "../assets/images/regenerated_image_1782136435951.jpg";
import skinRepublicImg from "../assets/images/skin_republic_banner_1782733312396.jpg";
import laRiveImg from "../assets/images/la_rive_perfume_banner_1782734576816.jpg";
import { products } from "../data";

export default function Home() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { name: "Personal Care", image: firstAidImg, title: "SELF HEALTH CARE", subtitle: "FIRST AID KIT" },
    { name: "Beauty & Cosmetics", image: laRiveImg, title: "LA RIVE", subtitle: "PERFUMES" },
    { name: "Beauty & Cosmetics", image: skinRepublicImg, title: "GLASS SKIN", subtitle: "UNWRAPPED" },
    { name: "Baby Care", image: babyImg, title: "GENTLE TOUCH", subtitle: "FOR YOUR LITTLE ONE" },
  ];

  useEffect(() => {
    // Simulated API call latency
    setTimeout(() => {
      setFeaturedProducts(products.slice(0, 4));
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [categories.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % categories.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length);

  return (
    <div className="w-full">
      {/* Hero Banner Area */}
      <section className="relative w-full overflow-hidden h-[500px] md:h-[650px] bg-green-50">
        {categories.map((cat, index) => (
            <div 
                key={`cat-${index}`} 
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="w-full h-full flex flex-col items-center pb-8 md:pb-12">
                    <div className="w-full flex-1 z-10 relative">
                       <img 
                         src={cat.image} 
                         alt={cat.name} 
                         className="w-full h-full absolute inset-0 object-cover mix-blend-multiply"
                       />
                    </div>
                    <div className="w-full text-center mt-6 md:mt-8 z-10 flex flex-col justify-center items-center">
                        <h1 className="text-2xl md:text-4xl font-black text-[#32a852] tracking-widest mb-2 md:mb-3">
                          {cat.title}
                        </h1>
                        <h2 className="text-lg md:text-2xl font-light text-[#32a852] tracking-[0.2em] mb-4 md:mb-5 uppercase">
                          {cat.subtitle}
                        </h2>
                        <div>
                            <Link to={`/shop?category=${cat.name}`}>
                              <Button variant="secondary" className="bg-[#FFF101] text-gray-900 hover:bg-[#FFF101]/90 rounded-full text-sm md:text-base px-6 py-2.5 h-auto font-bold uppercase tracking-wide">
                                Shop {cat.name}
                              </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        
        {/* Carousel controls */}
        <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-black/40 hover:text-[#32a852] transition-colors z-20 bg-white/50 hover:bg-white/80 rounded-full p-1 md:p-2">
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-black/40 hover:text-[#32a852] transition-colors z-20 bg-white/50 hover:bg-white/80 rounded-full p-1 md:p-2">
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {categories.map((_, index) => (
              <button 
                key={`dot-${index}`} 
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-[#32a852]' : 'bg-gray-400/50 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
          ))}
        </div>
      </section>

      {/* Services Promo */}
      <section className="bg-[#32a852] text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">More Than Just a Pharmacy</h2>
          <p className="text-lg mb-8 text-white/90">
            Easily manage your health with our digital tools. Order refills, securely upload new prescriptions, and track your active medications all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/upload">
              <Button size="lg" variant="outline" className="text-black border-transparent hover:bg-white/90 font-bold">
                 Upload Prescription
              </Button>
            </Link>
            <Link to="/tracking">
              <Button size="lg" className="bg-white text-[#32a852] hover:bg-gray-100 font-bold">
                 My Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Featured Products</h3>
          <Link to="/shop" className="text-[#32a852] hover:underline font-medium">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
               <div key={`loading-${i}`} className="animate-pulse flex flex-col h-[300px] bg-white rounded-lg shadow-sm border p-4">
                 <div className="bg-gray-200 h-40 rounded-md mb-4" />
                 <div className="bg-gray-200 h-4 w-2/3 mb-2 rounded" />
                 <div className="bg-gray-200 h-4 w-1/3 rounded" />
                 <div className="mt-auto bg-gray-200 h-10 rounded-md" />
               </div>
             ))
          ) : (
            featuredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="aspect-square relative overflow-hidden mb-4 rounded-md flex items-center justify-center">
                    {/* Placeholder image style matching standard medical/pharmacy shots */}
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center border border-gray-100 p-4">
                       <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                  <h4 className="font-semibold text-gray-800 flex-1 leading-tight mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-lg font-bold text-[#32a852]">${product.price.toFixed(2)}</span>
                    <Button size="sm" onClick={() => addToCart(product)}>Add</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
