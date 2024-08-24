import { renderHook, act } from '@testing-library/react-hooks';
import useCart from '../addtocardStore';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('useCart Store', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with an empty cart', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual([]);
  });

  test('should add an item to the cart', () => {
    const { result } = renderHook(() => useCart());
    const newItem = { id: '1', name: 'Item 1' };

    act(() => {
      result.current.addItem(newItem);
    });

    expect(result.current.items).toContainEqual(newItem);
    expect(toast.success).toHaveBeenCalledWith('Item added to the cart');
  });

  test('should not add an existing item to the cart', () => {
    const { result } = renderHook(() => useCart());
    const newItem = { id: '1', name: 'Item 1' };

    act(() => {
      result.current.addItem(newItem);
      result.current.addItem(newItem); // Trying to add the same item again
    });

    expect(result.current.items).toContainEqual(newItem);
    expect(toast.error).toHaveBeenCalledWith('Item already exists in the cart');
  });

  test('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCart());
    const newItem = { id: '1', name: 'Item 1' };

    act(() => {
      result.current.addItem(newItem);
      result.current.removeItem('1');
    });

    expect(result.current.items).not.toContainEqual(newItem);
    expect(toast.success).toHaveBeenCalledWith('Item removed from the cart');
  });

  test('should remove all items from the cart', () => {
    const { result } = renderHook(() => useCart());
    const newItem1 = { id: '1', name: 'Item 1' };
    const newItem2 = { id: '2', name: 'Item 2' };

    act(() => {
      result.current.addItem(newItem1);
      result.current.addItem(newItem2);
      result.current.removeAll();
    });

    expect(result.current.items).toEqual([]);
  });
});
