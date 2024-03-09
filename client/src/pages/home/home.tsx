import React, { useState } from 'react';
import './home.css'; // Import CSS file for styling

interface Message {
  id: number;
  text: string;
  user?: boolean;
  bot?: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I assist you today?" }
  ]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to the chat
    setMessages([
      ...messages,
      { id: messages.length + 1, text: inputValue, user: true }
    ]);

    // Clear the input field
    setInputValue('');
    
    // Simulate bot response after 1 second
    setTimeout(() => {
      setMessages([
        ...messages,
        { id: messages.length + 2, text: "I'm just a simple chatbot. I don't have real intelligence :)", bot: true }
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot">
      <div className="header">
        <h1>MediMind</h1>
      </div>
      <div className="content">
        <div className="chatbot-tabs">
          {/* Tabs for previous chats */}
          {/* Replace this with your tabs component */}
          <div className="tab">Chat 1</div>
          <div className="tab">Chat 2</div>
          <div className="tab">Chat 3</div>
        </div>
        <div className="chatbot-messages">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.user ? 'user' : 'bot'}`}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleMessageSubmit} className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
