import React, { useState, useEffect } from 'react';
import { GiftCard } from './components/GiftCard';
import { Cart } from './components/Cart';
import { AdminPanel } from './components/AdminPanel';
import { PromotionSlider } from './components/PromotionSlider';
import { CategorySection } from './components/CategorySection';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SupportPage } from './components/SupportPage';
import { LegalPage } from './components/LegalPage';
import { GiftCardsPage } from './components/GiftCardsPage';
import { useAdminStore } from './store/adminStore';
import type { CartItem, Category } from './types';

export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { initializePromotions } = useAdminStore();

  useEffect(() => {
    initializePromotions();
    document.body.className = 'bg-gray-900';
  }, [initializePromotions]);

  const handleAddToCart = (card: CartItem) => {
    setCartItems((current) => {
      const exists = current.find((item) => item.id === card.id);
      if (exists) {
        return current.map((item) =>
          item.id === card.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...card, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const path = window.location.pathname;

  if (path === '/admin') {
    return <AdminPanel />;
  }

  if (path === '/support') {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header 
          cartItemsCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
          onSearch={setSearchQuery}
        />
        <SupportPage />
        <Footer />
      </div>
    );
  }

  if (path === '/legal') {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header 
          cartItemsCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
          onSearch={setSearchQuery}
        />
        <LegalPage />
        <Footer />
      </div>
    );
  }

  if (path === '/gift-cards') {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header 
          cartItemsCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
          onSearch={setSearchQuery}
        />
        <GiftCardsPage 
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
        />
        <Cart
          items={cartItems}
          onRemove={handleRemoveFromCart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        cartItemsCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PromotionSlider />

        {/* Popular Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useAdminStore.getState().giftCards
              .filter((card) => card.isPopular)
              .map((card) => (
                <GiftCard
                  key={card.id}
                  {...card}
                  onAddToCart={() => handleAddToCart(card)}
                />
              ))}
          </div>
        </section>

        <CategorySection
          selectedCategory={null}
          onSelectCategory={() => {}}
        />
      </main>

      <Cart
        items={cartItems}
        onRemove={handleRemoveFromCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <Footer />
    </div>
  );
}