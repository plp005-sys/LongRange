import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { User, Package, Settings, LogOut, ShieldAlert } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    // Mock user orders fetching
    setTimeout(() => {
      setOrders([
        { id: "ORD-84920", date: "2024-05-12", total: 24.50, status: "Delivered", items: 3 },
        { id: "ORD-94112", date: "2024-05-28", total: 12.99, status: "Processing", items: 1 },
      ]);
      setLoadingOrders(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-[#32a852] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                {user?.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0).toUpperCase() : <User className="h-10 w-10" />}
              </div>
              <h2 className="text-xl font-bold">{user?.user_metadata?.full_name || "Patient"}</h2>
              <p className="text-gray-500 text-sm mb-4">{user?.email}</p>
              <Button variant="outline" className="w-full" onClick={() => navigate("/profile/settings")}>
                <Settings className="h-4 w-4 mr-2" /> Manage Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
             <CardContent className="p-2 flex flex-col">
                <Button variant="ghost" className="justify-start px-4 py-3 h-auto" onClick={() => navigate("/upload")}>
                  <Package className="h-5 w-5 mr-3 text-gray-500" /> Upload Prescription
                </Button>
                <div className="border-t border-gray-100 my-1"></div>
                <Button variant="ghost" className="justify-start px-4 py-3 h-auto" onClick={() => navigate("/tracking")}>
                  <Package className="h-5 w-5 mr-3 text-gray-500" /> Track Prescriptions
                </Button>
                <div className="border-t border-gray-100 my-1"></div>
                <Button variant="ghost" className="justify-start px-4 py-3 h-auto" onClick={() => navigate("/admin")}>
                  <ShieldAlert className="h-5 w-5 mr-3 text-purple-500" /> Admin Dashboard (Simulation)
                </Button>
                <div className="border-t border-gray-100 my-1"></div>
                <Button variant="ghost" className="justify-start px-4 py-3 h-auto text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                  <LogOut className="h-5 w-5 mr-3" /> Log Out
                </Button>
             </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingOrders ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={`profile-loading-${i}`} className="animate-pulse flex gap-4 h-20 bg-gray-50 rounded-md border p-4" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>You haven't placed any orders yet.</p>
                  <Button className="mt-4" onClick={() => navigate("/shop")}>Start Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-md p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-gray-300 transition-colors">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-gray-900">{order.id}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            order.status === 'Delivered' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                      </div>
                      <div className="flex items-center gap-4 justify-between sm:justify-end border-t sm:border-0 pt-3 sm:pt-0">
                         <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                         <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Information</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border border-gray-100 bg-gray-50 rounded-md p-4">
                     <h4 className="font-semibold mb-2 text-sm text-gray-500 uppercase tracking-wider">Shipping Address</h4>
                     <p className="text-gray-900">
                       {user?.user_metadata?.full_name || "John Doe"}<br/>
                       123 Main Street<br/>
                       Apt 4B<br/>
                       Anytown, NY 10001
                     </p>
                     <Button variant="link" className="px-0 mt-2 text-[#32a852]">Edit Address</Button>
                  </div>
                  <div className="border border-gray-100 bg-gray-50 rounded-md p-4">
                     <h4 className="font-semibold mb-2 text-sm text-gray-500 uppercase tracking-wider">Payment Method</h4>
                     <div className="flex items-center gap-2 mb-2">
                       <div className="bg-gray-200 rounded px-2 py-1 text-xs font-bold text-gray-700">VISA</div>
                       <span className="text-gray-900">Ending in 4242</span>
                     </div>
                     <p className="text-sm text-gray-500 mb-1">Expires 12/25</p>
                     <Button variant="link" className="px-0 mt-2 text-[#32a852]">Edit Payment</Button>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
