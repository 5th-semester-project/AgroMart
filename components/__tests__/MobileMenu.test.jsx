import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import MobileMenu from '../mobile-menubar'; // Ensure the import path is correct
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

// Mock the external hooks and components
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
  usePathname: jest.fn(), // Mock usePathname
}));

jest.mock('@/lib/utils', () => ({
  cn: jest.fn(),
}));

jest.mock('@clerk/nextjs', () => ({
  UserButton: jest.fn(() => <div>UserButton</div>),
}));

jest.mock('lucide-react', () => ({
  Menu: jest.fn(() => <div>Menu</div>),
  SquareKanban: jest.fn(() => <div>SquareKanban</div>),
  Folders: jest.fn(() => <div>Folders</div>),
  PackagePlus: jest.fn(() => <div>PackagePlus</div>),
  ShoppingCart: jest.fn(() => <div>ShoppingCart</div>),
  MessageCircle: jest.fn(() => <div>MessageCircle</div>),
  Settings: jest.fn(() => <div>Settings</div>),
}));

jest.mock('@radix-ui/react-slot', () => ({
  Slot: ({ children }) => <div>{children}</div>,
}));

jest.mock('@radix-ui/react-popper', () => ({
  Popper: ({ children }) => <div>{children}</div>,
}));

jest.mock('@radix-ui/react-menu', () => ({
  Menu: ({ children }) => <div>{children}</div>,
}));

jest.mock('@radix-ui/react-dropdown-menu', () => ({
  DropdownMenu: ({ children }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }) => <div>{children}</div>,
  DropdownMenuItem: ({ children }) => <div>{children}</div>,
  DropdownMenuLabel: ({ children }) => <div>{children}</div>,
  DropdownMenuSeparator: () => <div>Separator</div>,
  DropdownMenuGroup: ({ children }) => <div>{children}</div>,
}));

describe('MobileMenu', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ storeId: 'test-store-id' });
    useRouter.mockReturnValue({ push: jest.fn() });
    usePathname.mockReturnValue('/test-store-id/overview'); // Set default pathname
  });

  afterEach(() => {
    cleanup(); // Clean up after each test to avoid test leakage
  });

  it('renders menu items with correct labels and icons', () => {
    render(<MobileMenu />);

    // Debug the rendered output (optional, remove in production)
    screen.debug(); 

    // Check for menu items
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders active state for current route', () => {
    // Mock usePathname to return the current route
    usePathname.mockReturnValue('/test-store-id/orders');

    render(<MobileMenu />);

    // Check for active menu item
    expect(screen.getByText('Orders')).toHaveClass('text-black dark:text-white');
  });

  it('should open the dropdown menu when the trigger is clicked', () => {
    render(<MobileMenu />);

    // Click on the menu trigger
    fireEvent.click(screen.getByText('Menu'));

    // Check if dropdown menu content is visible
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('should display the user button', () => {
    render(<MobileMenu />);

    // Check if UserButton component is rendered
    expect(screen.getByText('UserButton')).toBeInTheDocument();
  });
});
