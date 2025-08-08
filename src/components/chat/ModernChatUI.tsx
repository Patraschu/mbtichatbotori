'use client';

import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Send, ArrowLeft } from 'lucide-react';
import { ChatMessage, ChatbotConfig } from '@/types/chatbot';
import { ChatBubble } from './ChatBubble';

interface ModernChatUIProps {
  botName: string;
  botProfile: string;
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onGoBack: () => void;
  config: ChatbotConfig;
}

const TypingIndicator: React.FC<{ relationship: string, botProfile: React.ReactNode }> = ({ relationship, botProfile }) => {
  const isHesitating = relationship === 'crush';

  return (
    <div className="flex items-end space-x-3 mb-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
        {botProfile}
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className={`flex items-center space-x-1.5 ${isHesitating ? 'animate-pulse' : ''}`}>
          <span className={`w-2 h-2 bg-gray-400 rounded-full ${!isHesitating ? 'animate-bounce' : ''}`} style={{ animationDelay: '0ms' }}></span>
          <span className={`w-2 h-2 bg-gray-400 rounded-full ${!isHesitating ? 'animate-bounce' : ''}`} style={{ animationDelay: '150ms' }}></span>
          <span className={`w-2 h-2 bg-gray-400 rounded-full ${!isHesitating ? 'animate-bounce' : ''}`} style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
};

export const ModernChatUI: React.FC<ModernChatUIProps> = ({
  botName,
  botProfile,
  messages,
  isTyping,
  onSendMessage,
  onGoBack,
  config,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const shouldShowDateSeparator = (currentMsg: ChatMessage, prevMsg: ChatMessage | null) => {
    if (!prevMsg) return true;
    const currentDate = new Date(currentMsg.timestamp).toDateString();
    const prevDate = new Date(prevMsg.timestamp).toDateString();
    return currentDate !== prevDate;
  };

  const botProfileNode = <span className="text-2xl">{botProfile}</span>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-0 md:p-4">
      <div className="flex flex-col w-full max-w-lg h-full bg-gray-200 shadow-2xl md:rounded-2xl overflow-hidden">
        {/* Header */}
        <header className="flex items-center p-4 border-b border-gray-300 sticky top-0 z-10 bg-gray-200/80 backdrop-blur-sm">
          <button onClick={onGoBack} className="p-2 mr-2 rounded-full hover:bg-gray-300 text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full text-2xl">
              {botProfileNode}
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">{botName}</h2>
            </div>
          </div>
          <div className="flex-grow" />
        </header>

        {/* Messages Area */}
        <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-1">
            {messages.map((message, index) => {
              const prevMessage = index > 0 ? messages[index - 1] : null;
              const showDateSep = shouldShowDateSeparator(message, prevMessage);

              return (
                <React.Fragment key={message.id}>
                  {showDateSep && (
                    <div className="text-center my-4">
                      <span className="px-3 py-1 bg-gray-300 text-xs text-gray-600 rounded-full">
                        {format(new Date(message.timestamp), 'yyyy년 M월 d일 EEEE', { locale: ko })}
                      </span>
                    </div>
                  )}
                  <ChatBubble 
                    message={message} 
                    isBot={message.sender === 'bot'}
                    botProfile={botProfileNode}
                  />
                </React.Fragment>
              );
            })}
            {isTyping && (
              <TypingIndicator 
                relationship={config.relationship}
                botProfile={botProfileNode}
              />
            )}
          </div>
          <div ref={messagesEndRef} />
        </main>

        {/* Input Area */}
        <footer className="p-4 border-t border-gray-300 bg-white">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              rows={1}
              className="w-full bg-gray-100 text-gray-900 border-none rounded-lg py-3 pl-4 pr-12 resize-none focus:ring-2 focus:ring-blue-500 transition-all custom-scrollbar placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-blue-500 rounded-full text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};