import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { NotificationToast } from './components/NotificationToast';

export const MainApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      // 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="app-shell">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="main-content">
        <section className="hero-banner">
          <div className="hero-content">
            <span className="hero-tag">New Season Arrivals</span>
            <h1>Discover Quality Products for Your Everyday Life</h1>
            <p>Explore our curated collection of high-grade electronics, apparel, and lifestyle goods.</p>
          </div>
        </section>

        <ProductGrid
          products={filteredProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
        />
      </main>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-col">
            <h4>ShopVibe</h4>
            <p>Your one-stop store for modern essentials, technology, and style.</p>
          </div>
          <div className="footer-col">
            <h4>Customer Support</h4>
            <ul>
              <li><a href="#help">Help & Support</a></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Stay Connected</h4>
            <p>Subscribe for exclusive deals and updates.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ShopVibe. All rights reserved.</p>
        </div>
      </footer>

      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <NotificationToast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
};

export default App;
