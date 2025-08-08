'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ChatbotConfig } from '@/types/chatbot';
import { Loader2, AlertTriangle } from 'lucide-react';

// ChatInterface를 동적으로 임포트하고 SSR을 비활성화합니다.
const DynamicChatInterface = dynamic(
  () => import('@/components/chat/ChatInterface').then(mod => mod.ChatInterface),
  { 
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">채팅 환경을 불러오는 중...</p>
      </div>
    )
  }
);

export default function ChatPage() {
  const router = useRouter();
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('chatbotConfig');
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      } else {
        // 설정이 없으면 설정 페이지로 리다이렉트
        router.push('/setup');
      }
    } catch (e) {
      console.error('설정 불러오기 실패:', e);
      setError('채팅 설정을 불러오는 데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">설정을 확인하는 중...</p>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
        <div className="text-center bg-card p-8 rounded-lg shadow-lg border border-border">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">오류</h2>
          <p className="text-muted-foreground mb-6">{error || '챗봇 설정을 찾을 수 없습니다.'}</p>
          <button
            onClick={() => router.push('/setup')}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            설정 페이지로 이동
          </button>
        </div>
      </div>
    );
  }

  return <DynamicChatInterface config={config} />;
}
