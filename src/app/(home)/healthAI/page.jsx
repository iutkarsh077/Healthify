"use client";
import { useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const HealthAI = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const MODEL_NAME = "gemini-1.0-pro-001";
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generationConfig,
            safetySettings,
            history: messages.map((msg) => ({
              text: msg.text,
              role: msg.role,
            })),
          });
        setChat(newChat);
      } catch (error) {
        console.log(error);
      }
    };
    initChat();
  }, []);

  const handleSendMessage = async () => {
    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (chat) {
        const result = await chat.sendMessage(userInput);
        const botMessage = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      {/* Add your content here if needed */}
    </div>
    <div style={{ flex: 1, overflowY: 'auto', borderRadius: '0.5rem', padding: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{ marginBottom: '1rem', textAlign: msg.role === 'user' ? 'right' : 'left' }}
        >
          <span style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: msg.role === 'user' ? '#3490dc' : '#edf2f7', color: msg.role === 'user' ? '#fff' : '#333' }}>
            {msg.text}
          </span>
          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: '#718096' }}>
            {msg.role === 'bot' ? 'Bot' : 'You'} - {msg.timestamp.toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
    {error && <div style={{ fontSize: '0.875rem', marginBottom: '1rem', color: '#e53e3e' }}>{error}</div>}
    <div style={{ position: 'fixed', right: 0, bottom: 0, left: 1, marginTop: '1rem', marginRight: '1rem', width: '100%', height: '3rem' }}>
      <input className="glassmorphism"
        style={{ flex: 1, borderRadius: '0.5rem 0 0 0.5rem', outline: 'none', border: 'none', padding: '0.5rem', width: '90%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
        type="text"
        placeholder="Type your message..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button 
        onClick={handleSendMessage}
        style={{ padding: '0.5rem 1rem', width: '10%', backgroundColor: '#00688B', borderRadius: '0 0.5rem 0.5rem 0', border: 'none', cursor: 'pointer' }}
      >
        Send
      </button>
    </div>
  </div>
  
  );
};

export default HealthAI;




/*
 <div className="flex flex-col h-screen p-4">
    <div className="flex-1 overflow-y-auto rounded-md p-2 shadow-md">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 gap-x-4 ${
            msg.role === "user" ? "text-right" : "text-left"
          }`}
        >
          <span className={`p-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
            {msg.text}
          </span>
          <p className="text-xs mt-1 text-gray-500">
            {msg.role === "bot" ? "Bot" : "You"} -{" "}
            {msg.timestamp.toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
    {error && <div className="text-sm mb-4 text-red-500">{error}</div>}
    <div className="fixed right-0 bottom-0 mt-4 mr-4 w-screen h-10">
      <input
        className="flex-1 rounded-l-md border glassmorphism p-2 w-4/5"
        type="text"
        placeholder="Type your message..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSendMessage} className="px-4 py-2 w-1/5 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600">
        Send
      </button>
    </div>
  </div>
  
*/ 