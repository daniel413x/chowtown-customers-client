export interface User {
  id: string;
  email: string;
  name: string;
  addressLineOne: string;
  city: string;
  country: string;
  location: [number, number];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
}

export interface Restaurant {
  id: string;
  userId: string;
  restaurantName: string;
  slug: string;
  imageUrl: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  lastUpdated: string;
  location: [number, number];
  isActivatedByUser: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// eslint-disable-next-line no-shadow
export enum Status {
  PLACED = "PLACED",
  PAID = "PAID",
  IN_PROGRESS = "IN_PROGRESS",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED"
}

interface DeliveryDetails extends Pick<User, "email" | "name" | "addressLineOne" | "city"> {}

export interface DeliveryDetailsPOSTReq extends DeliveryDetails, Partial<Pick<User, "location">> {}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  deliveryDetails: DeliveryDetails;
  cartItems: CartItem[];
  totalAmount: number;
  status: Status;
  createdAt: string;
}

interface GETManyRes<T> {
  rows: T[];
  pagination: {
    page: number;
    size: number;
    pages: number;
    count: number;
    pageLimitReached: boolean;
  }
}

export interface RestaurantGETManyRes extends GETManyRes<Restaurant> {}

export interface OrdersGETManyRes extends GETManyRes<Order> {}
