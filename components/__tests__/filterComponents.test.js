import { render, screen, fireEvent } from '@testing-library/react';
import FilterComponents from '../FilterComponents';
import { productsMock } from '../__mocks__/productsMock';

jest.mock('lucide-react', () => ({
  Search: () => <svg />,
}));

describe('FilterComponents', () => {
  test('should render all products initially', () => {
    render(<FilterComponents products={productsMock} />);
    
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(productsMock.length);
  });

  test('should filter products by subcategory', () => {
    render(<FilterComponents products={productsMock} />);
    
    const selectTrigger = screen.getByLabelText('SubCategory');
    fireEvent.mouseDown(selectTrigger);
    const selectItem = screen.getByText('Fruits');
    fireEvent.click(selectItem);

    fireEvent.click(screen.getByText('Filter'));

    const filteredProductCards = screen.getAllByTestId('product-card');
    const expectedProducts = productsMock.filter(product => product.category.name === 'Fruits');
    expect(filteredProductCards.length).toBe(expectedProducts.length);
  });

  test('should filter products by rating', () => {
    render(<FilterComponents products={productsMock} />);
    
    const ratingTrigger = screen.getByLabelText('Ratings');
    fireEvent.mouseDown(ratingTrigger);
    const ratingItem = screen.getAllByText('1')[1]; // Adjusted to select the correct rating element
    fireEvent.click(ratingItem);

    fireEvent.click(screen.getByText('Filter'));

    const filteredProductCards = screen.getAllByTestId('product-card');
    const expectedProducts = productsMock.filter(product => {
      const avgRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;
      return avgRating >= 1;
    });
    expect(filteredProductCards.length).toBe(expectedProducts.length);
  });

  test('should filter products by price range', () => {
    render(<FilterComponents products={productsMock} />);
    
    const minPriceInput = screen.getByPlaceholderText('Min');
    const maxPriceInput = screen.getByPlaceholderText('Max');

    fireEvent.change(minPriceInput, { target: { value: 10 } });
    fireEvent.change(maxPriceInput, { target: { value: 20 } });

    fireEvent.click(screen.getByText('Filter'));

    const filteredProductCards = screen.getAllByTestId('product-card');
    const expectedProducts = productsMock.filter(product => product.price >= 10 && product.price <= 20);
    expect(filteredProductCards.length).toBe(expectedProducts.length);
  });

  test('should clear all filters', () => {
    render(<FilterComponents products={productsMock} />);

    // Apply some filters
    const ratingTrigger = screen.getByLabelText('Ratings');
    fireEvent.mouseDown(ratingTrigger);
    const ratingItem = screen.getAllByText('1')[1];
    fireEvent.click(ratingItem);

    fireEvent.click(screen.getByText('Filter'));

    // Clear filters
    fireEvent.click(screen.getByText('Clear'));

    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(productsMock.length);
  });

  test('should display "No Products Found" when no products match filters', () => {
    render(<FilterComponents products={productsMock} />);

    // Apply a filter that will return no products
    const minPriceInput = screen.getByPlaceholderText('Min');
    fireEvent.change(minPriceInput, { target: { value: 1000 } });

    fireEvent.click(screen.getByText('Filter'));

    expect(screen.getByText('No Products Found')).toBeInTheDocument();
  });
});
