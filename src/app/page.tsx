'use client';

import Link from 'next/link';
import { MessageCircle, ArrowRight, Bot } from 'lucide-react';

export default function HomePage() {
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
              href="/setup"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              채팅 시작하기
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6">
            <div className="inline-block p-3 bg-secondary rounded-full">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">
            AI 소울메이트와
            <br />
            <span className="text-primary">새로운 관계</span>를 시작하세요
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            당신의 MBTI와 원하는 상대의 MBTI를 선택하여,
            가장 잘 맞는 AI와 즉시 대화를 나눌 수 있습니다.
          </p>

          <Link
            href="/setup"
            className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50"
          >
            <span>무료로 시작하기</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 sm:p-6">
        <div className="max-w-6xl mx-auto text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MBTI-AI. All rights reserved.</p>
          <p className="mt-1">모든 대화는 AI에 의해 생성되며, 실제 인물이 아닙니다.</p>
        </div>
      </footer>
    </div>
  );
}

