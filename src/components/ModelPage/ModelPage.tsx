'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import '@/components/styles/CommunicationWindow.scss';
import { useGetModelQuery } from '@/store/api/modelApi';
interface Message {
  id: number;
  sender: 'user' | 'model';
  text: string;
  file?: File;
}

export default function CommunicationWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesUser, setMessagesUser ] = useState<Message[]>([])
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const task = searchParams.get('task');
  const initializedRef = useRef(false);
  const lastMessageIdRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: modelResponse, refetch } = useGetModelQuery(messagesUser);

  useEffect(() => {
    if (task && !initializedRef.current) {
      const initialMessage: Message = {
        id: 1,
        sender: 'user',
        text: task,
      };
      setMessages([initialMessage]);
      setMessagesUser([initialMessage])
      initializedRef.current = true;
      refetch();
    }
  }, [task, refetch]);

  useEffect(() => {
    if (modelResponse) {
      const modelMessage: Message = {
        id: messages.length + 1,
        sender: 'model',
        text: modelResponse.answer,
      };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);
      setIsSending(false);
    }
  }, [modelResponse]);

  const sendMessage = async () => {
    if (input.trim() === '' && !file) return;
    if (isSending) return;

    setIsSending(true);

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim(),
      file: file || undefined,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessagesUser((prevMessages) => [...prevMessages, newMessage]);
    // Отправка запроса на сервер
    const prompt = input.trim();

    setInput('');
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
      <div className="chat-container">
        <h1>Communication with Model</h1>
        <div className="chat-window">
          {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <p>{message.text}</p>
                {message.file && (
                    <a href={URL.createObjectURL(message.file)} download={message.file.name}>
                      {message.file.name}
                    </a>
                )}
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
          <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
          />
          {file && (
              <div className="file-preview">
                <span>{file.name}</span>
                <button onClick={removeFile}>Remove</button>
              </div>
          )}
          <button onClick={sendMessage} disabled={isSending}>Send</button>
          <button onClick={() => router.back()} className="back-button">Вернуться назад к задачам</button>
        </div>
      </div>
  );
}
