import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "../types";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "../components/ui/Input";
import { useCart } from "../contexts/CartContext";
import { products as mockProducts } from "../data";

export default function Shop() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBeautyOpen, setIsBeautyOpen] = useState(
    initialCategory === "Beauty & Cosmetics" || initialCategory === "Skin Republic" || initialCategory === "La Rive"
  );

  const categories = ["All", "Shop", "Beauty & Cosmetics", "Personal Care", "Baby Care", "Pharmacy & Supplement", "Fitness"];
  const beautySubCategories = ["Skin Republic", "La Rive"];

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    setSelectedCategory(cat);
  }, [searchParams]);

  const filteredProducts = products.filter(p => {
    let matchesCategory = !selectedCategory || selectedCategory === "All" || p.category === selectedCategory;
    
    if (selectedCategory === "Skin Republic") {
      matchesCategory = p.name.toLowerCase().includes("skin republic");
    } else if (selectedCategory === "La Rive") {
      matchesCategory = p.name.toLowerCase().includes("la rive");
    }

    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (category: string) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filtering */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Filter className="h-5 w-5" /> Categories
            </h3>
            <div className="flex flex-col space-y-1">
              {categories.map(cat => (
                <div key={cat} className="flex flex-col">
                  {cat === "Beauty & Cosmetics" ? (
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleCategoryClick(cat)}
                          className={`flex-1 text-left px-3 py-2 rounded-l-md text-sm transition-colors ${
                            (selectedCategory === cat || (cat === "All" && !selectedCategory))
                              ? "bg-[#32a852] text-white font-medium"
                              : "text-gray-600 hover:bg-green-50"
                          }`}
                        >
                          {cat}
                        </button>
                        <button
                          onClick={() => setIsBeautyOpen(!isBeautyOpen)}
                          className={`px-3 py-2 rounded-r-md transition-colors ${
                            (selectedCategory === cat || (cat === "All" && !selectedCategory))
                              ? "bg-[#32a852] text-white font-medium"
                              : "text-gray-600 hover:bg-green-50 bg-gray-50"
                          }`}
                        >
                          {isBeautyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                      {isBeautyOpen && (
                        <div className="ml-4 mt-1 flex flex-col space-y-1 border-l-2 border-green-100 pl-2">
                          {beautySubCategories.map(subCat => (
                            <button
                              key={subCat}
                              onClick={() => handleCategoryClick(subCat)}
                              className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                selectedCategory === subCat
                                  ? "bg-[#32a852] text-white font-medium"
                                  : "text-gray-600 hover:bg-green-50"
                              }`}
                            >
                              {subCat}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCategoryClick(cat)}
                      className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        (selectedCategory === cat || (cat === "All" && !selectedCategory))
                          ? "bg-[#32a852] text-white font-medium"
                          : "text-gray-600 hover:bg-green-50"
                      }`}
                    >
                      {cat}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCategory && selectedCategory !== "All" ? selectedCategory : "All Products"}
            </h1>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={`shop-loading-${i}`} className="animate-pulse flex flex-col h-[300px] bg-white rounded-lg shadow-sm border p-4">
                  <div className="bg-gray-200 h-40 rounded-md mb-4" />
                  <div className="bg-gray-200 h-4 w-2/3 mb-2 rounded" />
                  <div className="bg-gray-200 h-4 w-1/3 rounded" />
                  <div className="mt-auto bg-gray-200 h-10 rounded-md" />
                </div>
              ))
            ) : filteredProducts.length === 0 ? (
               <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-lg border">
                 No products found matching your criteria.
               </div>
            ) : (
              filteredProducts.map((product) => (
                <Card key={product.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="aspect-square relative overflow-hidden mb-4 rounded-md flex items-center justify-center">
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center border border-gray-100 p-4">
                         <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                    <h4 className="font-semibold text-gray-800 flex-1 leading-tight mb-2 line-clamp-2">{product.name}</h4>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <span className="text-lg font-bold text-[#32a852]">${product.price.toFixed(2)}</span>
                      <Button size="sm" onClick={() => addToCart(product)}>Add</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
