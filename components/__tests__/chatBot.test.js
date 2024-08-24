import { render, screen, fireEvent, act } from '@testing-library/react';
import Chat from '../chatBot';
import axios from 'axios';

jest.mock('axios');

describe('Chat Component', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('should render chat icon button', () => {
    render(<Chat />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should open and close chat window when icon button is clicked', () => {
    render(<Chat />);

    const chatIconButton = screen.getByRole('button');

    // Initially, the chat window should not be visible
    expect(screen.queryByPlaceholderText('Write a message...')).not.toBeInTheDocument();

    // Click the button to open the chat window
    fireEvent.click(chatIconButton);
    expect(screen.getByPlaceholderText('Write a message...')).toBeInTheDocument();

    // Click the button to close the chat window
    fireEvent.click(chatIconButton);
    expect(screen.queryByPlaceholderText('Write a message...')).not.toBeInTheDocument();
  });

  test('should add user message and bot response to chat', async () => {
    axios.post.mockResolvedValueOnce({ data: { response: 'Hello, User!' } });

    render(<Chat />);

    const chatIconButton = screen.getByRole('button');

    // Open the chat window
    fireEvent.click(chatIconButton);

    const input = screen.getByPlaceholderText('Write a message...');
    const sendButton = screen.getByText('Send');

    // Type a message
    fireEvent.change(input, { target: { value: 'Hi' } });

    // Click the send button
    await act(async () => {
      fireEvent.click(sendButton);
    });

    // Check if the user's message is in the chat
    expect(screen.getByText('User: Hi')).toBeInTheDocument();

    // Check if the bot's response is in the chat
    expect(await screen.findByText('AgroMart Bot: Hello, User!')).toBeInTheDocument();
  });

  test('should close the chat window when clicking outside', () => {
    render(<Chat />);

    const chatIconButton = screen.getByRole('button');

    // Open the chat window
    fireEvent.click(chatIconButton);
    expect(screen.getByPlaceholderText('Write a message...')).toBeInTheDocument();

    // Simulate a click outside the chat window
    fireEvent.mouseDown(document.body);

    // The chat window should be closed
    expect(screen.queryByPlaceholderText('Write a message...')).not.toBeInTheDocument();
  });
});
