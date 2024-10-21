import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '@/components/buyer-components/Product-card';
import useCart from '@/hooks/addtocardStore';
import watchCart from '@/hooks/watchlistStore';
import usePreviewModal from '@/hooks/usePreviewModal';
import { useRouter } from 'next/router';

// Mock hooks
jest.mock('@/hooks/addtocardStore', () => ({
  __esModule: true,
  default: () => ({
    addItem: jest.fn(),
  }),
}));

jest.mock('@/hooks/watchlistStore', () => ({
  __esModule: true,
  default: () => ({
    addItem: jest.fn(),
  }),
}));

jest.mock('@/hooks/usePreviewModal', () => ({
  __esModule: true,
  default: () => ({
    open: jest.fn(),
  }),
}));

// mock useRouter
jest.mock('next/router', () => ({
    useRouter: jest.fn()
  }))
  
  // setup a new mocking function for push method
  const pushMock = jest.fn()
  
  // mock a return value on useRouter
  useRouter.mockReturnValue({
    query: {},
    // return mock for push method
    push: pushMock,
    // ... add the props or methods you need
  });

describe('ProductCard', () => {
  const product = {
    id: '1',
    name: 'Test Product',
    price: 100,
    discount: 20,
    imageUrls: [{ url: 'http://example.com/image.jpg' }],
    reviews: [{ rating: 4 }, { rating: 5 }],
    orderIds: ['order1', 'order2'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product card and details', () => {
    render(<ProductCard product={product} />);

    // Check if product name is rendered
    expect(screen.getByText(/test product/i)).toBeInTheDocument();

    // Check if price and discount price are rendered correctly
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/80/i)).toBeInTheDocument(); // discount applied

    // Check if discount badge is rendered
    expect(screen.getByText(/20%/i)).toBeInTheDocument();

    // Check if the image is rendered
    expect(screen.getByAltText(/product/i)).toHaveAttribute('src', 'http://example.com/image.jpg');
  });

  test('handles card click routing', () => {
    render(<ProductCard product={product} />);

    fireEvent.click(screen.getByRole('article')); // Clicks the card itself

    expect(useRouter().push).toHaveBeenCalledWith('/product/1');
  });

  test('handles add to cart button click', () => {
    const { addItem } = require('@/hooks/addtocardStore').default();

    render(<ProductCard product={product} />);

    fireEvent.click(screen.getAllByRole('button')[1]); // Clicks the add to cart button

    expect(addItem).toHaveBeenCalledWith(product);
  });

  test('handles add to watchlist button click', () => {
    const { addItem } = require('@/hooks/watchlistStore').default();

    render(<ProductCard product={product} />);

    fireEvent.click(screen.getAllByRole('button')[2]); // Clicks the add to watchlist button

    expect(addItem).toHaveBeenCalledWith(product);
  });

  test('handles preview button click', () => {
    const { open } = require('@/hooks/usePreviewModal').default();

    render(<ProductCard product={product} />);

    fireEvent.click(screen.getAllByRole('button')[0]); // Clicks the preview button

    expect(open).toHaveBeenCalledWith(product);
  });
});
