'use client';

import React from 'react';
import { Gender } from '@/types/chatbot';

interface GenderSelectorProps {
  selectedGender: Gender | null;
  onSelect: (gender: Gender) => void;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({ selectedGender, onSelect }) => {
  const genderOptions = [
    {
      value: 'male' as Gender,
      label: '남성',
      emoji: '👨',
      description: '남성적인 언어 스타일과 호칭을 사용합니다',
      gradient: 'from-blue-400 to-blue-600',
      lightGradient: 'from-blue-50 to-blue-100'
    },
    {
      value: 'female' as Gender,
      label: '여성',
      emoji: '👩',
      description: '여성적인 언어 스타일과 호칭을 사용합니다',
      gradient: 'from-pink-400 to-pink-600',
      lightGradient: 'from-pink-50 to-pink-100'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {genderOptions.map((option) => {
          const isSelected = selectedGender === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`
                relative group p-8 rounded-3xl transition-all duration-300 transform
                ${isSelected
                  ? 'scale-105 shadow-2xl'
                  : 'hover:scale-105 hover:shadow-xl'
                }
              `}
            >
              <div className={`
                absolute inset-0 rounded-3xl bg-gradient-to-br ${option.gradient}
                ${isSelected ? 'opacity-90' : 'opacity-0 group-hover:opacity-10'}
                transition-opacity duration-300
              `}></div>
              
              <div className={`
                absolute inset-0 rounded-3xl bg-gradient-to-br ${option.lightGradient}
                ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                transition-opacity duration-300
              `}></div>
              
              <div className={`
                absolute inset-0 rounded-3xl border-2 transition-colors duration-300
                ${isSelected ? 'border-transparent' : 'border-gray-200 group-hover:border-gray-300'}
              `}></div>
              
              <div className="relative z-10 text-center">
                <div className={`
                  w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center
                  transition-all duration-300 ${isSelected
                    ? 'bg-white shadow-lg scale-110'
                    : 'bg-gray-50 group-hover:bg-white group-hover:shadow-md group-hover:scale-105'
                  }
                `}>
                  <span className="text-6xl">{option.emoji}</span>
                </div>
                <div className={`font-bold text-2xl mb-3 transition-colors duration-300 ${
                  isSelected ? 'text-gray-900' : 'text-gray-800'
                }`}>
                  {option.label}
                </div>
                <div className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isSelected ? 'text-gray-700' : 'text-gray-600'
                }`}>
                  {option.description}
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedGender && (
        <div className="glass-effect rounded-3xl p-8 shadow-xl max-w-3xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
                <span className="text-4xl">{selectedGender === 'male' ? '👨' : '👩'}</span>
              </div>
              <div>
                <h3 className="font-bold text-2xl text-gray-900">
                  {selectedGender === 'male' ? '남성' : '여성'} 캐릭터
                </h3>
                <p className="text-gray-600 font-medium">성별이 선택되었습니다</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {selectedGender === 'male' 
                ? '남성스러운 언어 패턴과 호칭을 사용하여 더욱 자연스러운 대화를 나눌 수 있습니다. 캐릭터는 남성적인 표현과 말투로 대화합니다.'
                : '여성스러운 언어 패턴과 호칭을 사용하여 더욱 자연스러운 대화를 나눌 수 있습니다. 캐릭터는 여성적인 표현과 말투로 대화합니다.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};