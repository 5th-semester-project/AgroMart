import { render, screen, waitFor } from '@testing-library/react';
import NavBar from '@/components/navbar';
import { auth } from '@clerk/nextjs/server';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

// Mock dependencies
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));
jest.mock('@/lib/prismadb', () => ({
  Store: {
    findFirst: jest.fn(),
  },
}));

jest.mock('@/components/mainNavbar', () => <div>MainNavbar Mock</div>);
jest.mock('@/components/mobile-menubar', ()  => <div>MobileMenu Mock</div>);
jest.mock('@/components/ui/themeToggle', () => ({
  ModeToggle: () => <div>ModeToggle Mock</div>,
}));
jest.mock('@clerk/nextjs', () => ({
  UserButton: () => <div>UserButton Mock</div>,
}));
jest.mock('lucide-react', () => ({
  StoreIcon: () => <div>StoreIcon Mock</div>,
}));

describe('NavBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to /sign-in if user is not authenticated', async () => {
    auth.mockResolvedValueOnce({ userId: null });

    render(<NavBar />);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/sign-in');
    });
  });

  it('should display store name if user is authenticated and store is found', async () => {
    auth.mockResolvedValueOnce({ userId: 'user123' });
    prismadb.Store.findFirst.mockResolvedValueOnce({ name: 'My Store' });

    render(<NavBar />);

    await waitFor(() => {
      expect(screen.getByText('My Store')).toBeInTheDocument();
    });
  });

  it('should render the main navigation and user button when authenticated', async () => {
    auth.mockResolvedValueOnce({ userId: 'user123' });
    prismadb.Store.findFirst.mockResolvedValueOnce({ name: 'My Store' });

    render(<NavBar />);

    await waitFor(() => {
      expect(screen.getByText('MainNavbar Mock')).toBeInTheDocument();
      expect(screen.getByText('UserButton Mock')).toBeInTheDocument();
    });
  });

  it('should render the mobile menu on small screens', async () => {
    auth.mockResolvedValueOnce({ userId: 'user123' });
    prismadb.Store.findFirst.mockResolvedValueOnce({ name: 'My Store' });

    render(<NavBar />);

    await waitFor(() => {
      expect(screen.getByText('MobileMenu Mock')).toBeInTheDocument();
    });
  });
});
