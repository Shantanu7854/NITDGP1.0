import React, { useState } from 'react';
import Logo from "@/components/custom/logo";
import './home.css'; // Import CSS file for styling
import botImage from '@/assets/bot_image.png';


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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to the chat
    setMessages([
      ...messages,
      { id: messages.length + 1, text: inputValue, user: true }
    ]);

    // Clear the input field and selected image
    setInputValue('');
    setSelectedImage(null);
    
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
        <div className="inline-block">
          <Logo />
        </div>
      </div>
      <div className="content">
        <div className="chatbot-tabs" >
          
          <img src={botImage} alt="Bot Image" />
          <h1 className="ml-10 text-2xl">Your Health Buddy</h1>
        </div>

        <div className="chatbot-messages">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.user ? 'user' : 'bot'}`}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleMessageSubmit} className="chatbot-input flex">
        <input
          type="text" className='prompt'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..." 
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedImage(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
