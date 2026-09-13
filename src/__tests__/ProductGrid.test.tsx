import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductGrid } from '../components/ProductGrid';
import { Product } from '../types';
import { CartProvider } from '../context/CartContext';

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Wireless Headphones',
    price: 99.99,
    description: 'Great headphones',
    category: 'Electronics',
    image: 'data:image/svg+xml;utf8,<svg></svg>',
    rating: { rate: 4.5, count: 10 },
    inStock: true,
  },
  {
    id: '2',
    title: 'Cotton T-Shirt',
    price: 25.00,
    description: 'Soft t-shirt',
    category: 'Apparel',
    image: 'data:image/svg+xml;utf8,<svg></svg>',
    rating: { rate: 4.0, count: 5 },
    inStock: true,
  },
];

describe('ProductGrid Component', () => {
  it('renders list of products', () => {
    const setSelectedCategory = vi.fn();
    const setSortBy = vi.fn();

    render(
      <CartProvider>
        <ProductGrid
          products={mockProducts}
          selectedCategory="All"
          setSelectedCategory={setSelectedCategory}
          sortBy="featured"
          setSortBy={setSortBy}
          searchQuery=""
        />
      </CartProvider>
    );

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Cotton T-Shirt')).toBeInTheDocument();
  });

  it('triggers category selection on click', () => {
    const setSelectedCategory = vi.fn();
    const setSortBy = vi.fn();

    render(
      <CartProvider>
        <ProductGrid
          products={mockProducts}
          selectedCategory="All"
          setSelectedCategory={setSelectedCategory}
          sortBy="featured"
          setSortBy={setSortBy}
          searchQuery=""
        />
      </CartProvider>
    );

    const electronicsPill = screen.getByRole('tab', { name: 'Electronics' });
    fireEvent.click(electronicsPill);
    expect(setSelectedCategory).toHaveBeenCalledWith('Electronics');
  });

  it('renders empty state when no products match', () => {
    const setSelectedCategory = vi.fn();
    const setSortBy = vi.fn();

    render(
      <CartProvider>
        <ProductGrid
          products={[]}
          selectedCategory="All"
          setSelectedCategory={setSelectedCategory}
          sortBy="featured"
          setSortBy={setSortBy}
          searchQuery="NonexistentProduct"
        />
      </CartProvider>
    );

    expect(screen.getByText('No products found')).toBeInTheDocument();
  });
});
