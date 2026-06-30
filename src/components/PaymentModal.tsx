import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onSuccess: (orderId: string) => void;
}

const paymentMethods = [
  { id: "ecocash", name: "EcoCash", type: "mobile" },
  { id: "visa", name: "VISA", type: "card" },
  { id: "mastercard", name: "Mastercard", type: "card" },
  { id: "innbucks", name: "InnBucks", type: "mobile" },
  { id: "onemoney", name: "OneMoney", type: "mobile" },
  { id: "omari", name: "O'mari", type: "mobile" },
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
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
            <p className="text-gray-500 text-sm mt-1">Use this form to complete your checkout.</p>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handlePayment} className="space-y-6 pt-4">
          <div>
            <label className="text-base font-bold text-gray-900 mb-4 block">Complete Payment</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {paymentMethods.map((pm) => (
                <label
                  key={pm.id}
                  className={`relative flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                    method === pm.id ? "border-[#FFF101] bg-yellow-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={pm.id}
                    checked={method === pm.id}
                    onChange={(e) => setMethod(e.target.value)}
                    className="sr-only"
                  />
                  <span className={`text-sm font-bold ${method === pm.id ? "text-[#E6D900]" : "text-gray-700"}`}>
                    {pm.name}
                  </span>
                  <div className={`absolute bottom-2 right-2 h-4 w-4 rounded-full border flex items-center justify-center ${
                    method === pm.id ? "border-[#FFF101]" : "border-gray-300"
                  }`}>
                    {method === pm.id && <div className="h-2 w-2 rounded-full bg-[#FFF101]" />}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-bold text-gray-700">Amount</label>
            <Input
              id="amount"
              type="text"
              readOnly
              value={`$${amount.toFixed(2)}`}
              className="bg-gray-50 font-semibold"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <Button type="submit" className="w-full h-12 bg-[#FFF101] hover:bg-[#E6D900] text-gray-900 text-lg font-medium rounded-md" disabled={loading}>
            {loading ? "Processing..." : "Make Payment"}
          </Button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
