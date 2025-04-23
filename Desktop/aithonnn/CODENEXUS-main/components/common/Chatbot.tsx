// components/common/Chatbot.tsx
"use client";

import React, { useState } from "react";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      console.log("Message is empty, please type something.");
      return;
    }

    // Add user's message to chat history
    setChatHistory([...chatHistory, `You: ${message}`]);
    setIsLoading(true);

    try {
      // Call the local API route
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }), // Ensure message is sent correctly
      });

      const data = await response.json();
      console.log("API response:", data); // Log the response for debugging

      if (response.ok) {
        setChatHistory((prev) => [...prev, `Bot: ${data.reply}`]);
      } else {
        throw new Error(data.error || "Failed to get response from API");
      }
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      setChatHistory((prev) => [...prev, `Bot: Sorry, I encountered an error. Please try again.`]);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-16 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => {
            console.log("Chat button clicked, opening chatbot.");
            setIsOpen(true);
          }}
          className="bg-[#6f7a4b] text-white p-4 rounded-full shadow-lg hover:bg-[#227562] transition"
        >
          Chat
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
          <div className="bg-[#227562] text-white p-2 rounded-t-lg flex justify-between">
            <span>CodeNexus Chatbot</span>
            <button
              onClick={() => {
                console.log("Closing chatbot.");
                setIsOpen(false);
              }}
              className="text-white hover:text-gray-200"
            >
              X
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {chatHistory.length === 0 ? (
              <p className="text-gray-500">Start the conversation!</p>
            ) : (
              chatHistory.map((msg, index) => (
                <p key={index} className="mb-2">
                  {msg}
                </p>
              ))
            )}
            {isLoading && <p className="text-gray-500">Bot is typing...</p>}
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type a message..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  console.log("Enter key pressed, sending message:", message);
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <button
              onClick={() => {
                console.log("Send button clicked, sending message:", message);
                handleSendMessage();
              }}
              className="mt-2 bg-[#6f7a4b] text-white p-2 rounded w-full hover:bg-[#227562] disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;