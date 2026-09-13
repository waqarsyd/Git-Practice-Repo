import React from 'react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    totalCount,
    subtotal,
    tax,
    shipping,
    grandTotal,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingThreshold = 100;
  const amountToFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>
            Your Shopping Cart <span className="cart-drawer-count">({totalCount})</span>
          </h2>
          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {subtotal > 0 && subtotal < freeShippingThreshold && (
          <div className="free-shipping-bar">
            <span>Add <strong>${amountToFreeShipping.toFixed(2)}</strong> more to get <strong>Free Shipping!</strong></span>
            <div className="shipping-progress">
              <div
                className="shipping-progress-fill"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {subtotal >= freeShippingThreshold && (
          <div className="free-shipping-unlocked">
            🎉 You unlocked <strong>Free Shipping!</strong>
          </div>
        )}

        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-view">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Explore our catalog to add products to your cart.</p>
              <button
                className="btn btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{product.title}</h4>
                    <span className="cart-item-price">${product.price.toFixed(2)} each</span>

                    <div className="cart-item-actions">
                      <div className="quantity-controls compact">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-value">{quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(product.id)}
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="free-tag">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span className="grand-total-price">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-footer-buttons">
              <button
                className="btn btn-secondary"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="btn btn-primary btn-checkout"
                onClick={handleCheckout}
              >
                Checkout (${grandTotal.toFixed(2)})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
