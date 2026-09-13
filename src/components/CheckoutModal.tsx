import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    tax,
    shipping,
    grandTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Partial<CheckoutFormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid Email is required';
    }
    if (!formData.address.trim()) newErrors.address = 'Shipping Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP Code is required';
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 12) {
      newErrors.cardNumber = 'Valid Card Number is required';
    }
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date (MM/YY) required';
    if (!formData.cardCvc.trim() || formData.cardCvc.length < 3) {
      newErrors.cardCvc = 'CVC required';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const generatedOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsSubmitted(false);
    setIsCheckoutOpen(false);
    setFormData({
      fullName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    });
  };

  return (
    <div className="modal-backdrop" onClick={() => !isSubmitted && setIsCheckoutOpen(false)}>
      <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => {
            if (isSubmitted) handleFinish();
            else setIsCheckoutOpen(false);
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className="checkout-success-view">
            <div className="success-icon">🎉</div>
            <h2>Order Confirmed!</h2>
            <p className="order-number">Order ID: <strong>{orderId}</strong></p>
            <p className="order-message">
              Thank you for your purchase, <strong>{formData.fullName}</strong>! A confirmation email has been sent to <strong>{formData.email}</strong>.
            </p>

            <div className="order-summary-box">
              <h4>Order Breakdown</h4>
              <p>Items: {cart.length} item type(s)</p>
              <p>Total Paid: <strong>${grandTotal.toFixed(2)}</strong></p>
              <p>Estimated Delivery: <strong>3-5 Business Days</strong></p>
            </div>

            <button className="btn btn-primary btn-large" onClick={handleFinish}>
              Return to Store
            </button>
          </div>
        ) : (
          <div className="checkout-form-container">
            <h2>Checkout</h2>

            <div className="checkout-grid">
              <form onSubmit={handleSubmit} className="checkout-form">
                <section className="form-section">
                  <h3>1. Shipping Details</h3>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? 'input-error' : ''}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Street Address</label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? 'input-error' : ''}
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="San Francisco"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'input-error' : ''}
                      />
                      {errors.city && <span className="error-text">{errors.city}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        id="state"
                        type="text"
                        name="state"
                        placeholder="CA"
                        value={formData.state}
                        onChange={handleChange}
                        className={errors.state ? 'input-error' : ''}
                      />
                      {errors.state && <span className="error-text">{errors.state}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code</label>
                      <input
                        id="zipCode"
                        type="text"
                        name="zipCode"
                        placeholder="94105"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={errors.zipCode ? 'input-error' : ''}
                      />
                      {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                    </div>
                  </div>
                </section>

                <section className="form-section">
                  <h3>2. Payment Method</h3>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      id="cardNumber"
                      type="text"
                      name="cardNumber"
                      placeholder="4532 •••• •••• 8892"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={errors.cardNumber ? 'input-error' : ''}
                    />
                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cardExpiry">Expiry Date</label>
                      <input
                        id="cardExpiry"
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className={errors.cardExpiry ? 'input-error' : ''}
                      />
                      {errors.cardExpiry && <span className="error-text">{errors.cardExpiry}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cardCvc">CVC</label>
                      <input
                        id="cardCvc"
                        type="text"
                        name="cardCvc"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        className={errors.cardCvc ? 'input-error' : ''}
                      />
                      {errors.cardCvc && <span className="error-text">{errors.cardCvc}</span>}
                    </div>
                  </div>
                </section>

                <button type="submit" className="btn btn-primary btn-large btn-submit-order">
                  Complete Order (${grandTotal.toFixed(2)})
                </button>
              </form>

              <div className="checkout-summary-sidebar">
                <h3>Order Summary</h3>
                <div className="checkout-items-preview">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="checkout-item-row">
                      <span>{product.title} (x{quantity})</span>
                      <span>${(product.price * quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="checkout-totals-box">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total Due</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
