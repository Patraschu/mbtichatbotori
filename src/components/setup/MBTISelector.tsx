'use client';

import React from 'react';
import { MBTIType } from '@/types/chatbot';
import { MBTI_TYPES } from '@/lib/constants/mbti';

interface MBTISelectorProps {
  selectedMBTI: MBTIType | null;
  onSelect: (mbti: MBTIType) => void;
}

export const MBTISelector: React.FC<MBTISelectorProps> = ({ selectedMBTI, onSelect }) => {
  const mbtiGroups = [
    { title: '분석가형', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'], color: 'from-purple-400 to-purple-600' },
    { title: '외교관형', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'], color: 'from-green-400 to-green-600' },
    { title: '관리자형', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], color: 'from-blue-400 to-blue-600' },
    { title: '탐험가형', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'], color: 'from-yellow-400 to-yellow-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {MBTI_TYPES.map((mbti) => {
          const isSelected = selectedMBTI === mbti.type;
          // 각 MBTI 타입에 맞는 그룹 찾기
          const group = mbtiGroups.find(g => g.types.includes(mbti.type));
          const groupColor = group?.color || 'from-gray-400 to-gray-600';
          
          return (
            <button
              key={mbti.type}
              onClick={() => onSelect(mbti.type)}
              className={`
                relative group p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform
                ${isSelected
                  ? 'scale-105 shadow-xl ring-2 sm:ring-4 ring-yellow-400 ring-opacity-50'
                  : 'hover:scale-105 hover:shadow-lg'
                }
              `}
            >
              <div className={`
                absolute inset-0 rounded-2xl bg-gradient-to-br ${groupColor}
                ${isSelected ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'}
                transition-opacity duration-300
              `}></div>
              
              <div className={`
                absolute inset-0 rounded-2xl border-2 transition-colors duration-300
                ${isSelected ? 'border-yellow-400' : 'border-gray-200 group-hover:border-gray-300'}
              `}></div>
              
              <div className="relative z-10 text-center">
                <div className={`text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1 transition-transform duration-300 ${
                  isSelected ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  {mbti.emoji}
                </div>
                <div className={`font-bold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 ${
                  isSelected ? 'text-gray-900' : 'text-gray-800'
                }`}>
                  {mbti.type}
                </div>
                <div className={`text-[10px] sm:text-xs font-medium ${
                  isSelected ? 'text-gray-700' : 'text-gray-500'
                } line-clamp-1`}>
                  {mbti.name}
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* MBTI 그룹 범례 제거 */}

      {selectedMBTI && (
        <div className="glass-effect rounded-3xl p-8 shadow-xl">
          {(() => {
            const selectedMBTIData = MBTI_TYPES.find(m => m.type === selectedMBTI);
            if (!selectedMBTIData) return null;
            
            return (
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
                    <span className="text-3xl filter drop-shadow">{selectedMBTIData.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-gray-900">
                      {selectedMBTIData.type}
                    </h3>
                    <p className="text-gray-600 font-medium">{selectedMBTIData.name}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  {selectedMBTIData.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                      주요 특성
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMBTIData.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-700 text-sm rounded-full border border-yellow-200 font-medium"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                      대화 스타일
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMBTIData.talkingStyle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};