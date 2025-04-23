export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }
  
  export interface ChatbotProps {
    initialMessages?: Message[];
    onSendMessage?: (message: string) => Promise<void>;
  }