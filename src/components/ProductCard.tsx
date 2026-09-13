import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useCart();

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const hasHalf = rate % 1 >= 0.5;
    return '★'.repeat(fullStars) + (hasHalf ? '½' : '') + '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
  };

  return (
    <div className="product-card">
      <div className="product-image-container" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        {product.featured && <span className="badge badge-featured">Featured</span>}
        {!product.inStock && <span className="badge badge-outofstock">Out of Stock</span>}
        <button
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
        >
          Quick View
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title" onClick={() => setSelectedProduct(product)}>
          {product.title}
        </h3>
        
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating.rate)}</span>
          <span className="rating-score">{product.rating.rate}</span>
          <span className="rating-count">({product.rating.count})</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-card-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <button
            className="btn btn-primary add-to-cart-btn"
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
};
