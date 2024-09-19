// components/__tests__/ActiveChannel.test.js
import { render, waitFor } from '@testing-library/react';
import ActiveChannel from '../useActiveChannel'; // Adjust this import path as necessary
import { pusherClient } from '@/lib/pusher'; // Mock pusherClient
import useActiveList from '../useActiveList'; // Mock useActiveList

// Mock useActiveList to spy on its functions
jest.mock('../useActiveList', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    set: jest.fn(),
    add: jest.fn(),
    remove: jest.fn(),
  })),
}));

// Mock pusherClient
jest.mock('@/lib/pusher', () => ({
  pusherClient: {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  },
}));

describe('ActiveChannel component', () => {
  let mockChannel;

  beforeEach(() => {
    // Create a mock channel with bind/unbind functions
    mockChannel = {
      bind: jest.fn(),
      unbind: jest.fn(),
    };
    pusherClient.subscribe.mockReturnValue(mockChannel); // pusherClient returns mock channel
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  test('subscribes to the presence-online channel and binds to events', async () => {
    render(<ActiveChannel />);

    // Ensure pusherClient subscribes to the correct channel
    expect(pusherClient.subscribe).toHaveBeenCalledWith('presence-online');
    
    // Ensure events are bound correctly
    expect(mockChannel.bind).toHaveBeenCalledWith('pusher:subscription_succeeded', expect.any(Function));
    expect(mockChannel.bind).toHaveBeenCalledWith('pusher:member_added', expect.any(Function));
    expect(mockChannel.bind).toHaveBeenCalledWith('pusher:member_removed', expect.any(Function));
  });

  test('unsubscribes from the presence-online channel on cleanup', async () => {
    const { unmount } = render(<ActiveChannel />);

    // Unmount the component
    unmount();

    // Ensure pusherClient unsubscribes from the channel
    await waitFor(() => {
      expect(pusherClient.unsubscribe).toHaveBeenCalledWith('presence-online');
    });
  });

//   test('calls set, add, and remove functions when events are triggered', async () => {
//     const { set, add, remove } = useActiveList();

//     render(<ActiveChannel />);

//     // Mock member data
//     const mockMembers = { each: jest.fn((cb) => cb({ id: 'member1' })) };
//     const mockNewMember = { id: 'member2' };
//     const mockRemovedMember = { id: 'member3' };

//     // Simulate pusher events
//     const subscriptionSucceededCallback = mockChannel.bind.mock.calls.find(call => call[0] === 'pusher:subscription_succeeded')[1];
//     subscriptionSucceededCallback(mockMembers); // Simulate subscription succeeded event

//     const memberAddedCallback = mockChannel.bind.mock.calls.find(call => call[0] === 'pusher:member_added')[1];
//     memberAddedCallback(mockNewMember); // Simulate member added event

//     const memberRemovedCallback = mockChannel.bind.mock.calls.find(call => call[0] === 'pusher:member_removed')[1];
//     memberRemovedCallback(mockRemovedMember); // Simulate member removed event

//     // Assert that the respective functions are called
//     expect(set).toHaveBeenCalledWith(['member1']); // Set the initial members
//     expect(add).toHaveBeenCalledWith('member2'); // Add the new member
//     expect(remove).toHaveBeenCalledWith('member3'); // Remove the member
//   });
});
