export interface User {
  id: string;
  email: string;
  name: string;
  addressLineOne: string;
  city: string;
  country: string;
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
  isActivatedByUser: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface RestaurantGETManyRes extends GETManyRes<Restaurant> {}
