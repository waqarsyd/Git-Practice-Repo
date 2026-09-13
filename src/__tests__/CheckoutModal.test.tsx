import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { CheckoutModal } from '../components/CheckoutModal';
import { CartProvider, useCart } from '../context/CartContext';
import { Product } from '../types';

const testProduct: Product = {
  id: 'test-1',
  title: 'Wireless Headphones',
  price: 99.99,
  description: 'Great headphones',
  category: 'Electronics',
  image: 'data:image/svg+xml;utf8,<svg></svg>',
  rating: { rate: 4.5, count: 10 },
  inStock: true,
};

const SetupCheckout: React.FC = () => {
  const { addToCart, setIsCheckoutOpen } = useCart();
  return (
    <div>
      <button onClick={() => { addToCart(testProduct, 1); setIsCheckoutOpen(true); }}>
        Open Checkout
      </button>
      <CheckoutModal />
    </div>
  );
};

describe('CheckoutModal Component', () => {
  it('displays checkout form when open and validates input fields', () => {
    render(
      <CartProvider>
        <SetupCheckout />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Open Checkout'));

    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();

    // Click Complete Order without filling form
    fireEvent.click(screen.getByText(/Complete Order/i));

    expect(screen.getByText('Full Name is required')).toBeInTheDocument();
    expect(screen.getByText('Valid Email is required')).toBeInTheDocument();
  });

  it('completes order flow when valid data is entered', () => {
    render(
      <CartProvider>
        <SetupCheckout />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Open Checkout'));

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Alice Smith' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Market St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'San Francisco' } });
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'CA' } });
    fireEvent.change(screen.getByLabelText('ZIP Code'), { target: { value: '94105' } });
    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '4532123456789012' } });
    fireEvent.change(screen.getByLabelText('Expiry Date'), { target: { value: '12/28' } });
    fireEvent.change(screen.getByLabelText('CVC'), { target: { value: '888' } });

    fireEvent.click(screen.getByText(/Complete Order/i));

    expect(screen.getByText('Order Confirmed!')).toBeInTheDocument();
    expect(screen.getByText(/Alice Smith/)).toBeInTheDocument();
  });
});
