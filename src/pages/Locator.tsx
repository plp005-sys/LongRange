import React, { useEffect, useState } from "react";
import { StoreLocation } from "../types";
import { Button } from "../components/ui/Button";
import { MapPin, Phone, Clock } from "lucide-react";
import { stores as mockStores } from "../data";

export default function Locator() {
  const [stores, setStores] = useState<StoreLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setStores(mockStores);
      if (mockStores.length > 0) setSelectedStore(mockStores[0]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Find a Pharmacy</h1>
      
      <div className="grid md:grid-cols-3 gap-6 h-[600px]">
        {/* Store List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold">Nearest Locations</h2>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {loading ? (
              <div className="p-4 text-center text-gray-500 animate-pulse">Loading stores...</div>
            ) : (
              stores.map((store) => (
                <div 
                  key={store.id} 
                  onClick={() => setSelectedStore(store)}
                  className={`p-4 rounded-md cursor-pointer transition-colors border ${
                    selectedStore?.id === store.id ? "border-[#32a852] bg-green-50" : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  <h3 className="font-bold text-gray-900">{store.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 flex items-start gap-1">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    {store.address}
                  </p>
                  <div className="mt-2 text-xs font-medium text-[#32a852]">
                    {store.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="md:col-span-2 bg-gray-100 rounded-lg shadow-sm border border-gray-200 overflow-hidden relative flex items-center justify-center h-full min-h-[300px]">
          {selectedStore ? (
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://maps.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed`} 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0}
              className="absolute inset-0"
            ></iframe>
          ) : (
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://maps.google.com/maps?q=Harare&t=&z=11&ie=UTF8&iwloc=&output=embed`} 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0}
              className="absolute inset-0"
            ></iframe>
          )}
            
          {/* Selected Store Details Overlay */}
          {selectedStore && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-lg border outline-none p-4 z-10">
              <h3 className="font-bold text-lg">{selectedStore.name}</h3>
              <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                 <Phone className="h-4 w-4" /> {selectedStore.phone || "+263 77 160 0539"}
              </p>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                 <Clock className="h-4 w-4" /> {selectedStore.status}
              </p>
              <Button 
                className="w-full mt-4 bg-[#FFF101] hover:bg-[#32a852] hover:text-white text-gray-900 font-bold transition-colors"
                onClick={() => window.open(selectedStore.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${selectedStore.lat},${selectedStore.lng}`, "_blank")}
              >
                Get Directions
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
