import { nanoid } from 'nanoid';
import { ChatMessage } from '@/types/chatbot';

export const generateChatMessage = (
  content: string,
  sender: 'user' | 'bot'
): ChatMessage => {
  return {
    id: nanoid(),
    content,
    sender,
    timestamp: new Date(),
    isRead: sender === 'user' ? false : true
  };
};

export const saveChatMessages = (messages: ChatMessage[]) => {
  localStorage.setItem('chatMessages', JSON.stringify(messages));
};

export const loadChatMessages = (): ChatMessage[] => {
  try {
    const saved = localStorage.getItem('chatMessages');
    if (saved) {
      const messages = JSON.parse(saved);
      // Date 객체로 변환
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
  } catch (error) {
    console.error('Failed to load chat messages:', error);
  }
  return [];
};

export const clearChatMessages = () => {
  localStorage.removeItem('chatMessages');
};

// 외향형의 첫 메시지를 저장
export const saveInitialBotMessage = (message: ChatMessage) => {
  const messages = loadChatMessages();
  messages.push(message);
  saveChatMessages(messages);
};