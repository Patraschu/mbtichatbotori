'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChatbotConfig } from '@/types/chatbot';
import { getMBTIByType, getRelationshipByType } from '@/lib/constants/mbti';

interface ChatHeaderProps {
  config: ChatbotConfig;
  isOnline?: boolean;
  isTyping?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  config, 
  isOnline = true, 
  isTyping = false 
}) => {
  const router = useRouter();
  const mbtiData = getMBTIByType(config.mbti);
  const relationshipData = getRelationshipByType(config.relationship);

  const getBotName = () => {
    if (config.name) return config.name;
    
    const genderName = config.gender === 'male' ? '남자' : '여자';
    return `${mbtiData?.name || config.mbti} ${genderName}`;
  };

  const getStatusText = () => {
    if (isTyping) return '입력 중...';
    if (isOnline) return '온라인';
    return '오프라인';
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 봇 정보 */}
      <div className="flex-1 mx-4">
        <div className="flex items-center space-x-3">
          {/* 프로필 이미지 */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {mbtiData?.emoji || '🤖'}
              </span>
            </div>
            {/* 온라인 상태 표시 */}
            <div className={`
              absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white
              ${isOnline ? 'bg-green-400' : 'bg-gray-400'}
            `} />
          </div>

          {/* 이름과 상태 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {getBotName()}
              </h2>
              <span className="text-sm">
                {relationshipData?.emoji}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <p className={`text-sm ${isTyping ? 'text-blue-500' : 'text-gray-500'}`}>
                {getStatusText()}
              </p>
              {isTyping && (
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 메뉴 버튼 */}
      <div className="flex items-center space-x-2">
        <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};