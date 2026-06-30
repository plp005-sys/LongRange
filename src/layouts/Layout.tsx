import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, MapPin, LogIn, X, Plus, Minus, Trash2, CheckCircle, ShoppingBag } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { AnimatePresence, motion } from "motion/react";
import logoImage from "../assets/images/logo.png";
import { PaymentModal } from "../components/PaymentModal";

export default function Layout() {
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartOpen, setCartOpen, cartCount, cartTotal } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const navigate = useNavigate();

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
      <header className="bg-[#32a852] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImage} alt="Long-Range Pharmacies Logo" className="h-12 w-auto object-contain bg-white rounded-xl p-1" />
            </Link>
            
            <div className="flex-1 max-w-2xl hidden md:block relative">
              <Input 
                placeholder="Type & Hit Enter..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className="w-full bg-transparent border-0 border-b border-white/50 rounded-none text-white placeholder:text-white/70 focus:border-white focus:ring-0 px-0 h-12 text-lg"
              />
              <Search className="absolute right-2 top-3 h-6 w-6 text-white/70" />
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
          <div className="md:hidden relative">
            <Input 
                placeholder="Type & Hit Enter..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className="w-full bg-white/10 text-white placeholder:text-white/70 border-white/20"
              />
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-[#FFF101] text-gray-900 relative shadow-md">
          <div className="container mx-auto px-2 md:px-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <nav className="flex items-center md:justify-center space-x-4 md:space-x-8 py-3 md:py-4 text-xs md:text-sm uppercase font-bold whitespace-nowrap px-2">
              <Link to={`/shop?category=${encodeURIComponent('Beauty & Cosmetics')}`} className="hover:text-gray-700 transition-colors py-1 shrink-0">Beauty & Cosmetics</Link>
              <Link to="/shop?category=Personal Care" className="hover:text-gray-700 transition-colors py-1 shrink-0">Personal Care</Link>
              <Link to="/shop" className="hover:text-gray-700 transition-colors py-1 shrink-0 text-xl md:text-2xl mx-4">Shop</Link>
              <Link to="/shop?category=Baby Care" className="hover:text-gray-700 transition-colors py-1 shrink-0">Baby Care</Link>
              <Link to={`/shop?category=${encodeURIComponent('Pharmacy & Supplement')}`} onClick={(e) => { if (!user) { e.preventDefault(); navigate("/login"); } }} className="hover:text-gray-700 transition-colors py-1 shrink-0">Pharmacy & Supplement</Link>
            </nav>
          </div>
          {/* subtle gradient fades to indicate scroll on mobile */}
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#FFF101] to-transparent pointer-events-none md:hidden"></div>
          <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-[#FFF101] to-transparent pointer-events-none md:hidden"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#32a852] text-white py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <ShoppingBag className="h-6 w-6 text-[#32a852]" />
                  <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                  <span className="bg-green-100 text-[#32a852] text-xs font-semibold px-2 py-0.5 rounded-full">
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
                            <span className="font-bold text-sm text-[#32a852]">${(item.product.price * item.quantity).toFixed(2)}</span>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-[#32a852]">About Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Long-Range Pharmacies is your trusted local pharmacy providing expert advice, comprehensive health services, and quality products for the whole family. We have been serving the community for over 10 years, ensuring that your health and well-being is our top priority.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#32a852] mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Address</p>
                          <p className="text-gray-600 text-sm">Shop 3B Kelvin Corner, Graniteside, Harare, Zimbabwe</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-5 w-5 flex items-center justify-center text-[#32a852] mt-0.5 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Phone</p>
                          <p className="text-gray-600 text-sm">+263 24 2123456</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-5 w-5 flex items-center justify-center text-[#32a852] mt-0.5 shrink-0">
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
                      <Button type="submit" className="w-full bg-[#32a852] hover:bg-green-600 text-white">Send Message</Button>
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
    </div>
  );
}
