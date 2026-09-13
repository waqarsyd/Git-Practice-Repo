import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/mockProducts';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  searchQuery,
}) => {
  return (
    <section className="catalog-section">
      <div className="catalog-controls">
        <div className="category-pills" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sort-control">
          <label htmlFor="sort-select" className="sort-label">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="sort-select"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {searchQuery && (
        <div className="search-results-info">
          Showing results for "<strong>{searchQuery}</strong>" ({products.length} found)
        </div>
      )}

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-catalog">
          <div className="empty-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search query or switching categories.</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedCategory('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
