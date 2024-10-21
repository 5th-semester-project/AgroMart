import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FrontFullProducts from '../frontFullProduct'; // Update the import path
import getSearchProducts from '@/actions/get-searchProduct';
import SearchBar from '@/components/searchbar';

// Mock the necessary imports
jest.mock('@/components/ui/heading', () => ({
  __esModule: true,
  default: ({ title, description }) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));


jest.mock('../../actions/get-searchProduct', () => jest.fn());


jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock('@/components/searchbar', () => ({
  __esModule: true,
  default: ({ onSearch }) => (
    <button onClick={() => onSearch('New York', 'Electronics')}>Search</button>
  ),
}));

jest.mock('@/components/buyer-components/highest-descounted-products', () => ({
  __esModule: true,
  default: ({ products }) => (
    <div>
      {products.map((product, index) => (
        <div key={index}>Product: {product.name}</div>
      ))}
    </div>
  ),
}));

jest.mock('@/components/buyer-components/store-list', () => ({
  __esModule: true,
  default: ({ plist }) => (
    <div>
      {plist.map((store, index) => (
        <div key={index}>Store: {store.name}</div>
      ))}
    </div>
  ),
}));

jest.mock('../filterComponents', () => ({
  __esModule: true,
  default: ({ products }) => (
    <div>
      {products.map((product, index) => (
        <div key={index}>Filtered Product: {product.name}</div>
      ))}
    </div>
  ),
}));

describe('FrontFullProducts', () => {
  const initialProduct = [
    { name: 'Product 1' },
    { name: 'Product 2' },
  ];
  const topSelling = [
    { name: 'Top Selling Product 1' },
    { name: 'Top Selling Product 2' },
  ];
  const stores = [
    { name: 'Store 1' },
    { name: 'Store 2' },
  ];

  beforeEach(() => {
    getSearchProducts.mockResolvedValue([
      { name: 'Filtered Product 1' },
      { name: 'Filtered Product 2' },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders top discounted products, top selling products, and stores when no search results are displayed', () => {
    render(<FrontFullProducts initialProduct={initialProduct} topSelling={topSelling} stores={stores} />);

    expect(screen.getByText('Top Discounted Products')).toBeInTheDocument();
    expect(screen.getByText('Product: Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product: Product 2')).toBeInTheDocument();

    expect(screen.getByText('Top selling Products')).toBeInTheDocument();
    expect(screen.getByText('Product: Top Selling Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product: Top Selling Product 2')).toBeInTheDocument();

    expect(screen.getByText('Top Performing Stores')).toBeInTheDocument();
    expect(screen.getByText('Store: Store 1')).toBeInTheDocument();
    expect(screen.getByText('Store: Store 2')).toBeInTheDocument();
  });

  it('shows search results when the search button is clicked', async () => {
    render(<FrontFullProducts initialProduct={initialProduct} topSelling={topSelling} stores={stores} />);

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Wait for the search results to be updated
    await waitFor(() => {
      expect(getSearchProducts).toHaveBeenCalledWith('New York', 'Electronics');
    });

    expect(screen.getByText('Filtered Product: Filtered Product 1')).toBeInTheDocument();
    expect(screen.getByText('Filtered Product: Filtered Product 2')).toBeInTheDocument();
  });

  it('clears search results when the clear button is clicked', async () => {
    render(<FrontFullProducts initialProduct={initialProduct} topSelling={topSelling} stores={stores} />);

    // Trigger search
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Wait for search results
    await waitFor(() => {
      expect(screen.getByText('Filtered Product: Filtered Product 1')).toBeInTheDocument();
    });

    // Click Clear Button
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    // Check that the search results are cleared and the original products are shown
    expect(screen.getByText('Top Discounted Products')).toBeInTheDocument();
    expect(screen.queryByText('Filtered Product: Filtered Product 1')).not.toBeInTheDocument();
  });
});
