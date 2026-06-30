import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{accountNumber: string} | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      
      // Generate an 8-digit account number
      const generatedAccountNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
      const emailForAuth = `${generatedAccountNumber}@example.com`;

      const { data, error: authError } = await supabase.auth.signUp({
        email: emailForAuth,
        password,
        options: {
          data: {
            full_name: name,
            account_number: generatedAccountNumber,
            contact_email: email, // Store actual email in metadata
          }
        }
      });

      if (authError) throw authError;

      // Show success screen with Account Number
      setSuccessData({ accountNumber: generatedAccountNumber });
      
    } catch (err: any) {
      setError(err.message || "Failed to create an account");
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <CardTitle className="text-2xl text-[#32a852]">Registration Successful!</CardTitle>
            <CardDescription className="text-gray-600 text-base mt-2">
              Please save your login details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center space-y-4">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Your Account Number</p>
                <p className="text-3xl font-bold tracking-widest text-gray-900">{successData.accountNumber}</p>
              </div>
              <hr className="border-gray-200" />
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Your Password</p>
                <p className="text-lg font-medium text-gray-900">The password you just entered</p>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-700 p-4 rounded-md text-sm border border-blue-100">
              <strong>Important:</strong> You will need this Account Number to log in to the platform.
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/login")} className="w-full text-lg py-6">
              Proceed to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Join Long-Range Pharmacies for easy prescription management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <Input 
                type="password" 
                required 
                value={passwordConfirm} 
                onChange={(e) => setPasswordConfirm(e.target.value)} 
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </Button>
            <div className="text-sm text-center text-gray-500">
              Already have an account? <Link to="/login" className="text-[#32a852] hover:underline font-medium">Log In</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
