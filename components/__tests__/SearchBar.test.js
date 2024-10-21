import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the "toBeInTheDocument" matcher
import SearchBar from '../searchbar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders SearchBar with location and category dropdowns', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // Check if the location and category dropdowns are rendered
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    
    // Check if the search button is rendered
    expect(screen.getByText(/Search Products/i)).toBeInTheDocument();
  });

  test('allows user to select a location and category', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // Simulate selecting a location
    fireEvent.mouseDown(screen.getByLabelText(/Location/i));
    fireEvent.click(screen.getByText('Colombo'));
    expect(screen.getByLabelText(/Location/i)).toHaveTextContent('Colombo');

    // Simulate selecting a category
    fireEvent.mouseDown(screen.getByLabelText(/Category/i));
    fireEvent.click(screen.getByText('Crops'));
    expect(screen.getByLabelText(/Category/i)).toHaveTextContent('Crops');
  });

  test('calls onSearch with correct parameters when Search button is clicked', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // Simulate selecting a location and category
    fireEvent.mouseDown(screen.getByLabelText(/Location/i));
    fireEvent.click(screen.getByText('Galle'));
    fireEvent.mouseDown(screen.getByLabelText(/Category/i));
    fireEvent.click(screen.getByText('Livestock'));

    // Simulate clicking the search button
    fireEvent.click(screen.getByText(/Search Products/i));

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Galle', 'Livestock');
    });
  });

  test('displays loading state and disables search button during search', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // Simulate clicking the search button
    fireEvent.click(screen.getByText(/Search Products/i));

    // Expect the button to be disabled during loading
    expect(screen.getByText(/Search Products/i)).toBeDisabled();

    // Mock the async search completion
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalled();
    });

    // After search completes, expect the button to be enabled again
    expect(screen.getByText(/Search Products/i)).not.toBeDisabled();
  });
});
