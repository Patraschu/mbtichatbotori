'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MBTIType, Gender, Relationship, ChatbotConfig } from '@/types/chatbot';
import { MBTISelector } from './MBTISelector';
import { GenderSelector } from './GenderSelector';
import { RelationshipSelector } from './RelationshipSelector';
import { RELATIONSHIPS } from '@/lib/constants/mbti';
import { clearChatMessages } from '@/lib/utils/message';

interface SetupWizardProps {
  onComplete: (config: ChatbotConfig) => void;
}

export const SetupWizard: React.FC<SetupWizardProps> = ({ onComplete }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<Partial<ChatbotConfig>>({});
  const [showSummary, setShowSummary] = useState(false);

  // 로컬 스토리지에서 이전 설정 불러오기
  useEffect(() => {
    const savedConfig = localStorage.getItem('chatbotConfigDraft');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setConfig(parsed);
    }
  }, []);

  // 설정 변경 시 임시 저장
  useEffect(() => {
    if (Object.keys(config).length > 0) {
      localStorage.setItem('chatbotConfigDraft', JSON.stringify(config));
    }
  }, [config]);

  const steps = [
    { title: 'MBTI 선택', description: '챗봇의 성격 유형을 선택해주세요. 선택한 유형에 따라 대화 스타일이 달라집니다. (예: ENFP는 활발하고 친근한 말투, INTJ는 논리적이고 분석적인 말투를 사용합니다.)' },
    { title: '성별 선택', description: '챗봇의 성별을 선택해주세요' },
    { title: '관계 설정', description: '챗봇과의 관계를 선택해주세요' }
  ];

  const handleMBTISelect = (mbti: MBTIType) => {
    setConfig(prev => ({ ...prev, mbti }));
  };

  const handleGenderSelect = (gender: Gender) => {
    setConfig(prev => ({ ...prev, gender }));
  };

  const handleRelationshipSelect = (relationship: Relationship) => {
    setConfig(prev => ({ ...prev, relationship }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return config.mbti != null;
      case 2:
        return config.gender != null;
      case 3:
        return config.relationship != null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // 모든 설정이 완료된 경우
      if (config.mbti && config.gender && config.relationship) {
        const finalConfig: ChatbotConfig = {
          mbti: config.mbti,
          gender: config.gender,
          relationship: config.relationship
        };
        clearChatMessages(); // 새로운 대화 시작 전 기존 메시지 삭제
        onComplete(finalConfig);
        router.push('/chat');
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <MBTISelector
            selectedMBTI={config.mbti || null}
            onSelect={handleMBTISelect}
          />
        );
      case 2:
        return (
          <GenderSelector
            selectedGender={config.gender || null}
            onSelect={handleGenderSelect}
          />
        );
      case 3:
        return (
          <RelationshipSelector
            selectedRelationship={config.relationship || null}
            onSelect={handleRelationshipSelect}
          />
        );
      default:
        return null;
    }
  };

  const getHeaderText = () => {
    const parts = [];
    if (currentStep >= 1 && config.mbti) {
      parts.push(config.mbti);
    }
    if (currentStep >= 2 && config.gender) {
      parts.push(config.gender === 'male' ? '남성' : '여성');
    }
    if (currentStep >= 3 && config.relationship) {
      const relationshipName = RELATIONSHIPS.find(r => r.type === config.relationship)?.name;
      parts.push(relationshipName);
    }
    
    if (parts.length > 0) {
      return <span className="text-green-600 font-medium">{parts.filter(Boolean).join(' · ')}</span>;
    }
    
    return '설정을 시작해주세요';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* 상단 헤더 */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">메인으로</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {getHeaderText()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="relative">
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all duration-500 transform
                    ${currentStep > index + 1
                      ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg scale-110'
                      : currentStep === index + 1
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg scale-125'
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }
                  `}>
                    {currentStep > index + 1 ? (
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-lg">{index + 1}</span>
                    )}
                  </div>
                  {currentStep === index + 1 && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                    </div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className="relative w-24 mx-2">
                    <div className="absolute inset-0 h-1 bg-gray-200 rounded-full top-1/2 -translate-y-1/2"></div>
                    <div className={`
                      absolute inset-0 h-1 rounded-full top-1/2 -translate-y-1/2 transition-all duration-500
                      ${currentStep > index + 1 ? 'bg-gradient-to-r from-green-400 to-green-500' : ''}
                    `} style={{
                      width: currentStep > index + 1 ? '100%' : '0%'
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2 sm:mb-3 gradient-text">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-gray-600 font-medium">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="glass-effect rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 mb-16 sm:mb-20 md:mb-24 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-10"></div>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center sticky bottom-0 bg-white/80 backdrop-blur-md p-4 -mx-6 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            {currentStep === 1 ? (
              <Link
                href="/"
                className="group flex items-center space-x-2 px-6 py-3 rounded-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 hover:shadow-lg"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>홈으로</span>
              </Link>
            ) : (
              <button
                onClick={handlePrevious}
                className="group flex items-center space-x-2 px-6 py-3 rounded-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 hover:shadow-lg"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>이전</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {config.mbti && config.gender && config.relationship && (
              <button
                onClick={() => {
                  setConfig({});
                  setCurrentStep(1);
                }}
                className="px-6 py-3 rounded-full text-gray-600 hover:text-gray-900 font-medium transition-all duration-200"
              >
                처음부터 다시
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`
                group flex items-center space-x-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform
                ${!canProceed()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:shadow-2xl hover:scale-105 hover:from-yellow-500 hover:to-yellow-600'
                }
              `}
            >
              <span>{currentStep === 3 ? '채팅 시작하기' : '다음'}</span>
              <svg className={`w-5 h-5 transition-transform ${canProceed() ? 'group-hover:translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* 설정 요약 모달 */}
      {showSummary && config.mbti && config.gender && config.relationship && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">설정 확인</h3>
            <div className="space-y-4 mb-6">
              <div>
                <span className="text-gray-600">MBTI:</span>
                <span className="ml-2 font-bold text-gray-900">{config.mbti}</span>
              </div>
              <div>
                <span className="text-gray-600">성별:</span>
                <span className="ml-2 font-bold text-gray-900">{config.gender === 'male' ? '남성' : '여성'}</span>
              </div>
              <div>
                <span className="text-gray-600">관계:</span>
                <span className="ml-2 font-bold text-gray-900">{RELATIONSHIPS.find(r => r.type === config.relationship)?.name}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSummary(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-full font-medium hover:bg-gray-50 text-gray-700"
              >
                다시 설정
              </button>
              <button
                onClick={() => {
                  if (config.mbti && config.gender && config.relationship) {
                    const finalConfig: ChatbotConfig = {
                      mbti: config.mbti,
                      gender: config.gender,
                      relationship: config.relationship
                    };
                    clearChatMessages(); // 새로운 대화 시작 전 기존 메시지 삭제
                    onComplete(finalConfig);
                    localStorage.removeItem('chatbotConfigDraft');
                    router.push('/chat');
                  }
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-bold hover:shadow-xl"
              >
                채팅 시작
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};