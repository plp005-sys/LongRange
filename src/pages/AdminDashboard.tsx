import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { 
  Users, 
  Package, 
  Settings, 
  Activity,
  FileText,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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
