import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { 
  Users, 
  Package, 
  Settings, 
  Activity,
  FileText,
  AlertCircle,
  Database
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [inventory, setInventory] = useState<any[]>([]);
  const [inventoryLoading, setInventoryLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "inventory") {
      setInventoryLoading(true);
      fetch("/api/inventory")
        .then(res => res.json())
        .then(data => {
          setInventory(data);
          setInventoryLoading(false);
        })
        .catch(err => {
          console.error("Failed to load inventory", err);
          setInventoryLoading(false);
        });
    }
  }, [activeTab]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage users, prescriptions, and system settings.</p>
        </div>
        <Button variant="outline">Download Reports</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900">1,248</h3>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Prescriptions</p>
              <h3 className="text-2xl font-bold text-gray-900">384</h3>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <FileText className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Pending Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">42</h3>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
              <Package className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">System Status</p>
              <h3 className="text-2xl font-bold text-green-600">Healthy</h3>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
              <Activity className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">
        <div className="flex border-b border-gray-200 mb-6 space-x-4">
          <button 
            className={`pb-2 px-2 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`pb-2 px-2 text-sm font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </button>
          <button 
            className={`pb-2 px-2 text-sm font-medium ${activeTab === 'prescriptions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            Prescriptions & Orders
          </button>
          <button 
            className={`pb-2 px-2 text-sm font-medium ${activeTab === 'inventory' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
          <button 
            className={`pb-2 px-2 text-sm font-medium ${activeTab === 'settings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={`admin-overview-${i}`} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 mr-4"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New prescription uploaded by John Doe</p>
                      <p className="text-xs text-gray-500">{i * 10} minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-md bg-gray-50">
                <p className="text-gray-500">User management table will appear here.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'prescriptions' && (
          <Card>
            <CardHeader>
              <CardTitle>Prescription Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-md bg-gray-50">
                <p className="text-gray-500">Prescription queue will appear here.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'inventory' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Hidden API Inventory</CardTitle>
              <Button size="sm" variant="outline" onClick={() => {
                setInventoryLoading(true);
                fetch("/api/inventory").then(res => res.json()).then(data => { setInventory(data); setInventoryLoading(false); }).catch(err => { console.error(err); setInventoryLoading(false); });
              }}>Refresh</Button>
            </CardHeader>
            <CardContent>
              {inventoryLoading ? (
                <div className="flex justify-center p-8 text-gray-500">Loading inventory data...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Item Name</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Stock Level</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Last Restocked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item, i) => (
                        <tr key={i} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{item.id}</td>
                          <td className="px-4 py-3">{item.name}</td>
                          <td className="px-4 py-3">{item.category}</td>
                          <td className="px-4 py-3">
                            <span className="font-semibold">{item.stock}</span>
                            <span className="text-gray-400 ml-1 text-xs">/ {item.reorderLevel} min</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' : item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{item.lastRestocked}</td>
                        </tr>
                      ))}
                      {inventory.length === 0 && !inventoryLoading && (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No inventory data found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-md bg-gray-50">
                <p className="text-gray-500">Settings form will appear here.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
