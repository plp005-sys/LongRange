export async function onRequestGet() {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  
  // Open until 18:30 UTC
  const isOpen = (utcHours < 18) || (utcHours === 18 && utcMinutes < 30);
  const status = isOpen ? "Open Now" : "Closed";

  const stores = [
    { id: 1, name: "Long-Range Pharmacies - Kelvin Corner", address: "Shop 3B Kelvin Corner, Graniteside, Harare, Zimbabwe", lat: -17.8488, lng: 31.0531, status: status, phone: "+263 77 160 0539", directionsUrl: "https://www.google.com/maps/dir//Kelvin+Corner,+42WX%2BRGW,+Harare/@-17.8526708,31.0477428,17.04z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1931a490930d5123:0x4bd6e8be004c53c4!2m2!1d31.0488296!2d-17.8528808?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" },
    { id: 2, name: "Long-Range Pharmacies - Shawasha Hills", address: "Shawasha Hills Mall, Shawasha Hills, Harare, Zimbabwe", lat: -17.7554, lng: 31.1576, status: status, phone: "+263 77 716 8343", directionsUrl: "https://www.google.com/maps/dir//Shawasha+Hills+Mall,+Harare/@-17.7657639,31.1187768,12.5z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1931b906fbf7de43:0x6eff626f4cb126e!2m2!1d31.1716465!2d-17.764342?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" },
    { id: 3, name: "Bright Pharmacies - Southerton", address: "Southerton, Harare, Zimbabwe", lat: -17.8596, lng: 31.0186, status: status, phone: "+263 71 560 1156", directionsUrl: "https://www.google.com/maps/dir//Southerton,+Harare,+Zimbabwe" },
  ];
  return new Response(JSON.stringify(stores), {
    headers: { 'Content-Type': 'application/json' }
  });
}
