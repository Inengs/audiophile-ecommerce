export interface Product {
  _id: string;
  slug: string;
  name: string;
  category: "headphones" | "speakers" | "earphones";
  isNew: boolean;
  price: number;
  description: string;
  features: string;
  includedItems: IncludedItem[];
  gallery: {
    first: string;
    second: string;
    third: string;
  };
  images: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  relatedProducts: string[];
}

export interface IncludedItem {
  quantity: number;
  item: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface PaymentDetails {
  paymentMethod: "eMoney" | "cash";
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: CartItem[];
  shipping: ShippingDetails;
  payment: PaymentDetails;
  subtotal: number;
  shipping_cost: number;
  vat: number;
  grandTotal: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: number;
}
