import { Product } from '../types';

const createSvgDataUrl = (bg: string, fg: string, icon: string, label: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="${bg}"/>
    <circle cx="200" cy="170" r="70" fill="${fg}" opacity="0.15"/>
    <text x="200" y="180" font-family="system-ui, sans-serif" font-size="64" text-anchor="middle" fill="${fg}">${icon}</text>
    <text x="200" y="290" font-family="system-ui, sans-serif" font-size="20" font-weight="600" text-anchor="middle" fill="${fg}">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Wireless Noise-Canceling Headphones',
    price: 249.99,
    description: 'Immerse yourself in crystal-clear audio with advanced active noise cancellation and up to 30 hours of battery life.',
    category: 'Electronics',
    image: createSvgDataUrl('#3B82F6', '#FFFFFF', '🎧', 'Noise-Canceling Headphones'),
    rating: { rate: 4.8, count: 142 },
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-2',
    title: 'Minimalist Mechanical Keyboard',
    price: 129.50,
    description: 'Compact 75% wireless mechanical keyboard featuring custom hot-swappable switches and RGB backlighting.',
    category: 'Electronics',
    image: createSvgDataUrl('#10B981', '#FFFFFF', '⌨️', 'Mechanical Keyboard'),
    rating: { rate: 4.6, count: 89 },
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-3',
    title: 'Organic Cotton Oxford Shirt',
    price: 68.00,
    description: 'Crafted from 100% certified organic cotton. Tailored fit designed for maximum comfort and effortless daily style.',
    category: 'Apparel',
    image: createSvgDataUrl('#8B5CF6', '#FFFFFF', '👔', 'Cotton Oxford Shirt'),
    rating: { rate: 4.5, count: 64 },
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-4',
    title: 'Ergonomic Mesh Office Chair',
    price: 319.00,
    description: 'Full-back ergonomic support with adjustable lumbar, 3D armrests, and breathable mesh fabric for long work sessions.',
    category: 'Home & Office',
    image: createSvgDataUrl('#F59E0B', '#FFFFFF', '🪑', 'Ergonomic Office Chair'),
    rating: { rate: 4.7, count: 210 },
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-5',
    title: 'Smart Fitness & Health Watch',
    price: 189.99,
    description: 'Track heart rate, sleep quality, GPS workouts, and daily metrics with an ultra-bright AMOLED display.',
    category: 'Electronics',
    image: createSvgDataUrl('#EC4899', '#FFFFFF', '⌚', 'Smart Fitness Watch'),
    rating: { rate: 4.4, count: 98 },
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-6',
    title: 'Insulated Stainless Steel Bottle (1L)',
    price: 34.99,
    description: 'Double-wall vacuum insulation keeps drinks ice-cold for 24 hours or piping hot for 12 hours.',
    category: 'Fitness & Outdoors',
    image: createSvgDataUrl('#06B6D4', '#FFFFFF', '🍶', 'Insulated Water Bottle'),
    rating: { rate: 4.9, count: 320 },
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-7',
    title: 'Genuine Leather Minimalist Wallet',
    price: 45.00,
    description: 'RFID-blocking slim leather wallet with quick-access card slots and durable full-grain leather construction.',
    category: 'Accessories',
    image: createSvgDataUrl('#D97706', '#FFFFFF', '👛', 'Leather Wallet'),
    rating: { rate: 4.3, count: 76 },
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-8',
    title: 'Pour-Over Ceramic Coffee Maker',
    price: 49.95,
    description: 'Artisanal ceramic pour-over dripper with heat-resistant borosilicate glass carafe for rich, flavorful brews.',
    category: 'Home & Office',
    image: createSvgDataUrl('#6366F1', '#FFFFFF', '☕', 'Pour-Over Coffee Maker'),
    rating: { rate: 4.8, count: 115 },
    inStock: false,
    featured: true,
  },
];

export const CATEGORIES = ['All', 'Electronics', 'Apparel', 'Home & Office', 'Fitness & Outdoors', 'Accessories'];
