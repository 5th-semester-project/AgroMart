import { render, screen, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';
import ActiveChannel from '../useActiveChannel';
import { pusherClient } from '@/lib/pusher';

// Mock the Pusher client
jest.mock('@/lib/pusher', () => ({
  pusherClient: {
    subscribe: jest.fn(),
    bind: jest.fn(),
    unsubscribe: jest.fn(),
  },
}));

describe('ActiveChannel', () => {
  const mockSubscribe = pusherClient.subscribe;
  const mockBind = pusherClient.bind;
  const mockUnsubscribe = pusherClient.unsubscribe;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('subscribes to the presence-online channel and sets up bindings', async () => {
    const mockChannel = {
      bind: jest.fn(),
      unbind: jest.fn(),
    };

    mockSubscribe.mockReturnValue(mockChannel);

    render(<ActiveChannel />);

    // Wait for the useEffect hook to run
    await waitFor(() => {
      expect(mockSubscribe).toHaveBeenCalledWith('presence-online');
      expect(mockChannel.bind).toHaveBeenCalledWith('pusher:subscription_succeeded', expect.any(Function));
      expect(mockChannel.bind).toHaveBeenCalledWith('pusher:member_added', expect.any(Function));
      expect(mockChannel.bind).toHaveBeenCalledWith('pusher:member_removed', expect.any(Function));
    });
  });

  test('cleans up subscriptions on unmount', () => {
    const mockChannel = {
      bind: jest.fn(),
      unbind: jest.fn(),
    };

    mockSubscribe.mockReturnValue(mockChannel);

    const { unmount } = render(<ActiveChannel />);

    // Simulate component unmount
    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledWith('presence-online');
  });
});
