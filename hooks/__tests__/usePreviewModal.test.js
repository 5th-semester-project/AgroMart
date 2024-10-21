// components/__tests__/useBuyerModal.test.js
import { act } from '@testing-library/react';
import useBuyerModal from '../useBuyerModal'; // Adjust the path as necessary

describe('useBuyerModal Zustand store', () => {
  // Ensure Zustand store is reset before each test
  beforeEach(() => {
    const { onClose } = useBuyerModal.getState(); // Close modal to ensure consistent state
    act(() => {
      onClose(); // Ensure the modal is closed at the start of each test
    });
  });

  test('should have isOpen set to false initially', () => {
    const { isOpen } = useBuyerModal.getState();
    expect(isOpen).toBe(false); // Initially, the modal should be closed
  });

  test('should open the modal when onOpen is called', () => {
    const { onOpen } = useBuyerModal.getState();
    
    act(() => {
      onOpen(); // Open the modal
    });

    const { isOpen } = useBuyerModal.getState();
    expect(isOpen).toBe(true); // The modal should now be open
  });

  test('should close the modal when onClose is called', () => {
    const { onOpen, onClose } = useBuyerModal.getState();
    
    act(() => {
      onOpen(); // Open the modal
    });
    expect(useBuyerModal.getState().isOpen).toBe(true); // Ensure it is open

    act(() => {
      onClose(); // Close the modal
    });
    
    expect(useBuyerModal.getState().isOpen).toBe(false); // The modal should now be closed
  });
});
