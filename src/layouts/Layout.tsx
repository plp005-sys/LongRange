import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, MapPin, LogIn, X, Plus, Minus, Trash2, CheckCircle, ShoppingBag, Menu, Facebook, Twitter, Instagram, Linkedin, Calendar, ArrowRight, ChevronLeft, ChevronRight, Phone, Clock, MessageCircle } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { AnimatePresence, motion } from "motion/react";
import logoImage from "../assets/images/logo.png";
import blogImgNurse from "../assets/images/pharmacist_african_male_1784323099198.jpg";
import blogImgYellowishApothecary from "../assets/images/yellowish_apothecary_wellness_1784127797244.jpg";
import blogImgPillsYellow from "../assets/images/regenerated_image_1782136435951.jpg";
import blogImgAfricanPatientNursing from "../assets/images/african_patient_nursing_1784368116659.jpg";
import blogImgAlbinoVolunteer from "../assets/images/albino_volunteer_africa_1784368688645.jpg";
import blogImgTriumph from "../assets/images/patient_journey_triumph_1784126033290.jpg";
import { PaymentModal } from "../components/PaymentModal";
import bpCheckupImg from "../assets/images/bp_checkup_1784120018713.jpg";
import wellnessSupplementsBannerImg from "../assets/images/wellness_supplements_banner_1784325319727.jpg";

export default function Layout() {
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartOpen, setCartOpen, cartCount, cartTotal } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappMsg, setWhatsappMsg] = useState("");
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleOpenWhatsapp = () => {
      setWhatsappOpen(true);
      const widget = document.getElementById("whatsapp-widget");
      if (widget) {
        widget.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };
    window.addEventListener("open-whatsapp", handleOpenWhatsapp);
    return () => window.removeEventListener("open-whatsapp", handleOpenWhatsapp);
  }, []);

  const brandsRef = useRef<HTMLDivElement>(null);
  const featuredBrands = [
    { name: "La Rive", style: "font-serif font-bold tracking-wider text-2xl text-emerald-950/40 hover:text-emerald-950/70 transition-colors" },
    { name: "Brentoni", style: "font-sans font-extrabold tracking-tight text-2xl text-emerald-950/40 hover:text-emerald-950/70 transition-colors" },
    { name: "Unilever", style: "font-sans font-bold text-2xl text-emerald-950/40 hover:text-emerald-950/70 transition-colors" },
    { name: "Skin Republic", style: "font-serif font-black text-2xl text-emerald-950/40 hover:text-emerald-950/70 transition-colors" },
    { name: "NIVEA", style: "font-sans font-black tracking-wide text-2xl text-emerald-950/40 hover:text-emerald-950/70 transition-colors" },
    { name: "POND'S", style: "font-serif tracking-widest text-xl font-bold text-emerald-950/40 hover:text-emerald-950/70 transition-colors" },
  ];

  const scrollBrands = (direction: "left" | "right") => {
    if (brandsRef.current) {
      const scrollAmount = 240;
      brandsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const targetQuery = (e.target as HTMLInputElement).value;
      if (targetQuery.trim()) {
        navigate(`/shop?search=${encodeURIComponent(targetQuery.trim())}`);
      }
    }
  };

  const openPaymentModal = () => {
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (id: string) => {
    setPaymentModalOpen(false);
    setOrderId(id);
    setCheckoutSuccess(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-[#15e637] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImage} alt="Long-Range Pharmacies Logo" className="h-12 w-auto object-contain bg-white rounded-xl p-1" />
              <span className="hidden">
                <span className="w-2 h-2 rounded-full bg-[#15e637] shadow-[0_0_8px_#15e637]"></span>
                App Green
              </span>
            </Link>
            
            <div className="flex-1 max-w-2xl hidden md:block relative">
              <Search className="absolute left-4 top-[14px] h-5 w-5 text-gray-400 pointer-events-none" />
              <Input 
                placeholder="Search for products..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className="w-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent pl-11 pr-4 h-12 rounded-full text-base shadow-sm"
              />
            </div>

            <div className="flex items-center gap-4">
               <Link to="/locator" title="Find a Store">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                  <MapPin className="h-6 w-6" />
                </Button>
              </Link>
              
              {user ? (
                <Link to="/profile" title="My Profile">
                  <Button variant="ghost" className="hidden sm:flex text-white hover:bg-white/10 hover:text-white text-sm font-medium">
                    <User className="h-5 w-5 mr-2" />
                    My Account
                  </Button>
                  <Button variant="ghost" size="icon" className="sm:hidden text-white hover:bg-white/10 hover:text-white">
                    <User className="h-6 w-6" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login" title="Log In">
                  <Button variant="ghost" className="hidden sm:flex text-white hover:bg-white/10 hover:text-white text-sm font-medium">
                    <LogIn className="h-5 w-5 mr-2" />
                    Log In
                  </Button>
                  <Button variant="ghost" size="icon" className="sm:hidden text-white hover:bg-white/10 hover:text-white">
                    <LogIn className="h-6 w-6" />
                  </Button>
                </Link>
              )}

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  setCheckoutSuccess(false);
                  setCartOpen(true);
                }}
                className="text-white hover:bg-white/10 hover:text-white relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden relative mt-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input 
                placeholder="Search for products..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className="w-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent pl-9 pr-4 rounded-full h-10 text-sm shadow-sm"
              />
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gradient-to-r from-[#fafa0a]/95 via-[#fafa0a]/90 to-[#fafa0a] backdrop-blur-xl text-gray-950 border-y border-white/45 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.12),_0_4px_20px_rgba(250,250,10,0.2)] relative overflow-hidden">
          {/* Decorative Glass Sparkles matching yellow theme */}
          <div className="absolute top-2 left-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#fafa0a] z-20 pointer-events-none opacity-80" />
          <div className="absolute top-[11px] left-2.5 w-3 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />
          <div className="absolute top-2.5 left-[11px] w-[1px] h-3 bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />

          <div className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#fafa0a] z-20 pointer-events-none opacity-80" />
          <div className="absolute bottom-[11px] right-2.5 w-3 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />
          <div className="absolute bottom-2.5 right-[11px] w-[1px] h-3 bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center relative py-4 text-sm uppercase font-bold w-full">
              <div className="absolute left-0">
                <Link to="/" className="hover:text-gray-700 transition-colors py-1 shrink-0 text-2xl">Home</Link>
              </div>
              <div className="w-full flex justify-center space-x-8">
                <Link to="/shop" className="hover:text-gray-700 transition-colors py-1 shrink-0">Shop</Link>
                <Link to={`/shop?category=${encodeURIComponent('Beauty & Cosmetics')}`} className="hover:text-gray-700 transition-colors py-1 shrink-0">Beauty & Cosmetics</Link>
                <Link to="/shop?category=Personal Care" className="hover:text-gray-700 transition-colors py-1 shrink-0">Personal Care</Link>
                <Link to="/shop?category=Baby Care" className="hover:text-gray-700 transition-colors py-1 shrink-0">Baby Care</Link>
                <Link to="/shop?category=Herbal Products" className="hover:text-gray-700 transition-colors py-1 shrink-0">Herbal Products</Link>
                <Link to={`/shop?category=${encodeURIComponent('Pharmacy & Supplement')}`} onClick={(e) => { if (!user) { e.preventDefault(); navigate("/login"); } }} className="hover:text-gray-700 transition-colors py-1 shrink-0">Pharmacy & Supplement</Link>
              </div>
            </nav>

            {/* Mobile Navigation Header */}
            <div className="lg:hidden flex items-center justify-between py-3">
              <Link to="/" className="text-xl font-bold uppercase">Home</Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 hover:bg-black/5 rounded"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            
            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.nav 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden flex flex-col space-y-2 pb-4 text-sm uppercase font-bold overflow-hidden"
                >
                  <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-700 transition-colors py-2 border-b border-black/5">Shop</Link>
                  <Link to={`/shop?category=${encodeURIComponent('Beauty & Cosmetics')}`} onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-700 transition-colors py-2 border-b border-black/5">Beauty & Cosmetics</Link>
                  <Link to="/shop?category=Personal Care" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-700 transition-colors py-2 border-b border-black/5">Personal Care</Link>
                  <Link to="/shop?category=Baby Care" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-700 transition-colors py-2 border-b border-black/5">Baby Care</Link>
                  <Link to="/shop?category=Herbal Products" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-700 transition-colors py-2 border-b border-black/5">Herbal Products</Link>
                  <Link to={`/shop?category=${encodeURIComponent('Pharmacy & Supplement')}`} onClick={(e) => { if (!user) { e.preventDefault(); navigate("/login"); setMobileMenuOpen(false); } else { setMobileMenuOpen(false); } }} className="hover:text-gray-700 transition-colors py-2">Pharmacy & Supplement</Link>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {isHome && (
        <>


          {/* Premium Organic Supplements & Wellness Section */}
          <section className="bg-transparent pb-14 pt-0">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="bg-gradient-to-r from-[#fafa0a]/95 via-[#fafa0a]/90 to-[#fafa0a] backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 lg:p-14 border border-white/45 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.12),_0_4px_20px_rgba(250,250,10,0.2)] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
                {/* Decorative Glass Sparkles matching yellow theme */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#FFF101] z-20 pointer-events-none opacity-80" />
                <div className="absolute top-[21px] right-2.5 w-4 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />
                <div className="absolute top-2.5 right-[21px] w-[1px] h-4 bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />

                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#FFF101] z-20 pointer-events-none opacity-80" />
                <div className="absolute bottom-[21px] left-2.5 w-4 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />
                <div className="absolute bottom-2.5 left-[21px] w-[1px] h-4 bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />
                
                {/* Content column on the left */}
                <div className="flex-1 space-y-5 md:pr-4">
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-500/90 block">
                    Premium Wellness Boost
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-[2.65rem] font-black text-[#0c2a5c] tracking-tight leading-[1.12]">
                    Elevate Your Vitality & Daily Wellness!
                  </h2>
                  <p className="text-gray-600 text-[14.5px] md:text-[15.5px] leading-relaxed font-normal max-w-lg">
                    Fuel your body with premium organic supplements, dynamic daily multivitamins, and scientifically-crafted immune boosters. Support your everyday energy, clarity, and overall physical excellence.
                  </p>
                  <div className="pt-4">
                    <Link to="/shop?category=Pharmacy%20%26%20Supplement">
                      <Button className="bg-gradient-to-br from-[#15e637]/25 via-[#15e637]/15 to-[#11b32b]/30 backdrop-blur-md border border-[#15e637]/40 text-emerald-950 hover:from-[#15e637]/40 hover:to-[#11b32b]/45 hover:text-emerald-900 font-bold px-7 py-3.5 h-auto text-[15px] rounded-lg shadow-[inset_0_1px_2.5px_rgba(255,255,255,0.65),_0_4px_16px_rgba(21,230,55,0.12)] hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),_0_6px_20px_rgba(21,230,55,0.22)] active:scale-95 transition-all duration-300 flex items-center gap-2">
                        Explore Supplements <ArrowRight className="h-4.5 w-4.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Image column on the right */}
                <div className="w-full md:w-[45%] lg:w-[48%] shrink-0">
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[3/2] lg:aspect-[1.45] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/40">
                    <img 
                      src={wellnessSupplementsBannerImg} 
                      alt="Premium Supplements Promo Banner" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>







          {/* Latest News & Blogs Section */}
          <section className="bg-transparent pb-14 pt-0">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-10 md:mb-14">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#0c2a5c]">Our Latest News & Blogs</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left large post */}
                <div className="lg:col-span-5 bg-transparent rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex flex-col h-full">
                  <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-[45%] overflow-hidden bg-gray-100">
                    <img 
                      src={blogImgYellowishApothecary} 
                      alt="News" 
                      className="w-full h-full object-cover grayscale-[0.2]"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col bg-gradient-to-br from-[#15e637]/30 via-[#15e637]/15 to-[#11b32b]/30 backdrop-blur-xl shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-3 text-sm mb-4">
                      
                      <span className="text-gray-700 flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Aug, 2026</span>
                    </div>
                    <h4 className="text-2xl md:text-[1.75rem] font-bold text-[#0c2a5c] mb-4 leading-tight">
                      In this section, we delve into various aspects of health
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-8">
                      Explore the world of medical specialties through our blog's spotlight feature. From cardiology to pediatrics, we share in-depth articles written by expert physicians.
                    </p>
                    <div className="mt-auto">
                      <Button className="bg-gradient-to-br from-[#15e637]/40 via-[#15e637]/20 to-[#11b32b]/40 backdrop-blur-xl border border-white/50 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1)] hover:from-[#15e637]/50 hover:to-[#11b32b]/50 text-[#0c2a5c] rounded-xl px-6 py-3 flex items-center gap-2 font-bold transition-all active:scale-95">
                        Read More <ArrowRight className="h-4 w-4"/>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right side list */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Small post 1 */}
                  <div className="bg-gradient-to-br from-[#15e637]/30 via-[#15e637]/15 to-[#11b32b]/30 backdrop-blur-xl rounded-3xl p-4 flex flex-col sm:flex-row gap-5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1)] border border-white/50">
                    <div className="w-full sm:w-[160px] h-[160px] rounded-2xl overflow-hidden shrink-0">
                      <img src={blogImgNurse} alt="Blog" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center py-2 pr-2">
                      <div className="flex items-center gap-3 text-xs mb-2.5">
                        
                        <span className="text-gray-400 flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Aug, 2026</span>
                      </div>
                      <h5 className="font-bold text-[#0c2a5c] text-lg leading-tight mb-2.5">
                        Discover a treasure trove of practical tips for enhancing
                      </h5>
                      <p className="text-gray-500 text-[14px] leading-relaxed mb-4">
                        From nutrition advice to exercise routines, we're here to support your journey toward a healthier lifestyle.
                      </p>
                      <div>
                        <Button className="bg-gradient-to-br from-[#eab308]/40 via-[#eab308]/20 to-[#ca8a04]/40 backdrop-blur-xl border border-white/50 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1)] hover:from-[#eab308]/50 hover:to-[#ca8a04]/50 text-[#0c2a5c] rounded-lg px-4 py-1.5 h-auto text-sm flex items-center gap-1.5 font-bold transition-all active:scale-95">
                          Read More <ArrowRight className="h-3.5 w-3.5"/>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Small post 2 */}
                  <div className="bg-gradient-to-br from-[#eab308]/30 via-[#eab308]/15 to-[#ca8a04]/30 backdrop-blur-xl rounded-3xl p-4 flex flex-col sm:flex-row gap-5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1)] border border-white/50">
                    <div className="w-full sm:w-[160px] h-[160px] rounded-2xl overflow-hidden shrink-0">
                      <img src={blogImgAfricanPatientNursing} alt="Blog" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center py-2 pr-2">
                      <div className="flex items-center gap-3 text-xs mb-2.5">
                        
                        <span className="text-gray-400 flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Aug, 2026</span>
                      </div>
                      <h5 className="font-bold text-[#0c2a5c] text-lg leading-tight mb-2.5">
                        Our patients' journeys are filled with courage, resilience, and triumph.
                      </h5>
                      <p className="text-gray-500 text-[14px] leading-relaxed mb-4">
                        In this section, we share inspiring narratives of individuals who have overcome health challenges.
                      </p>
                      <div>
                        <Button className="bg-gradient-to-br from-[#15e637]/40 via-[#15e637]/20 to-[#11b32b]/40 backdrop-blur-xl border border-white/50 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1)] hover:from-[#15e637]/50 hover:to-[#11b32b]/50 text-[#0c2a5c] rounded-lg px-4 py-1.5 h-auto text-sm flex items-center gap-1.5 font-bold transition-all active:scale-95">
                          Read More <ArrowRight className="h-3.5 w-3.5"/>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Small post 3 */}
                  <div className="bg-gradient-to-br from-[#15e637]/30 via-[#15e637]/15 to-[#11b32b]/30 backdrop-blur-xl rounded-3xl p-4 flex flex-col sm:flex-row gap-5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1)] border border-white/50">
                    <div className="w-full sm:w-[160px] h-[160px] rounded-2xl overflow-hidden shrink-0">
                      <img src={blogImgAlbinoVolunteer} alt="Blog" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center py-2 pr-2">
                      <div className="flex items-center gap-3 text-xs mb-2.5">
                        
                        <span className="text-gray-400 flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Aug, 2026</span>
                      </div>
                      <h5 className="font-bold text-[#0c2a5c] text-lg leading-tight mb-2.5">
                        From organizing health fairs to partnering with local organizations
                      </h5>
                      <p className="text-gray-500 text-[14px] leading-relaxed mb-4">
                        Find out how you can participate in community events and contribute to the health.
                      </p>
                      <div>
                        <Button className="bg-gradient-to-br from-[#eab308]/40 via-[#eab308]/20 to-[#ca8a04]/40 backdrop-blur-xl border border-white/50 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1)] hover:from-[#eab308]/50 hover:to-[#ca8a04]/50 text-[#0c2a5c] rounded-lg px-4 py-1.5 h-auto text-sm flex items-center gap-1.5 font-bold transition-all active:scale-95">
                          Read More <ArrowRight className="h-3.5 w-3.5"/>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BP Checkup Section */}
          <section className="bg-transparent pb-14 pt-0">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="bg-gradient-to-r from-[#fafa0a]/95 via-[#fafa0a]/90 to-[#fafa0a] backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 lg:p-14 border border-white/45 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.12),_0_4px_20px_rgba(250,250,10,0.2)] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
                {/* Decorative Glass Sparkles matching yellow theme */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#FFF101] z-20 pointer-events-none opacity-80" />
                <div className="absolute top-[21px] right-2.5 w-4 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />
                <div className="absolute top-2.5 right-[21px] w-[1px] h-4 bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />

                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#FFF101] z-20 pointer-events-none opacity-80" />
                <div className="absolute bottom-[21px] left-2.5 w-4 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />
                <div className="absolute bottom-2.5 left-[21px] w-[1px] h-4 bg-white/80 blur-[0.5px] z-20 pointer-events-none opacity-80" />
                
                {/* Image column on the left */}
                <div className="w-full md:w-[45%] lg:w-[48%] shrink-0">
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[3/2] lg:aspect-[1.45] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/40">
                    <img 
                      src={bpCheckupImg} 
                      alt="BP & Sugar Levels Check Up" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Content column on the right */}
                <div className="flex-1 space-y-5 md:pl-4">
                  <span className="text-sm font-bold uppercase tracking-wider text-[#11b32b] block">
                    VITAL HEALTH CHECKUP
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-[2.65rem] font-black text-[#0c2a5c] tracking-tight leading-[1.12]">
                    BP & Sugar Levels Check Up
                  </h2>
                  <p className="text-gray-600 text-[14.5px] md:text-[15.5px] leading-relaxed font-normal max-w-lg">
                    Monitor your vitals regularly to keep your heart and body thriving. Get high-precision blood pressure screenings and glucose level tests done. Visit us and pay through various mobile money methods like One Money, EcoCash, O'mari...
                  </p>
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <a href="https://wa.me/263772123456?text=Hi%2C%20I%20would%20like%20to%20book%20a%20BP%20%26%20Sugar%20Levels%20Check%20Up" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-gradient-to-br from-[#15e637]/40 via-[#15e637]/20 to-[#11b32b]/40 backdrop-blur-xl border border-white/50 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1)] hover:from-[#15e637]/50 hover:to-[#11b32b]/50 text-[#0c2a5c] rounded-lg px-7 py-3.5 h-auto text-[15px] font-bold transition-all active:scale-95 flex items-center gap-2">
                        Book now <ArrowRight className="h-4.5 w-4.5" />
                      </Button>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </section>

      {/* Featured Brands Section */}
      <section className="bg-gradient-to-br from-[#15e637]/30 via-[#15e637]/15 to-[#11b32b]/30 backdrop-blur-xl border-t border-white/50 shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),_inset_0_-1px_2px_rgba(0,0,0,0.1),_0_10px_30px_rgba(21,230,55,0.1)] relative overflow-hidden py-14">
        {/* Decorative Glass Sparkles matching user reference image but green */}
        <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#15e637] z-20 pointer-events-none" />
        <div className="absolute top-[21px] left-2 w-4 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none" />
        <div className="absolute top-2 left-[21px] w-[1px] h-4 bg-white/80 blur-[0.5px] z-20 pointer-events-none" />

        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#15e637] z-20 pointer-events-none" />
        <div className="absolute bottom-[21px] right-2 w-4 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none" />
        <div className="absolute bottom-2 right-[21px] w-[1px] h-4 bg-white/80 blur-[0.5px] z-20 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-10 text-left">
            <h3 className="text-3xl font-serif font-bold text-[#0c2a5c]">Featured Brands</h3>
            <p className="text-emerald-900/60 text-sm mt-1 font-medium">Pick from our favourite brands</p>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            {/* Left Scroll Button */}
            <button 
              onClick={() => scrollBrands('left')}
              className="p-2.5 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shrink-0 rounded-full bg-gradient-to-br from-[#fafa0a]/45 via-[#fafa0a]/25 to-[#e5d900]/35 backdrop-blur-xl border border-white/60 text-[#7a7200] hover:from-[#fafa0a]/65 hover:to-[#e5d900]/55 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),_inset_0_-1px_1px_rgba(0,0,0,0.05),_0_8px_20px_rgba(250,250,10,0.2)]"
              aria-label="Previous Brand"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Brands Scroll Container */}
            <div 
              ref={brandsRef}
              className="flex-1 flex items-center justify-between overflow-x-auto gap-8 md:gap-12 py-3 px-1 scroll-smooth select-none [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredBrands.map((brand, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 min-w-[130px] flex items-center justify-center text-center shrink-0 transition-opacity hover:opacity-80"
                >
                  <span className={brand.style}>{brand.name}</span>
                </div>
              ))}
            </div>
            
            {/* Right Scroll Button */}
            <button 
              onClick={() => scrollBrands('right')}
              className="p-2.5 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shrink-0 rounded-full bg-gradient-to-br from-[#fafa0a]/45 via-[#fafa0a]/25 to-[#e5d900]/35 backdrop-blur-xl border border-white/60 text-[#7a7200] hover:from-[#fafa0a]/65 hover:to-[#e5d900]/55 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),_inset_0_-1px_1px_rgba(0,0,0,0.05),_0_8px_20px_rgba(250,250,10,0.2)]"
              aria-label="Next Brand"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>


        </>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#15e637]/75 via-[#11b32b]/65 to-[#0e9924]/80 backdrop-blur-xl border-t border-white/35 shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),_0_-10px_30px_rgba(21,230,55,0.15)] relative overflow-hidden text-white py-12 mt-12">
        {/* Decorative Glass Sparkles matching user reference image but green */}
        <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#15e637] z-20 pointer-events-none" />
        <div className="absolute top-[29px] left-4 w-4 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none" />
        <div className="absolute top-4 left-[29px] w-[1px] h-4 bg-white/80 blur-[0.5px] z-20 pointer-events-none" />

        <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_#fff,_0_0_16px_8px_#15e637] z-20 pointer-events-none" />
        <div className="absolute bottom-[29px] right-4 w-4 h-[1px] bg-white/80 blur-[0.5px] z-20 pointer-events-none" />
        <div className="absolute bottom-4 right-[29px] w-[1px] h-4 bg-white/80 blur-[0.5px] z-20 pointer-events-none" />

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div>
            <div className="flex flex-col mb-4">
              <img src={logoImage} alt="Long-Range Pharmacies Logo" className="h-12 w-auto object-contain bg-white rounded-xl p-1 mb-3 ml-6 self-start" />
              <div className="text-xl font-serif font-bold tracking-tight flex items-baseline gap-1">
                <span className="text-white">Long Range</span>
                <span className="text-[#FFF101]">Long Life</span>
              </div>
              {/* Hidden theme indicator */}
            </div>
            
            <div className="mt-8 mb-6">
              <h3 className="text-xl font-bold text-white mb-5">Get in Touch</h3>
              <div className="space-y-4 text-[15px] text-white">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#FFF101] shrink-0" />
                  <span>+263 242 750 818</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#FFF101] shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp +263 77 344 0533</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#FFF101] shrink-0 mt-0.5" />
                  <span>Shop 3 Kelvin Corner, Graniteside, Harare</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#FFF101] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span>Monday – Sunday</span>
                    <span className="text-[#a1e6b1] text-sm mt-0.5">0730hrs-1800hrs</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-3 bg-[#FFF101] hover:bg-opacity-90 text-gray-900 rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center shadow-md"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-3 bg-[#FFF101] hover:bg-opacity-90 text-gray-900 rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center shadow-md"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-3 bg-[#FFF101] hover:bg-opacity-90 text-gray-900 rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center shadow-md"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-3 bg-[#FFF101] hover:bg-opacity-90 text-gray-900 rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center shadow-md"
                title="X"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop Online</Link></li>
              <li><Link to="/upload" className="hover:text-white transition-colors">Upload Prescription</Link></li>
              <li><Link to="/tracking" className="hover:text-white transition-colors">My Medications</Link></li>
              <li><Link to="/locator" className="hover:text-white transition-colors">Find a Store</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li><button onClick={(e) => { e.preventDefault(); setContactModalOpen(true); }} className="hover:text-white transition-colors">About & Contact Us</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-green-600 text-center text-sm text-green-100">
          © {new Date().getFullYear()} Long-Range Pharmacies. All rights reserved.
        </div>
      </footer>

      {/* Sliding Shopping Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col pointer-events-auto"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-[#15e637]" />
                  <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                  <span className="bg-green-100 text-[#15e637] text-xs font-semibold px-2 py-0.5 rounded-full">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)} className="text-gray-500 hover:bg-gray-100 rounded-full h-8 w-8">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {checkoutSuccess ? (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center text-[#FFF101] mb-4"
                  >
                    <CheckCircle className="h-10 w-10" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                  <p className="text-sm text-gray-500 mb-4 h-auto">
                    Thank you for your order. We are preparing your medicine and wellness products for quick fulfillment.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono text-xs text-gray-600 mb-6">
                    ORDER ID: <span className="font-bold text-gray-900">{orderId}</span>
                  </div>
                  <Button onClick={() => { setCheckoutSuccess(false); setCartOpen(false); }} className="w-full bg-[#FFF101] hover:bg-[#E6D900] text-gray-900">
                    Continue Shopping
                  </Button>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-xs h-auto">
                    Explore our wide range of cosmetics, personal care items, first aid kits, baby care, and fitness essentials.
                  </p>
                  <Button onClick={() => { setCartOpen(false); navigate("/shop"); }} className="bg-[#FFF101] hover:bg-[#E6D900] text-gray-900">
                    Go to Shop
                  </Button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex gap-4 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <div className="h-20 w-20 shrink-0 bg-white rounded-md border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
                          <img src={item.product.image} alt={item.product.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <h4 className="font-medium text-gray-900 line-clamp-1 text-sm">{item.product.name}</h4>
                          <p className="text-xs text-gray-500 mb-2">{item.product.category}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="font-bold text-sm text-[#15e637]">${(item.product.price * item.quantity).toFixed(2)}</span>
                            <div className="flex items-center border border-gray-200 rounded bg-white">
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 text-xs font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50/50 h-8 w-8 self-start"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Summary Footer */}
                  <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium pb-2">Free</span>
                      </div>
                      <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-200/60 pt-2">
                        <span>Estimated Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button onClick={openPaymentModal} className="w-full bg-[#FFF101] hover:bg-[#E6D900] text-gray-900 py-6 text-base font-semibold shadow-md cursor-pointer">
                      Checkout Order
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* About & Contact Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">About & Contact Us</h2>
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-[#15e637]">About Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Long-Range Pharmacies is your trusted local pharmacy providing expert advice, comprehensive health services, and quality products for the whole family. We have been serving the community for over 10 years, ensuring that your health and well-being is our top priority.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#15e637] mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Address</p>
                          <p className="text-gray-600 text-sm">Shop 3B Kelvin Corner, Graniteside, Harare, Zimbabwe</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-5 w-5 flex items-center justify-center text-[#15e637] mt-0.5 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Phone</p>
                          <p className="text-gray-600 text-sm">+263 24 2123456</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-5 w-5 flex items-center justify-center text-[#15e637] mt-0.5 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Email</p>
                          <p className="text-gray-600 text-sm">info@longrangepharmacies.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Send a Message</h3>
                    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setContactModalOpen(false); }}>
                      <Input placeholder="Your Name" className="bg-gray-50 border-gray-200" required />
                      <Input type="email" placeholder="Email Address" className="bg-gray-50 border-gray-200" required />
                      <textarea placeholder="How can we help you?" className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 min-h-[100px]" required></textarea>
                      <Button type="submit" className="w-full bg-[#15e637] hover:bg-green-600 text-white">Send Message</Button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PaymentModal 
        open={paymentModalOpen} 
        onOpenChange={setPaymentModalOpen} 
        amount={cartTotal} 
        onSuccess={handlePaymentSuccess} 
      />

      {/* WhatsApp Floating Chat Widget */}
      <div id="whatsapp-widget" className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
        {/* Notification bubble if unopened */}
        <AnimatePresence>
          {!whatsappOpen && !bubbleDismissed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 45, transition: { duration: 0.25, ease: "easeInOut" } }}
              onClick={() => setBubbleDismissed(true)}
              className="bg-white text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 mb-3 max-w-xs text-right mr-1 flex items-center gap-2 cursor-pointer hover:bg-gray-50 active:scale-95 transition-all"
              style={{ transformOrigin: "bottom right" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Need help? Chat with us on WhatsApp!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chatbot Window */}
        <AnimatePresence>
          {whatsappOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-80 md:w-96 overflow-hidden mb-4 flex flex-col text-left"
            >
              {/* Chat Header */}
              <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={blogImgNurse} 
                      alt="Pharmacist Assistant" 
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-[#075e54] rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Long Range Assistant</h4>
                    <p className="text-[11px] text-green-100 font-medium">Pharmacist • Online</p>
                  </div>
                </div>
                <button 
                  onClick={() => setWhatsappOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="p-4 bg-[#ece5dd] min-h-[160px] max-h-[220px] overflow-y-auto space-y-3 flex flex-col justify-end">
                {/* Incoming Messages */}
                <div className="bg-white text-gray-800 text-sm p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] self-start relative">
                  <p className="leading-relaxed font-medium">
                    Hello there! Welcome to Long-Range Pharmacies... Uploading a prescription or need advice on medications?
                  </p>
                  <span className="text-[10px] text-gray-400 block mt-1 text-right">Just now</span>
                </div>

                <div className="bg-white text-gray-800 text-sm p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] self-start relative">
                  <p className="leading-relaxed">
                    Type your message below to send it directly to our dedicated Pharmacist.
                  </p>
                  <span className="text-[10px] text-gray-400 block mt-1 text-right">Just now</span>
                </div>
              </div>

              {/* Chat Input / Action Area */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (whatsappMsg.trim()) {
                    const encodedMsg = encodeURIComponent(whatsappMsg.trim());
                    window.open(`https://wa.me/263772123456?text=${encodedMsg}`, '_blank');
                    setWhatsappMsg("");
                    setWhatsappOpen(false);
                  }
                }}
                className="p-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2"
              >
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  value={whatsappMsg}
                  onChange={(e) => setWhatsappMsg(e.target.value)}
                  className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#075e54] focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="p-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 transition-all rounded-full text-white shadow-md flex items-center justify-center cursor-pointer shrink-0"
                  title="Send on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <button
          onClick={() => setWhatsappOpen(!whatsappOpen)}
          className="p-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 transition-all text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative group"
          aria-label="Chat on WhatsApp"
        >
          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:opacity-40"></span>
          
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current relative z-10">
            <path d="M12.03 2.1c-5.5 0-10 4.5-10 10 0 1.8.5 3.5 1.4 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10 0-5.5-4.5-10-10-10zm5.9 14.1c-.2.7-1.2 1.3-1.8 1.4-.6.1-1.4.2-4.3-.9-3.5-1.4-5.8-5-6-5.2-.2-.2-1.4-1.9-1.4-3.7s.9-2.7 1.2-3c.3-.3.7-.4.9-.4h.6c.2 0 .5 0 .8.6.3.7 1.1 2.6 1.2 2.8.1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.2-.4.4-.6.6-.2.2-.4.4-.2.7.2.3.9 1.5 2 2.5 1.4 1.2 2.5 1.6 2.9 1.8.3.1.5.1.7-.1.2-.3.9-1 1.1-1.4.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1.1.3.1.5.3.6.4.1.2.1.9-.1 1.6z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
