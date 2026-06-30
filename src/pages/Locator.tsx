import React, { useEffect, useState } from "react";
import { StoreLocation } from "../types";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { MapPin, Phone, Clock } from "lucide-react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { stores as mockStores } from "../data";

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

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

  if (!hasValidKey) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Google Maps API Key Required</h2>
        <div className="max-w-md text-left text-gray-700 bg-gray-50 p-6 rounded-lg border">
          <p className="mb-4"><strong>Step 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener" className="text-[#32a852] hover:underline">Get an API Key</a></p>
          <p className="mb-2"><strong>Step 2:</strong> Add your key as a secret in AI Studio:</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>)</li>
            <li>Select <strong>Secrets</strong></li>
            <li>Type <code className="bg-gray-200 px-1 rounded">GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong></li>
            <li>Paste your API key as the value, press <strong>Enter</strong></li>
          </ul>
          <p className="text-sm text-gray-500">The app rebuilds automatically after you add the secret.</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
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
              <Map
                center={selectedStore ? { lat: selectedStore.lat, lng: selectedStore.lng } : { lat: 34.0522, lng: -118.2437 }}
                zoom={12}
                mapId="PHARMACY_LOCATOR_MAP"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{width: '100%', height: '100%'}}
                disableDefaultUI={true}
              >
                {stores.map((store) => (
                  <AdvancedMarker
                    key={store.id}
                    position={{ lat: store.lat, lng: store.lng }}
                    onClick={() => setSelectedStore(store)}
                  >
                    <Pin 
                      background={selectedStore?.id === store.id ? "#32a852" : "#ea4335"} 
                      glyphColor="#fff" 
                      borderColor={selectedStore?.id === store.id ? "#288441" : "#c5221f"}
                    />
                  </AdvancedMarker>
                ))}
              </Map>
              
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
                    onClick={() => window.open(selectedStore.directionsUrl || "https://www.google.com/maps/dir//Kelvin+Corner,+42WX%2BRGW,+Harare/@-17.8526708,31.0477428,17.04z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1931a490930d5123:0x4bd6e8be004c53c4!2m2!1d31.0488296!2d-17.8528808?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D", "_blank")}
                  >
                    Get Directions
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
