import { render } from '@testing-library/react';
import ActiveStatus from '../ActiveStatus';
import useActiveChannel from '@/hooks/useActiveChannel';

// Mock the useActiveChannel hook
jest.mock('@/hooks/useActiveChannel');

describe('ActiveStatus', () => {
  it('should call useActiveChannel on render', () => {
    // Render the component
    render(<ActiveStatus />);
    
    // Check if the useActiveChannel hook was called
    expect(useActiveChannel).toHaveBeenCalled();
  });
});
