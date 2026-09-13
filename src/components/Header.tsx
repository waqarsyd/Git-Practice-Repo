import React from 'react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
}) => {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand-section" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
          <div className="logo-icon">🛍️</div>
          <div className="brand-text">
            <span className="brand-name">ShopVibe</span>
            <span className="brand-tagline">Premium Lifestyle Store</span>
          </div>
        </div>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products by title, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search products"
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="header-actions">
          <button
            className="cart-button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`View cart with ${totalCount} items`}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-label">Cart</span>
            {totalCount > 0 && (
              <span className="cart-badge">{totalCount > 99 ? '99+' : totalCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
