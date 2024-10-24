export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface GiftCardProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  category: Category;
  isPopular: boolean;
}

export type Category = 'shopping' | 'gaming' | 'music' | 'entertainment' | 'virtualcards' | 'crypto';

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
}

export interface AdminState {
  giftCards: GiftCardProduct[];
  promotions: Promotion[];
}