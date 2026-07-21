import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { X, CreditCard, Banknote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onSuccess: (orderId: string) => void;
}

const paymentMethods = [
  { 
    id: "ecocash", 
    label: (
      <span className="font-bold">
        <span className="text-[#004b87]">Eco</span><span className="text-[#e31837]">Cash</span>
      </span>
    ),
    desc: "Mobile money" 
  },
  { 
    id: "innbucks", 
    label: (
      <span className="font-bold flex items-center gap-1.5 text-[#003b71]">
        <div className="grid grid-cols-2 gap-[2px] w-4 h-4">
          <div className="bg-[#f0851d] rounded-full"></div>
          <div className="bg-[#9c298c] rounded-full"></div>
          <div className="bg-[#00a651] rounded-full"></div>
          <div className="bg-[#004ebc] rounded-full"></div>
        </div>
        InnBucks
      </span>
    ),
    desc: "Mobile wallet" 
  },
  { 
    id: "zimswitch", 
    label: (
      <span className="font-bold">
        <span className="text-[#008c44]">Zim</span><span className="text-[#003b71]">Switch</span>
      </span>
    ),
    desc: "Bank card" 
  },
  { 
    id: "visa", 
    label: (
      <span className="font-bold flex items-center gap-2">
        <span className="italic text-[#1434cb]">VISA</span>
        <div className="flex -space-x-2">
          <div className="w-4 h-4 rounded-full bg-[#eb001b] mix-blend-multiply"></div>
          <div className="w-4 h-4 rounded-full bg-[#f79e1b] mix-blend-multiply"></div>
        </div>
      </span>
    ),
    desc: "Credit or debit" 
  },
  { 
    id: "cash", 
    label: (
      <span className="font-bold flex items-center gap-1.5 text-[#008c44]">
        <Banknote className="w-5 h-5 text-gray-500" />
        Cash
      </span>
    ),
    desc: "Pay on delivery or collection" 
  },
];

export function PaymentModal({ open, onOpenChange, amount, onSuccess }: PaymentModalProps) {
  const [method, setMethod] = useState("ecocash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call for static GitHub Pages deployment
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const orderId = "LR-" + Math.floor(100000 + Math.random() * 900000);
      onSuccess(orderId);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black z-[60] pointer-events-auto"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: "10%" }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: "10%" }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-2xl z-[70] p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-green-50 rounded-lg border border-green-100">
              <CreditCard className="w-6 h-6 text-[#00a859]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#006039]">Payment method</h2>
              <p className="text-gray-500 text-sm mt-0.5">Pay securely now with Paynow, or pay cash on delivery.</p>
            </div>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600 mt-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-3">
            {paymentMethods.map((pm) => (
              <label
                key={pm.id}
                className={`relative flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                  method === pm.id 
                    ? "border-[#00a859] bg-white ring-1 ring-[#00a859]" 
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    method === pm.id ? "border-[#00a859]" : "border-gray-300"
                  }`}>
                    {method === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-[#00a859]" />}
                  </div>
                  <div className="flex items-center text-lg">
                    {pm.label}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {pm.desc}
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={pm.id}
                  checked={method === pm.id}
                  onChange={(e) => setMethod(e.target.value)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label htmlFor="amount" className="text-sm font-bold text-gray-700">Amount to Pay</label>
            <Input
              id="amount"
              type="text"
              readOnly
              value={`$${amount.toFixed(2)}`}
              className="bg-gray-50 font-semibold text-lg"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <Button type="submit" className="w-full h-12 bg-[#00a859] hover:bg-[#008c4a] text-white text-lg font-medium rounded-xl" disabled={loading}>
            {loading ? "Processing..." : "Complete Order"}
          </Button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
