import React, { useEffect, useState } from "react";
import { Medication } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Pill, Calendar, Clock, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/Button";
import { medications as mockMedications } from "../data";

export default function Tracking() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMedications(mockMedications);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Medications</h1>
          <p className="text-gray-600 mt-1">Track your active prescriptions and request refills.</p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" /> Sync with Clinic
        </Button>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={`tracking-loading-${i}`} className="animate-pulse">
                <CardHeader className="h-16 bg-gray-100" />
                <CardContent className="h-24 bg-gray-50" />
              </Card>
            ))}
          </div>
        ) : medications.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Pill className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No active medications</h3>
              <p className="text-gray-500 mt-2">Upload a prescription to get started.</p>
            </CardContent>
          </Card>
        ) : (
          medications.map((med) => (
            <Card key={med.id} className="overflow-hidden border-l-4 border-l-[#15e637]">
              <CardContent className="p-0 sm:flex">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{med.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      med.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {med.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Pill className="h-4 w-4 mr-2 text-gray-400" />
                      Dosage: <span className="font-semibold text-gray-900 ml-1">{med.dosage}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      Freq: <span className="font-semibold text-gray-900 ml-1">{med.frequency}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 sm:w-64 border-t sm:border-t-0 sm:border-l border-gray-100 flex flex-col justify-center items-start sm:items-center text-center">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-1.5" /> Next Refill
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-4">
                    {med.nextRefill !== "N/A" ? new Date(med.nextRefill).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'As Needed'}
                  </div>
                  <Button variant={med.nextRefill !== "N/A" ? "default" : "outline"} className="w-full sm:w-auto" disabled={med.nextRefill === "N/A"}>
                    Request Refill
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
