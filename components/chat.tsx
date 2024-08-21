"use client";

import React, { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bot } from 'lucide-react';

interface Message {
  sender: string;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const userMessage: Message = { sender: 'User', text: userInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('/api/chat', { userInput });
      const botMessage: Message = { sender: 'AgroMart Bot', text: response.data.response };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setUserInput('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatboxRef.current && !chatboxRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 w-[350px] z-[123456]">
      {isChatOpen && (
        <div className="fixed bottom-[60px] right-5 flex flex-col bg-gray-100 w-full max-w-[350px] h-[450px] shadow-lg rounded-t-2xl transition-all ease-in-out duration-500 z-[123456]" ref={chatboxRef}>
          <div className="flex items-center bg-gradient-to-r from-green-700 to-green-500 p-4 rounded-t-2xl text-white shadow-md">
            <div className="mr-2">
              <img src="https://img.icons8.com/color/48/000000/tractor.png" alt="AgroMart Support" />
            </div>
            <div>
              <h4 className="text-lg">AgroMart Support</h4>
              <p className="text-sm">Hello! How can we assist you today?</p>
            </div>
          </div>
          <div className="mt-auto flex-1 p-2.5 overflow-y-auto bg-white">
            {messages.map((msg, index) => (
              <div key={index} className={`mt-2.5 p-2 rounded-2xl max-w-[60.6%] w-fit animate-fadeIn ${msg.sender === 'User' ? 'bg-green-700 text-white ml-auto rounded-tr-[10px] rounded-tl-[15px] rounded-bl-[10px] max-w-[70%] text-right' : 'text-left bg-green-500 text-white mr-auto rounded-tr-[15px] rounded-tl-[10px] rounded-br-[10px] max-w-[80%] w-fit'}`}>
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="sticky bottom-0 flex items-center bg-gradient-to-r from-green-700 to-green-500 p-5 shadow-md rounded-b-2xl">
            <input
              type="text"
              placeholder="Write a message..."
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-1 p-2.5 rounded-full border-none mr-2.5"
            />
            <button onClick={sendMessage} className="bg-green-600 text-white p-2.5 rounded-full cursor-pointer transition-colors duration-300 hover:bg-green-700">Send</button>
          </div>
        </div>
      )}
      <div className="fixed bottom-2.5 right-5 w-[50px] h-[50px] bg-green-700 text-white rounded-[15px_25px_0_25px] cursor-pointer transition-colors duration-300 flex items-center justify-center shadow-lg hover:bg-green-800">
        <button onClick={toggleChat}><Bot /></button>
      </div>
    </div>
  );
};

export default Chat;
