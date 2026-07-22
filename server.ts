import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Third-Party Integration ---
  let THIRD_PARTY_API_URL = process.env.THIRD_PARTY_API_URL || "";
  if (THIRD_PARTY_API_URL.toLowerCase().includes("/api/auth/login")) {
    THIRD_PARTY_API_URL = THIRD_PARTY_API_URL.substring(0, THIRD_PARTY_API_URL.toLowerCase().indexOf("/api/auth/login"));
  } else if (THIRD_PARTY_API_URL.includes("/swagger")) {
    THIRD_PARTY_API_URL = THIRD_PARTY_API_URL.split("/swagger")[0];
  }
  const ERP_EMAIL = process.env.ERP_EMAIL || "ecommerce";
  const ERP_PASSWORD = process.env.ERP_PASSWORD || "Pass-5952";
  
  let erpToken: string | null = null;
  
  async function getErpToken() {
    if (erpToken) return erpToken;
    if (!THIRD_PARTY_API_URL) return null;
    
    try {
      const response = await fetch(`${THIRD_PARTY_API_URL}/api/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: ERP_EMAIL,
          password: ERP_PASSWORD,
          neverExpire: true
        })
      });
      if (response.ok) {
        // the response might just be the token string or an object like { token: "..." }
        // The instructions say "From the response, copy the token value. That JWT is your API key."
        const data = await response.text();
        try {
          const json = JSON.parse(data);
          erpToken = json.token || json.jwt || data;
        } catch {
          erpToken = data; // If it's a plain string
        }
        return erpToken;
      }
    } catch (e) {
      console.error("Failed to authenticate with ERP", e);
    }
    return null;
  }

  // --- API Routes ---
  
  // Mock Products API
  app.get("/api/products", (req, res) => {
    const products = [
      { id: 1, name: "Gentle Baby Wash & Shampoo", category: "Baby Care", price: 12.99, image: "/src/assets/images/baby_wash_shampoo_1782810280547.jpg" },
      { id: 2, name: "Sports First Aid Kit", category: "Personal Care", price: 34.99, image: "/src/assets/images/sports_first_aid_kit_1782769663807.jpg" },
      { id: 5, name: "Digital Thermometer", category: "Pharmacy & Supplement", price: 14.99, image: "/src/assets/images/digital_thermometer_product_1781820362040.jpg" },
      { id: 7, name: "La Rive Perfume", category: "Beauty & Cosmetics", price: 19.99, image: "/src/assets/images/la_rive_perfume_visible_1782810458478.jpg" },
      { id: 10, name: "Skin Republic - Glass Skin", category: "Beauty & Cosmetics", price: 24.99, image: "/src/assets/images/skin_republic_banner_1782733312396.jpg" },
      { id: 8, name: "Premium Whey Protein (1kg)", category: "Fitness", price: 49.99, image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=400&q=80" },
      { id: 9, name: "Resistance Bands Set", category: "Fitness", price: 19.99, image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80" },
    ];
    res.json(products);
  });

  // Mock User Medication Tracking Data
  app.get("/api/medications", (req, res) => {
    const meds = [
      { id: 101, name: "Amoxicillin", dosage: "500mg", frequency: "3 times a day", status: "Active", nextRefill: "2024-06-25" },
      { id: 102, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", status: "Active", nextRefill: "2024-07-10" },
      { id: 103, name: "Ibuprofen", dosage: "400mg", frequency: "As needed", status: "As Needed", nextRefill: "N/A" },
    ];
    res.json(meds);
  });

  // Mock Payment Processing
  app.post("/api/payment", (req, res) => {
    const { amount, method } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid payment amount" });
    }
    
    if (!method) {
      return res.status(400).json({ error: "Payment method is required" });
    }

    // Simulate calling an external secure payment gateway
    setTimeout(() => {
      const orderId = "LR-" + Math.floor(100000 + Math.random() * 900000);
      res.json({ success: true, orderId, method, amount });
    }, 1500);
  });

  // Mock Store Locations
  app.get("/api/stores", (req, res) => {
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
    res.json(stores);
  });

  // Mock ERP Inventory API (Read)
  app.get("/api/inventory", async (req, res) => {
    // In a real application, you would verify admin authentication here
    
    const token = await getErpToken();
    if (token && THIRD_PARTY_API_URL) {
      try {
        // Try to fetch from the third-party API
        const response = await fetch(`${THIRD_PARTY_API_URL}/api/ecommerce/products`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Map the ecommerce product data to the inventory structure
          const inventory = data.map((item: any) => ({
            id: item.productId,
            name: item.productName,
            category: item.categories && item.categories.length > 0 ? item.categories[0].name : "General",
            stock: "N/A", // Not provided by the API
            reorderLevel: 10,
            status: "In Stock", // Assumed
            lastRestocked: new Date().toISOString().split('T')[0]
          }));
          return res.json(inventory);
        } else if (response.status === 401) {
           // Token might be expired, clear it
           erpToken = null;
        }
      } catch (e) {
        console.error("Failed to fetch from ERP", e);
      }
    }
    
    // Fallback if not configured or external API fails
    try {
      const invData = await fs.readFile(path.join(process.cwd(), 'inv.json'), 'utf-8');
      return res.json(JSON.parse(invData));
    } catch (err) {
      console.error("Failed to read inv.json fallback", err);
      return res.json([]);
    }
  });

  // Customer Registration Proxy
  app.post("/api/customers/register", async (req, res) => {
    const token = await getErpToken();
    if (!token || !THIRD_PARTY_API_URL) {
      // Fallback for local testing
      return res.json({ customerId: `CUST-${Math.floor(Math.random() * 10000)}`, ...req.body });
    }

    try {
      const response = await fetch(`${THIRD_PARTY_API_URL}/api/ecommerce/customers/register`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      });
      
      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      } else {
        return res.status(response.status).json(await response.json().catch(() => ({})));
      }
    } catch (e) {
      console.error("Failed to register customer", e);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create new inventory item
  app.post("/api/inventory", (req, res) => {
    res.status(501).json({ error: "Not implemented. Inventory is read-only via ERP." });
  });

  // Update existing inventory item
  app.put("/api/inventory/:id", (req, res) => {
    res.status(501).json({ error: "Not implemented. Inventory is read-only via ERP." });
  });

  // Delete inventory item
  app.delete("/api/inventory/:id", (req, res) => {
    res.status(501).json({ error: "Not implemented. Inventory is read-only via ERP." });
  });

  // --- Vite Middleware (MUST BE AFTER API ROUTES) ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
