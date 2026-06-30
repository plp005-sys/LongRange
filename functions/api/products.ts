export async function onRequestGet() {
  const products = [
    { id: 1, name: "Gentle Baby Wash & Shampoo", category: "Baby Care", price: 12.99, image: "/src/assets/images/baby_wash_shampoo_1782810280547.jpg" },
    { id: 2, name: "Sports First Aid Kit", category: "Personal Care", price: 34.99, image: "/src/assets/images/sports_first_aid_kit_1782769663807.jpg" },
    { id: 5, name: "Digital Thermometer", category: "Pharmacy & Supplement", price: 14.99, image: "/src/assets/images/digital_thermometer_product_1781820362040.jpg" },
    { id: 7, name: "La Rive Perfume", category: "Beauty & Cosmetics", price: 19.99, image: "/src/assets/images/la_rive_perfume_visible_1782810458478.jpg" },
    { id: 10, name: "Skin Republic - Glass Skin", category: "Beauty & Cosmetics", price: 24.99, image: "/src/assets/images/skin_republic_banner_1782733312396.jpg" },
    { id: 8, name: "Premium Whey Protein (1kg)", category: "Fitness", price: 49.99, image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=400&q=80" },
    { id: 9, name: "Resistance Bands Set", category: "Fitness", price: 19.99, image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80" },
  ];
  return new Response(JSON.stringify(products), {
    headers: { 'Content-Type': 'application/json' }
  });
}
