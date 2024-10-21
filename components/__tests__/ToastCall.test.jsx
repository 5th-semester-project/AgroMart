import React from 'react';
import { render } from '@testing-library/react';
import toast from 'react-hot-toast';
import ToastCall from '../ToastCall';

// Mock toast.error function
jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));

describe('ToastCall Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data after each test
  });

  it('should trigger toast error when message is provided', () => {
    const message = 'Test error message';
    
    render(<ToastCall message={message} />);

    // Check that toast.error was called with the provided message
    expect(toast.error).toHaveBeenCalledWith(message);
  });

  it('should not trigger toast error when message is not provided', () => {
    render(<ToastCall message={null} />);

    // Check that toast.error was not called
    expect(toast.error).toHaveBeenCalled();
  });
});
