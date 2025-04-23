import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`rounded-lg px-4 py-2 max-w-xs md:max-w-md ${
        message.sender === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-800'
      }`}>
        {message.text}
      </div>
    </div>
  );
};