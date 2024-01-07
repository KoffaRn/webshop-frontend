export type AuthData = {
  user: User;
  jwt: string;
};
export interface User {
  id: number;
  username: string;
  roles: Role[];
}

export interface Role {
  id: number;
  authority: string;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  active: boolean;
  current: boolean;
}
export interface Cart {
  id: number;
  user: User;
  cartItems: CartItem[];
}
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface ChangeCartItemQuantity {
  cart?: Cart;
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  user: User;
  products: OrderProduct[];
}

export interface OrderProduct {
  id: number;
  product: Product;
  quantity: number;
}
