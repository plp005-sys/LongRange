import babyWashImg from "./assets/images/baby_wash_shampoo_1782810280547.jpg";
import sportsFirstAidImg from "./assets/images/sports_first_aid_kit_1782769663807.jpg";
import digitalThermometerImg from "./assets/images/digital_thermometer_product_1781820362040.jpg";
import laRiveImg from "./assets/images/la_rive_perfume_visible_1782810458478.jpg";
import skinRepublicImg from "./assets/images/skin_republic_banner_1782733312396.jpg";

export const products = [
  { id: 1, name: "Gentle Baby Wash & Shampoo", category: "Baby Care", price: 12.99, image: babyWashImg },
  { id: 2, name: "Sports First Aid Kit", category: "Personal Care", price: 34.99, image: sportsFirstAidImg },
  { id: 5, name: "Digital Thermometer", category: "Pharmacy & Supplement", price: 14.99, image: digitalThermometerImg },
  { id: 7, name: "La Rive Perfume", category: "Beauty & Cosmetics", price: 19.99, image: laRiveImg },
  { id: 10, name: "Skin Republic - Glass Skin", category: "Beauty & Cosmetics", price: 24.99, image: skinRepublicImg },
  { id: 8, name: "Premium Whey Protein (1kg)", category: "Fitness", price: 49.99, image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=400&q=80" },
  { id: 9, name: "Resistance Bands Set", category: "Fitness", price: 19.99, image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80" },
];

export const medications = [
  { id: 101, name: "Amoxicillin", dosage: "500mg", frequency: "3 times a day", status: "Active", nextRefill: "2024-06-25" },
  { id: 102, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", status: "Active", nextRefill: "2024-07-10" },
  { id: 103, name: "Ibuprofen", dosage: "400mg", frequency: "As needed", status: "As Needed", nextRefill: "N/A" },
];

const now = new Date();
const utcHours = now.getUTCHours();
const utcMinutes = now.getUTCMinutes();
// Open until 18:30 UTC
const isOpen = (utcHours < 18) || (utcHours === 18 && utcMinutes < 30);
const storeStatus = isOpen ? "Open Now" : "Closed";

export const stores = [
  { id: 1, name: "Long-Range Pharmacies - Kelvin Corner", address: "Shop 3B Kelvin Corner, Graniteside, Harare, Zimbabwe", lat: -17.8488, lng: 31.0531, status: storeStatus, phone: "+263 77 160 0539", directionsUrl: "https://www.google.com/maps/dir//Kelvin+Corner,+42WX%2BRGW,+Harare/@-17.8526708,31.0477428,17.04z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1931a490930d5123:0x4bd6e8be004c53c4!2m2!1d31.0488296!2d-17.8528808?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 2, name: "Long-Range Pharmacies - Shawasha Hills", address: "Shawasha Hills Mall, Shawasha Hills, Harare, Zimbabwe", lat: -17.7554, lng: 31.1576, status: storeStatus, phone: "+263 77 716 8343", directionsUrl: "https://www.google.com/maps/dir//Shawasha+Hills+Mall,+Harare/@-17.7657639,31.1187768,12.5z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1931b906fbf7de43:0x6eff626f4cb126e!2m2!1d31.1716465!2d-17.764342?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" },
  { id: 3, name: "Bright Pharmacies - Southerton", address: "Southerton, Harare, Zimbabwe", lat: -17.8596, lng: 31.0186, status: storeStatus, phone: "+263 71 560 1156", directionsUrl: "https://www.google.com/maps/dir//Southerton,+Harare,+Zimbabwe" },
];
