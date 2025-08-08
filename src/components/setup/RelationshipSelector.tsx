'use client';

import React from 'react';
import { Relationship } from '@/types/chatbot';
import { RELATIONSHIPS } from '@/lib/constants/mbti';

interface RelationshipSelectorProps {
  selectedRelationship: Relationship | null;
  onSelect: (relationship: Relationship) => void;
}

export const RelationshipSelector: React.FC<RelationshipSelectorProps> = ({ 
  selectedRelationship, 
  onSelect 
}) => {
  const relationshipColors = {
    lover: { gradient: 'from-red-400 to-pink-600', light: 'from-red-50 to-pink-100', icon: 'bg-red-500' },
    friend: { gradient: 'from-green-400 to-emerald-600', light: 'from-green-50 to-emerald-100', icon: 'bg-green-500' },
    parent: { gradient: 'from-blue-400 to-indigo-600', light: 'from-blue-50 to-indigo-100', icon: 'bg-blue-500' },
    child: { gradient: 'from-yellow-400 to-orange-600', light: 'from-yellow-50 to-orange-100', icon: 'bg-yellow-500' },
    crush: { gradient: 'from-purple-400 to-pink-600', light: 'from-purple-50 to-pink-100', icon: 'bg-purple-500' },
    colleague: { gradient: 'from-gray-400 to-gray-600', light: 'from-gray-50 to-gray-100', icon: 'bg-gray-500' }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-5xl mx-auto">
        {RELATIONSHIPS.map((relationship) => {
          const isSelected = selectedRelationship === relationship.type;
          const colors = relationshipColors[relationship.type as keyof typeof relationshipColors];
          
          return (
            <button
              key={relationship.type}
              onClick={() => onSelect(relationship.type)}
              className={`
                relative group p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 transform text-left
                ${isSelected
                  ? 'scale-105 shadow-xl sm:shadow-2xl'
                  : 'hover:scale-105 hover:shadow-xl'
                }
              `}
            >
              <div className={`
                absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.gradient}
                ${isSelected ? 'opacity-90' : 'opacity-0 group-hover:opacity-10'}
                transition-opacity duration-300
              `}></div>
              
              <div className={`
                absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.light}
                ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                transition-opacity duration-300
              `}></div>
              
              <div className={`
                absolute inset-0 rounded-3xl border-2 transition-colors duration-300
                ${isSelected ? 'border-transparent' : 'border-gray-200 group-hover:border-gray-300'}
              `}></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                <div className={`
                  w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300
                  ${isSelected
                    ? `${colors.icon} text-white shadow-lg scale-110`
                    : 'bg-gray-100 group-hover:bg-gray-200 group-hover:scale-105'
                  }
                `}>
                  <span className="text-2xl sm:text-2xl md:text-3xl filter drop-shadow">{relationship.emoji}</span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className={`font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2 transition-colors duration-300 ${
                    isSelected ? 'text-gray-900' : 'text-gray-800'
                  }`}>
                    {relationship.name}
                  </h3>
                  <p className={`text-xs sm:text-sm mb-1 sm:mb-2 leading-relaxed transition-colors duration-300 hidden sm:block ${
                    isSelected ? 'text-gray-700' : 'text-gray-600'
                  }`}>
                    {relationship.description}
                  </p>
                  <p className={`text-[10px] sm:text-xs leading-relaxed transition-colors duration-300 hidden md:block ${
                    isSelected ? 'text-gray-600' : 'text-gray-500'
                  }`}>
                    {relationship.talkingStyle}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedRelationship && (
        <div className="glass-effect rounded-3xl p-8 shadow-xl max-w-5xl mx-auto">
          {(() => {
            const selectedData = RELATIONSHIPS.find(r => r.type === selectedRelationship);
            if (!selectedData) return null;
            const colors = relationshipColors[selectedRelationship as keyof typeof relationshipColors];
            
            return (
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${colors.icon} flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl text-white filter drop-shadow">{selectedData.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-gray-900">
                      {selectedData.name} 관계
                    </h3>
                    <p className="text-gray-600 font-medium">{selectedData.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/50 rounded-2xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                      대화 스타일
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedData.talkingStyle}
                    </p>
                  </div>
                  
                  <div className="bg-white/50 rounded-2xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                      대화 예시
                    </h4>
                    <div className="space-y-2">
                      {selectedData.examples.map((example, index) => (
                        <div
                          key={index}
                          className="bg-white/80 p-3 rounded-xl text-gray-700 text-sm border border-gray-100"
                        >
                          “{example}”
                        </div>
                      ))}
                    </div>
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