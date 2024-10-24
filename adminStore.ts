import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GiftCardProduct, Promotion, AdminState } from '../types';

interface AdminStore extends AdminState {
  addGiftCard: (card: Omit<GiftCardProduct, 'id'>) => void;
  removeGiftCard: (id: string) => void;
  addPromotion: (promotion: Omit<Promotion, 'id'>) => void;
  removePromotion: (id: string) => void;
  initializePromotions: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      giftCards: [],
      promotions: [],
      
      addGiftCard: (card) => set((state) => ({
        giftCards: [...state.giftCards, { ...card, id: crypto.randomUUID() }]
      })),
      
      removeGiftCard: (id) => set((state) => ({
        giftCards: state.giftCards.filter(card => card.id !== id)
      })),
      
      addPromotion: (promotion) => set((state) => ({
        promotions: [...state.promotions, { ...promotion, id: crypto.randomUUID() }]
      })),
      
      removePromotion: (id) => set((state) => ({
        promotions: state.promotions.filter(promo => promo.id !== id)
      })),
      
      initializePromotions: () => set((state) => {
        if (state.promotions.length === 0) {
          return {
            promotions: [
              {
                id: '1',
                title: 'Spring Sale',
                description: 'Get 20% off on all gift cards',
                image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946',
                discount: 20
              },
              {
                id: '2',
                title: 'Gaming Bundle',
                description: 'Buy any gaming card and get 10% extra value',
                image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
                discount: 10
              },
              {
                id: '3',
                title: 'Music Month',
                description: 'Special discounts on music gift cards',
                image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
                discount: 15
              },
              {
                id: '4',
                title: 'Holiday Special',
                description: 'Limited time offers on all categories',
                image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383',
                discount: 25
              }
            ]
          };
        }
        return state;
      })
    }),
    {
      name: 'gift-card-store',
      skipHydration: false,
    }
  )
);