import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { ChevronLeft, ChevronRight, Scan, Percent, MapPin, ArrowRight, Pill, Package, Droplet, Sparkles, Baby, Wind, Scissors, HeartPulse } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import babyImg from "../assets/images/african_baby_banner_1782732961309.jpg";
import firstAidImg from "../assets/images/first_aid_kit_1784115713506.jpg";
import skinRepublicImg from "../assets/images/skin_republic_banner_1782733312396.jpg";
import laRiveImg from "../assets/images/la_rive_perfume_banner_1782734576816.jpg";
import bpCheckupImg from "../assets/images/bp_checkup_1784120018713.jpg";
import africanWomanPrescriptionImg from "../assets/images/african_woman_prescription_whatsapp_1784320382223.jpg";
import appFeaturesMockupImg from "../assets/images/whatsapp_prescription_promo_1784317615673.jpg";
import { products } from "../data";

export default function Home() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { name: "Personal Care", image: firstAidImg, title: "SELF HEALTH CARE", subtitle: "FIRST AID KIT" },
    { name: "Beauty Bar", image: laRiveImg, title: "LA RIVE", subtitle: "PERFUMES" },
    { name: "Beauty Bar", image: skinRepublicImg, title: "GLASS SKIN", subtitle: "UNWRAPPED" },
    { name: "Baby Care", image: babyImg, title: "GENTLE TOUCH", subtitle: "FOR YOUR LITTLE ONE" },
  ];

  const categoryCards = [
    { name: "Beauty Bar", subtitle: "Cosmetics & Makeup", icon: Sparkles, iconBg: "bg-pink-100 text-pink-600", bg: "bg-pink-50/70", link: "Beauty Bar" },
    { name: "Baby Bar", subtitle: "Care for little ones", icon: Baby, iconBg: "bg-blue-100 text-blue-600", bg: "bg-blue-50/70", link: "Baby Care" },
    { name: "Fragrances", subtitle: "Scents & Perfumes", icon: Wind, iconBg: "bg-purple-100 text-purple-600", bg: "bg-purple-50/70", link: "Beauty & Cosmetics" },
    { name: "Hair Care", subtitle: "Shampoos & styling", icon: Scissors, iconBg: "bg-yellow-100 text-yellow-600", bg: "bg-yellow-50/70", link: "Personal Care" },
    { name: "Health Bar", subtitle: "Vitamins & Supplements", icon: HeartPulse, iconBg: "bg-red-100 text-red-600", bg: "bg-red-50/70", link: "Pharmacy & Supplement" },
    { name: "Personal Care", subtitle: "Hygiene & Body", icon: Droplet, iconBg: "bg-cyan-100 text-cyan-600", bg: "bg-cyan-50/70", link: "Personal Care" },
    { name: "Skin Care", subtitle: "Lotions & Serums", icon: Sparkles, iconBg: "bg-teal-100 text-teal-600", bg: "bg-teal-50/70", link: "Beauty & Cosmetics" }
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
    <div className="w-full bg-[#00a859]/5 pb-12">
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
                        <h1 className="text-2xl md:text-4xl font-black text-[#15e637] tracking-widest mb-2 md:mb-3">
                          {cat.title}
                        </h1>
                        <h2 className="text-lg md:text-2xl font-light text-[#15e637] tracking-[0.2em] mb-4 md:mb-5 uppercase">
                          {cat.subtitle}
                        </h2>
                        <div>
                            <Link to={`/shop?category=${cat.name}`}>
                              <Button variant="secondary" className="bg-gradient-to-br from-[#fafa0a]/90 via-[#fafa0a]/75 to-[#e5d900]/80 backdrop-blur-md border border-white/65 text-gray-950 hover:from-[#fafa0a] hover:to-[#e5d900] rounded-full text-sm md:text-base px-6 py-2.5 h-auto font-bold uppercase tracking-wide shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.85),_0_8px_20px_rgba(250,250,10,0.25)] relative overflow-hidden transition-all duration-300 active:scale-95">
                                Shop {cat.name}
                              </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        
        {/* Carousel controls */}
        <button 
          onClick={prevSlide} 
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 rounded-full p-1.5 md:p-2.5 transition-all duration-300 hover:scale-110 active:scale-95 bg-gradient-to-br from-[#fafa0a]/45 via-[#fafa0a]/25 to-[#e5d900]/35 backdrop-blur-xl border border-white/60 text-[#7a7200] hover:from-[#fafa0a]/65 hover:to-[#e5d900]/55 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),_inset_0_-1px_1px_rgba(0,0,0,0.05),_0_8px_20px_rgba(250,250,10,0.2)]"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 rounded-full p-1.5 md:p-2.5 transition-all duration-300 hover:scale-110 active:scale-95 bg-gradient-to-br from-[#fafa0a]/45 via-[#fafa0a]/25 to-[#e5d900]/35 backdrop-blur-xl border border-white/60 text-[#7a7200] hover:from-[#fafa0a]/65 hover:to-[#e5d900]/55 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),_inset_0_-1px_1px_rgba(0,0,0,0.05),_0_8px_20px_rgba(250,250,10,0.2)]"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {categories.map((_, index) => (
              <button 
                key={`dot-${index}`} 
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-[#15e637]' : 'bg-gray-400/50 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
          ))}
        </div>
      </section>

      {/* Services Promo */}
      <section className="bg-[#FFF101]/80 backdrop-blur-lg border-y border-white/40 text-gray-950 py-16 shadow-[0_8px_32px_0_rgba(50,168,82,0.08)] relative overflow-hidden">
        {/* Decorative glass elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#15e637]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-950">More Than Just a Pharmacy</h2>
          <p className="text-lg mb-8 text-gray-800">
            Easily manage your health with our digital tools. Order refills, securely upload new prescriptions, and track your active medications all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.dispatchEvent(new CustomEvent("open-whatsapp"))}
              className="bg-gradient-to-br from-[#15e637]/30 via-[#15e637]/15 to-[#11b32b]/30 backdrop-blur-xl border border-white/50 text-emerald-950 hover:from-[#15e637]/40 hover:to-[#11b32b]/40 font-bold shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1),_0_8px_20px_rgba(21,230,55,0.15)] relative overflow-hidden transition-all duration-300"
            >
               Upload Prescription
            </Button>
            <Link to="/tracking">
              <Button size="lg" variant="outline" className="bg-gradient-to-br from-[#15e637]/30 via-[#15e637]/15 to-[#11b32b]/30 backdrop-blur-xl border border-white/50 text-emerald-950 hover:from-[#15e637]/40 hover:to-[#11b32b]/40 font-bold shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1),_0_8px_20px_rgba(21,230,55,0.15)] relative overflow-hidden transition-all duration-300">
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
          <Link to="/shop" className="text-[#15e637] hover:underline font-medium">View All</Link>
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
                    <span className="text-lg font-bold text-[#15e637]">${product.price.toFixed(2)}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-gradient-to-br from-[#15e637]/20 via-[#15e637]/10 to-[#11b32b]/20 backdrop-blur-md border border-[#15e637]/35 text-emerald-800 hover:from-[#15e637]/30 hover:to-[#11b32b]/30 hover:text-emerald-900 font-semibold shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),_0_4px_12px_rgba(21,230,55,0.1)] active:scale-95 transition-all duration-300"
                      onClick={() => addToCart(product)}
                    >
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categoryCards.map((cat, index) => (
            <Link key={index} to={`/shop?category=${cat.link}`} className="block h-full">
              <Card className={`h-full border-none shadow-sm hover:shadow-md transition-all duration-300 ${cat.bg} rounded-2xl overflow-hidden`}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.iconBg}`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-gray-900 text-lg leading-tight mb-2">
                    {cat.name}
                  </h4>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="container mx-auto px-4 pb-16">
        <div 
          className="bg-gradient-to-b from-[#46fd1a] via-[#32e50d] to-[#1fc204] border border-[#52ff28]/45 rounded-[2.5rem] overflow-hidden text-white relative shadow-[inset_0_4px_6px_rgba(255,255,255,0.55),_inset_0_1px_2px_rgba(255,255,255,0.8),_inset_0_-3px_6px_rgba(0,0,0,0.15),_0_20px_50px_rgba(50,230,20,0.25)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16"
        >
          {/* Left Column: Image with Overlapping Delivery Badge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mb-8 lg:mb-0">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-green-200/20">
              <img 
                src={africanWomanPrescriptionImg} 
                alt="African lady holding a prescription paper and a phone" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Title and Features */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 lg:pl-4">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
                Send your Prescription order Instantly via WhatsApp
              </h2>
              <p className="text-white/80 text-base md:text-lg max-w-xl font-medium leading-relaxed">
                Send us your prescription on WhatsApp or upload it directly. We handle the validation, billing, and deliver it straight to your door.
              </p>
            </div>

            {/* Features & Mockup Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
              {/* Feature List */}
              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white/10 border border-white/15 rounded-2xl shrink-0 flex items-center justify-center text-white shadow-inner">
                    <Scan className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">WhatsApp & Chat Upload</h4>
                    <p className="text-white/70 text-sm mt-0.5">Simply snap a clear picture of your paper prescription and send it to our official business chat.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white/10 border border-white/15 rounded-2xl shrink-0 flex items-center justify-center text-white shadow-inner">
                    <Percent className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Exclusive Offers</h4>
                    <p className="text-white/70 text-sm mt-0.5">Member-only deals and early access to sales.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white/10 border border-white/15 rounded-2xl shrink-0 flex items-center justify-center text-white shadow-inner">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Live Tracking</h4>
                    <p className="text-white/70 text-sm mt-0.5">Real-time tracking from our pharmacy to your door.</p>
                  </div>
                </div>
              </div>

              {/* Feature Image Mockup */}
              <div className="relative aspect-[3/4] max-w-[260px] mx-auto md:mr-0 md:ml-auto w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-green-200/20 transform hover:scale-[1.03] transition-all duration-300">
                <img 
                  src={appFeaturesMockupImg} 
                  alt="App Features Mockup" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Button */}
            <div className="pt-2">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent("open-whatsapp"))}
                className="inline-flex items-center gap-3 bg-gradient-to-br from-[#fafa0a]/90 via-[#fafa0a]/75 to-[#e5d900]/80 backdrop-blur-md border border-white/65 text-gray-950 font-extrabold text-sm md:text-base px-8 py-4 rounded-full hover:from-[#fafa0a] hover:to-[#e5d900] active:scale-95 transition-all duration-300 tracking-wider uppercase cursor-pointer shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.85),_0_8px_20px_rgba(250,250,10,0.25)] relative overflow-hidden"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
