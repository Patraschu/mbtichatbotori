'use client';

import React from 'react';
import { ChatMessage } from '@/types/chatbot';

interface ChatBubbleProps {
  message: ChatMessage;
  isBot: boolean;
  botProfile: React.ReactNode;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isBot, botProfile }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date));
  };

  const bubbleClasses = isBot
    ? 'bg-white border border-gray-200'
    : 'bg-yellow-300';
  
  const alignmentClasses = isBot
    ? 'items-start'
    : 'items-end';

  const bubbleRadius = isBot
    ? 'rounded-2xl rounded-tl-sm'
    : 'rounded-2xl rounded-tr-sm';

  const textColor = isBot ? 'text-gray-800' : 'text-black';

  const timeAndReadStatus = (
    <div className={`relative text-xs text-gray-400 ${isBot ? 'ml-2' : 'mr-2'}`}>
      {!isBot && !message.isRead && (
        <span className="absolute -top-3 right-0 font-bold text-yellow-500">1</span>
      )}
      <span className="whitespace-nowrap">{formatTime(message.timestamp)}</span>
    </div>
  );

  return (
    <div className={`flex w-full mb-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex flex-row items-end max-w-[85%]`}>
        {isBot && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-3">
            {botProfile}
          </div>
        )}
        
        {!isBot && timeAndReadStatus}
        
        <div className={`${bubbleClasses} ${bubbleRadius} px-4 py-2 shadow-sm`}>
          <p className={`${textColor} text-base leading-relaxed whitespace-pre-wrap`}>
            {message.content}
          </p>
        </div>

        {isBot && timeAndReadStatus}
      </div>
    </div>
  );
};