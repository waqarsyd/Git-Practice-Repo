import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
      <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => setSelectedProduct(null)}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="product-detail-layout">
          <div className="product-detail-image-wrapper">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="product-detail-image"
            />
          </div>

          <div className="product-detail-info">
            <span className="product-category">{selectedProduct.category}</span>
            <h2 className="product-detail-title">{selectedProduct.title}</h2>

            <div className="product-detail-meta">
              <span className="product-price">${selectedProduct.price.toFixed(2)}</span>
              <span className={`stock-status ${selectedProduct.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {selectedProduct.inStock ? '✓ In Stock' : '✕ Out of Stock'}
              </span>
            </div>

            <div className="product-detail-rating">
              <span className="stars">★ {selectedProduct.rating.rate}</span>
              <span className="rating-count">({selectedProduct.rating.count} customer reviews)</span>
            </div>

            <p className="product-detail-desc">{selectedProduct.description}</p>

            {selectedProduct.inStock && (
              <div className="quantity-picker">
                <label htmlFor="modal-qty">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <input
                    id="modal-qty"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="qty-input"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button
                className="btn btn-primary btn-large"
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
              >
                {selectedProduct.inStock ? `Add ${quantity} to Cart` : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
