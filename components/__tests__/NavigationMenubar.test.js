import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import {NavigationMenubar} from '../mainNav-fontpage';
import watchCart from '@/hooks/watchlistStore';
import useCart from '@/hooks/addtocardStore';

// Mock the external hooks and dependencies
jest.mock('@clerk/clerk-react', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/watchlistStore', () => jest.fn());
jest.mock('@/hooks/addtocardStore', () => jest.fn());

describe('NavigationMenubar', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ userId: 'test-user-id' });
    useRouter.mockReturnValue({ push: jest.fn() });
    watchCart.mockReturnValue({ items: [] });
    useCart.mockReturnValue({ items: [] });
  });

  it('renders menu items when user is authenticated', () => {
    render(<NavigationMenubar />);

    // Check for menu items
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Watch List')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('renders account links properly', () => {
    render(<NavigationMenubar />);

    // Open the Account menu
    fireEvent.click(screen.getByText('Account'));

    // Check account options
    expect(screen.getByText('Login to Seller Account')).toBeInTheDocument();
    expect(screen.getByText('Login to Buyer Account')).toBeInTheDocument();
  });

  it('navigates to orders when Orders is clicked', () => {
    const mockPush = useRouter().push;

    render(<NavigationMenubar />);

    // Simulate clicking Orders
    fireEvent.click(screen.getByText('Orders'));

    // Check if push was called with the correct route
    expect(mockPush).toHaveBeenCalledWith('/orders/test-user-id');
  });
});
