export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  status: string;
  nextRefill: string;
}

export interface StoreLocation {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  status: string;
  phone?: string;
  directionsUrl?: string;
}
