import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';
import { Product } from '../types';

const testProduct: Product = {
  id: 'test-1',
  title: 'Test Audio Headphones',
  price: 100.00,
  description: 'High quality test headphones',
  category: 'Electronics',
  image: 'data:image/svg+xml;utf8,<svg></svg>',
  rating: { rate: 4.5, count: 10 },
  inStock: true,
};

const testProduct2: Product = {
  id: 'test-2',
  title: 'Test Leather Wallet',
  price: 50.00,
  description: 'Durable wallet',
  category: 'Accessories',
  image: 'data:image/svg+xml;utf8,<svg></svg>',
  rating: { rate: 4.0, count: 5 },
  inStock: true,
};

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext State & Operations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.grandTotal).toBe(0);
  });

  it('adds items to the cart and calculates subtotal, tax, shipping, and total count', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(testProduct, 1);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.totalCount).toBe(1);
    expect(result.current.subtotal).toBe(100);
    // Subtotal = 100 (<= 100 so shipping is 0 since subtotal > 100 or subtotal === 0 -> shipping is 9.99 for <= 100)
    expect(result.current.tax).toBe(8.00);
    expect(result.current.shipping).toBe(9.99);
    expect(result.current.grandTotal).toBe(117.99);
  });

  it('increments quantity when adding identical product', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(testProduct, 1);
      result.current.addToCart(testProduct, 2);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.totalCount).toBe(3);
    expect(result.current.subtotal).toBe(300);
    // Subtotal > 100 -> shipping is 0
    expect(result.current.shipping).toBe(0);
  });

  it('updates item quantity and removes item when quantity set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(testProduct, 2);
    });
    expect(result.current.totalCount).toBe(2);

    act(() => {
      result.current.updateQuantity(testProduct.id, 5);
    });
    expect(result.current.totalCount).toBe(5);

    act(() => {
      result.current.updateQuantity(testProduct.id, 0);
    });
    expect(result.current.cart.length).toBe(0);
    expect(result.current.totalCount).toBe(0);
  });

  it('removes item from cart and clears cart completely', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(testProduct, 1);
      result.current.addToCart(testProduct2, 1);
    });
    expect(result.current.cart.length).toBe(2);

    act(() => {
      result.current.removeFromCart(testProduct.id);
    });
    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].product.id).toBe(testProduct2.id);

    act(() => {
      result.current.clearCart();
    });
    expect(result.current.cart).toEqual([]);
  });
});
