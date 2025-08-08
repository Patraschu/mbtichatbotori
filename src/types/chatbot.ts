// MBTI 타입 정의
export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

// 성별 타입
export type Gender = 'male' | 'female';

// 관계 타입
export type Relationship = 'parent' | 'child' | 'lover' | 'crush' | 'friend' | 'colleague';

// 챗봇 설정
export interface ChatbotConfig {
  mbti: MBTIType;
  gender: Gender;
  relationship: Relationship;
  name?: string;
}

// 채팅 메시지
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  emotion?: string;
  isRead?: boolean;
}

// 채팅 세션
export interface ChatSession {
  id: string;
  botConfig: ChatbotConfig;
  messages: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
  isActive: boolean;
}

// MBTI 설명
export interface MBTIDescription {
  type: MBTIType;
  name: string;
  title: string;
  description: string;
  traits: string[];
  talkingStyle: string;
  emoji: string;
}

// 관계 설명
export interface RelationshipDescription {
  type: Relationship;
  name: string;
  description: string;
  talkingStyle: string;
  emoji: string;
  examples: string[];
}

// API 응답 타입
export interface ChatResponse {
  success: boolean;
  message?: ChatMessage;
  error?: string;
}

// 챗봇 상태
export interface ChatbotState {
  config: ChatbotConfig | null;
  currentSession: ChatSession | null;
  isTyping: boolean;
  isConnected: boolean;
}