'use client';

import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Send, MoreVertical, Search, Menu, Phone, Video } from 'lucide-react';
import { ChatMessage } from '@/types/chatbot';

interface KakaoChatProps {
  botName: string;
  botProfile: string;
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
}

export const KakaoChat: React.FC<KakaoChatProps> = ({
  botName,
  botProfile,
  messages,
  isTyping,
  onSendMessage
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showTimestamp, setShowTimestamp] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

  const formatMessageTime = (date: Date) => {
    return format(date, 'a h:mm', { locale: ko });
  };

  const formatDateSeparator = (date: Date) => {
    return format(date, 'yyyy년 M월 d일 EEEE', { locale: ko });
  };

  const shouldShowDateSeparator = (currentMsg: ChatMessage, prevMsg: ChatMessage | null) => {
    if (!prevMsg) return true;
    const currentDate = new Date(currentMsg.timestamp).toDateString();
    const prevDate = new Date(prevMsg.timestamp).toDateString();
    return currentDate !== prevDate;
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <div className="kakao-profile bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-md">
                {botProfile}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-sm sm:text-base">{botName}</h2>
              <p className="text-xs text-green-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                온라인
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95 hidden sm:block">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95">
            <Phone className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95 hidden sm:block">
            <Video className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95">
            <MoreVertical className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="chat-messages"
      >
        {messages.map((message, index) => {
          const prevMessage = index > 0 ? messages[index - 1] : null;
          const showDateSep = shouldShowDateSeparator(message, prevMessage);
          const isConsecutive = prevMessage && 
            prevMessage.sender === message.sender && 
            !showDateSep;

          return (
            <React.Fragment key={message.id}>
              {showDateSep && (
                <div className="flex items-center justify-center my-6">
                  <span className="px-4 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs text-gray-600">
                    {formatDateSeparator(new Date(message.timestamp))}
                  </span>
                </div>
              )}
              
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${!isConsecutive ? 'mt-4' : 'mt-1'}`}>
                {message.sender === 'bot' && !isConsecutive && (
                  <div className="kakao-profile bg-gradient-to-br from-yellow-400 to-yellow-500 mr-2 flex-shrink-0">
                    {botProfile}
                  </div>
                )}
                
                {message.sender === 'bot' && isConsecutive && (
                  <div className="w-10 mr-2" />
                )}

                <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {message.sender === 'bot' && !isConsecutive && (
                    <span className="text-xs text-gray-600 mb-1 ml-1">{botName}</span>
                  )}
                  
                  <div className={`flex items-center ${message.sender === 'user' ? 'flex-row' : 'flex-row'} ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.sender === 'user' && (
                      <div className="relative mr-2">
                        {!message.isRead && (
                          <span className="absolute -top-3 right-0 text-xs text-yellow-700 font-bold">1</span>
                        )}
                        <span className="kakao-chat-time whitespace-nowrap">
                          {formatMessageTime(new Date(message.timestamp))}
                        </span>
                      </div>
                    )}
                    
                    <div
                      className={`kakao-chat-bubble chat-bubble-enter ${
                        message.sender === 'user' 
                          ? 'bg-[#FEE500] text-black' 
                          : 'bg-white text-black shadow-sm'
                      }`}
                      onClick={() => setShowTimestamp(showTimestamp === message.id ? null : message.id)}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                    
                    {message.sender === 'bot' && (
                      <div className="relative ml-2">
                        <span className="kakao-chat-time whitespace-nowrap">
                          {formatMessageTime(new Date(message.timestamp))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        
        {isTyping && (
          <div className="flex items-start">
            <div className="kakao-profile bg-gradient-to-br from-yellow-400 to-yellow-500 mr-2">
              {botProfile}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-600 mb-1 ml-1">{botName}</span>
              <div className="kakao-chat-bubble bg-white shadow-sm">
                <div className="typing-indicator">
                  <div className="typing-dot" style={{ animationDelay: '0ms' }}></div>
                  <div className="typing-dot" style={{ animationDelay: '150ms' }}></div>
                  <div className="typing-dot" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* 추가 기능 버튼 */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          
          {/* 입력 필드 */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="kakao-input w-full pr-10 sm:pr-12 text-sm sm:text-base"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          
          {/* 녹음 버튼 (모바일) */}
          <button
            className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
            onClick={() => setIsRecording(!isRecording)}
          >
            <svg className={`w-5 h-5 ${isRecording ? 'text-red-500' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
            </svg>
          </button>
          
          {/* 전송 버튼 */}
          <button
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            className={`p-2.5 sm:p-3 rounded-full transition-all transform active:scale-95 ${
              inputMessage.trim() 
                ? 'bg-[#FEE500] hover:bg-[#FACE00] text-black shadow-lg hover:shadow-xl hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        {/* 퀸 팁 */}
        <div className="flex items-center justify-between mt-2 px-2 text-xs text-gray-500">
          <span>💡 Tip: Enter키로 빠르게 전송할 수 있어요</span>
          <span>{messages.length}개의 메시지</span>
        </div>
      </div>
    </div>
  );
};