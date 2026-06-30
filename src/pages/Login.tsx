import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [accountNo, setAccountNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      // Since it says "Account No.", we map it to email as accountNo + "@example.com" if no @ is present
      const emailForAuth = accountNo.includes('@') ? accountNo : `${accountNo}@example.com`;
      
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: emailForAuth,
        password: password,
      });

      if (authError) throw authError;

      navigate("/profile");
    } catch (err: any) {
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-[650px] bg-white shadow-xl border border-gray-200 rounded-lg p-6 sm:p-10 font-sans">
        <h1 className="text-[28px] text-[#2c3e50] mb-2 font-normal text-center">Login</h1>
        <p className="text-[15px] text-[#333] mb-5 text-center">Enter your Account No. and Password to login</p>
        
        <hr className="border-t border-gray-200 mb-6" />

        <div className="bg-[#e9f5f7] border border-[#d2ebef] text-[#0f6073] px-5 py-4 rounded-sm mb-8 text-[14.5px] leading-relaxed">
          If this is the first time you are logging into the web cart, enter your <strong className="font-semibold text-[#035467]">Account No. for both the login and password.</strong> An email will be sent to you with further instructions.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>}
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="sm:w-[130px] text-[15px] text-[#333] shrink-0">Account No.</label>
            <input 
              type="text" 
              placeholder="Account No."
              required 
              value={accountNo} 
              onChange={(e) => setAccountNo(e.target.value)} 
              className="flex-1 border border-[#ccc] rounded-[3px] px-3 py-2 text-[15px] placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="sm:w-[130px] text-[15px] text-[#333] shrink-0">Password</label>
            <input 
              type="password" 
              placeholder="Password"
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="flex-1 border border-[#ccc] rounded-[3px] px-3 py-2 text-[15px] placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4">
            <div className="flex items-center gap-2">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#FFF101] hover:bg-[#FFF101]/90 text-gray-900 px-5 py-[9px] rounded-[3px] text-[15px] font-medium transition-colors"
              >
                {loading ? "..." : "Login"}
              </button>
              <button 
                type="button"
                className="bg-[#dce1e5] hover:bg-[#caced1] text-[#333] px-5 py-[9px] rounded-[3px] text-[15px] transition-colors"
              >
                Forgot your password?
              </button>
            </div>
            <Link to="/register" className="text-[#32a852] hover:text-[#288741] hover:underline text-[15px] font-medium">
              I'm a new customer
            </Link>
          </div>
        </form>

        <div className="mt-14 flex flex-col items-center text-center text-[15px] text-[#333] space-y-1">
          <p>Contact Information:</p>
          <p>Email: <a href="mailto:info@longrangepharmacies.co.zw" className="text-[#32a852] hover:text-[#288741] hover:underline font-medium">info@longrangepharmacies.co.zw</a></p>
          
          <div className="pt-6">
            <Link to="/" className="text-[#32a852] hover:text-[#288741] hover:underline font-medium">
              Navigate to main page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
