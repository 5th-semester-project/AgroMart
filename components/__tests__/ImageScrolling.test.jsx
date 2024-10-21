import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CarouselPlugin from '@/components/ImageScrolling'; // Adjust the import path as needed
import '@testing-library/jest-dom'; // for extended matchers like toBeInTheDocument
import Autoplay from "embla-carousel-autoplay";

// Mock dependencies
jest.mock('embla-carousel-autoplay', () => jest.fn(() => ({
  stop: jest.fn(),
  reset: jest.fn(),
})));

jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }) => <div>{children}</div>,
  CarouselContent: ({ children }) => <div>{children}</div>,
  CarouselItem: ({ children }) => <div>{children}</div>,
}));

describe('CarouselPlugin Component', () => {
  it('should render images in the carousel', async () => {
    render(<CarouselPlugin />);

    // Check that images are rendered
    await waitFor(() => {
      expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
      expect(screen.getByAltText('Slide 2')).toBeInTheDocument();
    });

    // Check that the image elements have correct src attributes
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', '/bg-images/brownField.jpg');
    expect(images[1]).toHaveAttribute('src', '/bg-images/greenField.jpg');
  });
});
