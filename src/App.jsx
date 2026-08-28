import React, { useState, useMemo } from 'react';
import { spicesData } from './data/spicesData.js';
import { recipesData } from './data/recipesData.js';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [spices] = useState(spicesData);
  const [recipes] = useState(recipesData);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSpice, setSelectedSpice] = useState(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (spice, quantity = 1, format = null) => {
    const itemFormat = format || spice.unit;
    const cartItemId = `${spice.id}-${itemFormat}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          spiceId: spice.id,
          name: spice.name,
          price: spice.price,
          format: itemFormat,
          quantity,
          image: spice.image
        }
      ];
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F2] text-[#1B1715]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FBF8F2]/90 backdrop-blur-md border-b border-[#E9DDCB]">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div onClick={() => setCurrentView('home')} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C2593F] to-[#E0A93B] flex items-center justify-center text-white font-bold">
              D
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-widest block leading-tight">
                LES ÉPICES DE DJOUMA
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C2593F] font-semibold uppercase">
                Maison d'Artisanat Gastronomique
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <button onClick={() => setCurrentView('home')} className={currentView === 'home' ? 'text-[#C2593F] font-bold' : 'hover:text-[#C2593F]'}>
              Accueil
            </button>
            <button onClick={() => setCurrentView('catalog')} className={currentView === 'catalog' ? 'text-[#C2593F] font-bold' : 'hover:text-[#C2593F]'}>
              Catalogue
            </button>
            <button onClick={() => setCurrentView('recipes')} className={currentView === 'recipes' ? 'text-[#C2593F] font-bold' : 'hover:text-[#C2593F]'}>
              Recettes
            </button>
            <button onClick={() => setCurrentView('admin')} className="px-3 py-1.5 rounded-lg border border-[#3F5E4D] text-[#3F5E4D] text-xs font-bold">
              👑 Admin
            </button>
          </nav>
        </div>
      </header>

      {/* Main View Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {currentView === 'home' && (
          <div className="space-y-12 py-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C2593F] font-bold">✦ Nouvelle Ère Artisanale ✦</span>
              <h1 className="text-5xl font-serif font-bold">L'Essence Pure des Terroirs Rares</h1>
              <p className="text-[#3E3632] leading-relaxed">Sélection rigoureuse de poivres de grands crus, safran d'altitude et mélanges signatures.</p>
              <div className="pt-4 flex justify-center gap-4">
                <button onClick={() => setCurrentView('catalog')} className="px-6 py-3 rounded-xl bg-[#C2593F] text-white font-bold shadow-md hover:bg-[#A9432B]">
                  Voir le Catalogue →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
