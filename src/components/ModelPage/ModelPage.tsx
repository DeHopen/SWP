'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import '@/components/styles/CommunicationWindow.scss';

interface Message {
  id: number;
  sender: 'user' | 'model';
  text: string;
}

export default function CommunicationWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const searchParams = useSearchParams();
  const task = searchParams.get('task');
  const initializedRef = useRef(false); // Using ref to track initialization status

  useEffect(() => {
    if (task && !initializedRef.current) {
      console.log('Initializing with task:', task);
      const initialMessage: Message = {
        id: 1,
        sender: 'user',
        text: task,
      };
      setMessages([initialMessage]);
      initializedRef.current = true;
      simulateModelResponse(1);
    }
  }, [task]);

  const simulateModelResponse = (lastMessageId: number) => {
    console.log('simulateModelResponse called with lastMessageId:', lastMessageId);
    setTimeout(() => {
      const modelResponse: Message = {
        id: lastMessageId + 1,
        sender: 'model',
        text: 'This is a response from the model.',
      };
      console.log('Adding model response:', modelResponse);
      setMessages((prevMessages) => [...prevMessages, modelResponse]);
    }, 1000);
  };

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim(),
    };

    console.log('Sending message:', newMessage);
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      simulateModelResponse(newMessage.id);
      return updatedMessages;
    });

    setInput('');
  };

  return (
      <div className="chat-container">
        <h1>Communication with Model</h1>
        <div className="chat-window">
          {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <p>{message.text}</p>
              </div>
          ))}
        </div>
        <div className="chat-input">
          <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
  );
}
