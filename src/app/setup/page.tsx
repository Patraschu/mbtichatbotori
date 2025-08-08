'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, ArrowLeft } from 'lucide-react';
import { ChatbotConfig } from '@/types/chatbot';
import { SetupWizard } from '@/components/setup/SetupWizard';

export default function SetupPage() {
  const handleSetupComplete = (config: ChatbotConfig) => {
    // 로컬 스토리지에 설정 저장
    localStorage.setItem('chatbotConfig', JSON.stringify(config));
    console.log('챗봇 설정 완료:', config);
    // 설정 완료 후 자동으로 채팅 페이지로 이동할 수 있습니다.
    // window.location.href = '/chat';
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="p-4 sm:p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <Bot className="w-8 h-8 text-primary group-hover:animate-bounce" />
            <h1 className="text-xl font-bold tracking-tighter">MBTI-AI</h1>
          </Link>
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg text-sm hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <SetupWizard onComplete={handleSetupComplete} />
      </main>
    </div>
  );
}