'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChatbotConfig, ChatMessage, ChatSession } from '@/types/chatbot';
import { MBTI_TYPES, RELATIONSHIPS } from '@/lib/constants/mbti';
import { ModernChatUI } from './ModernChatUI';
import { 
  generateChatMessage, 
  saveChatMessages, 
  loadChatMessages, 
  clearChatMessages 
} from '@/lib/utils/message';

interface ChatInterfaceProps {
  config: ChatbotConfig;
  initialSession?: ChatSession;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  config,
  initialSession 
}) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const welcomeMessageSent = useRef(false);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastBotMessageTimeRef = useRef<Date | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const silenceCountRef = useRef<number>(0); // 침묵 반응 횟수 추적
  const previousSilenceMessages = useRef<string[]>([]); // 이전 침묵 메시지 추적
  const messagesRef = useRef<ChatMessage[]>([]); // 최신 messages 상태 추적

  // messagesRef를 최신 상태로 유지
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // 초기 메시지 불러오기
  useEffect(() => {
    const savedMessages = loadChatMessages();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
      welcomeMessageSent.current = true; // 이미 대화가 시작된 경우
    } else if (initialSession?.messages) {
      setMessages(initialSession.messages);
    }
  }, [initialSession]);

  // 초기 인사 메시지 (한 번만 실행되도록 수정)
  useEffect(() => {
    if (messages.length === 0 && !welcomeMessageSent.current) {
      const welcomeMessage = generateWelcomeMessage();
      // welcomeMessage가 비어있지 않을 때만 메시지 전송
      if (welcomeMessage) {
        setTimeout(async () => {
          await addBotMessage(welcomeMessage);
        }, 1500); // 사용자가 UI에 익숙해질 시간을 주기 위해 약간의 딜레이 추가
      }
      welcomeMessageSent.current = true;

      // API 연결 테스트
      fetch('/api/chat/test')
        .then(res => res.json())
        .then(data => {
          console.log('API Test Result:', data);
          if (!data.hasApiKey) {
            console.error('GEMINI_API_KEY is not configured!');
          }
        })
        .catch(err => console.error('API Test failed:', err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  const generateWelcomeMessage = (): string => {
    const { mbti, relationship } = config;

    // 내향형은 먼저 말을 걸지 않음
    if (mbti.startsWith('I')) {
      return '';
    }
    
    // 현재 시간 확인
    const currentHour = new Date().getHours();
    const timeOfDay = currentHour >= 5 && currentHour < 12 ? 'morning' :
                     currentHour >= 12 && currentHour < 18 ? 'afternoon' :
                     currentHour >= 18 && currentHour < 22 ? 'evening' : 'night';

    // 시간대별 인사말 추가
    const timeGreetings = {
      morning: ['굿모닝~', '좋은 아침!', '아침 먹었어?', '잘 잤어?'],
      afternoon: ['점심 먹었어?', '오후네~', '졸려...', '커피 마실래?'],
      evening: ['저녁이다!', '퇴근했어?', '저녁 뭐 먹어?', '오늘 하루 어땠어?'],
      night: ['아직 안 잤어?', '이 시간까지 뭐해?', '잠이 안 와?', '내일도 바빠?']
    };
    
    // 외향형 MBTI별 첫 메시지 (관계와 성격을 고려)
    const welcomeMessages: Record<string, Record<string, string[]>> = {
      'ENFP': {
        'friend': ['야야야 뭐해!!', '나 지금 너 생각하고 있었는데 ㅋㅋ', '오늘 뭐 재밌는 일 없어?'],
        'lover': ['자기야아아 보고싶어 ㅜㅜ', '뭐해? 나랑 놀자!', '오늘도 사랑해 ^^'],
        'crush': ['안녕! 뭐하고 있어?', '혹시 시간 있어? ㅎㅎ', '오늘 날씨 좋더라!'],
        'parent': ['엄마/아빠 뭐해요?', '오늘 맛있는거 먹었어요!', '엄마/아빠 사랑해요 ^^'],
        'child': ['우리 아가 뭐하니?', '엄마/아빠랑 놀까?', '오늘 재밌는 일 있었어?'],
        'colleague': ['안녕하세요! 오늘도 화이팅이에요 ㅎㅎ', '혹시 커피타임 어때요?', '요즘 어떠세요?']
      },
      'ENFJ': {
        'friend': ['잘 지내고 있지?', '오늘 기분은 어때?', '뭐 도와줄 거 없어?'],
        'lover': ['자기 오늘 하루 어땠어?', '많이 피곤하지?', '내가 뭐 해줄까?'],
        'crush': ['안녕 ^^ 오늘 어땠어?', '혹시 괜찮으면 얘기 좀 할까?', '요즘 잘 지내?'],
        'parent': ['엄마/아빠 몸은 좀 어때요?', '오늘 뭐 드셨어요?', '제가 뭐 도와드릴까요?'],
        'child': ['우리 애기 오늘 어땠어?', '힘든 일 없었어?', '엄마/아빠가 도와줄게'],
        'colleague': ['안녕하세요! 도움 필요하신 거 있으세요?', '오늘도 수고 많으셨어요', '프로젝트는 잘 진행되고 있나요?']
      },
      'ENTP': {
        'friend': ['야 이거 봤어? (링크)', '너 이거 어떻게 생각해?', '심심한데 토론할래? ㅋㅋ'],
        'lover': ['자기 이거 알아?', '오늘 신기한 거 발견했는데', '우리 이거 해보지 않을래?'],
        'crush': ['혹시 이런 거 좋아해?', '이거 너무 신기하지 않아?', '너는 어떻게 생각해?'],
        'parent': ['엄마/아빠 이거 아세요?', '오늘 재밌는 거 배웠어요!', '이거 한번 보세요!'],
        'child': ['얘야 이거 알아?', '아빠/엄마가 재밌는 거 알려줄게', '같이 실험해볼까?'],
        'colleague': ['이 아이디어 어떠세요?', '혹시 이런 방법은 어떨까요?', '새로운 접근법을 생각해봤는데요']
      },
      'ENTJ': {
        'friend': ['뭐해? 시간 있어?', '오늘 계획 뭐야?', '같이 뭐 할래?'],
        'lover': ['오늘 일정 어때?', '저녁 같이 먹을래?', '주말에 뭐 할거야?'],
        'crush': ['혹시 이번 주말 시간 돼?', '같이 프로젝트 할래?', '커피 한잔 할까?'],
        'parent': ['엄마/아빠 오늘 일정이 어떻게 되세요?', '제가 뭐 준비할까요?', '계획 있으세요?'],
        'child': ['오늘 숙제 다 했어?', '계획대로 잘 하고 있어?', '뭐 필요한 거 있어?'],
        'colleague': ['프로젝트 진행상황 공유해주세요', '미팅 시간 정할까요?', '목표 달성률이 어떻게 되나요?']
      },
      'ESFP': {
        'friend': ['야! 놀러가자 ㅋㅋ', '오늘 뭐 재밌는 거 하자!', '나 지금 너무 신나 ㅎㅎ'],
        'lover': ['자기야 오늘 데이트하자!', '놀러가고 싶어 ㅜㅜ', '같이 맛있는 거 먹으러 갈래?'],
        'crush': ['오늘 날씨 좋은데 나가지 않을래?', '같이 재밌는 거 하자!', '혹시 시간 있어? ^^'],
        'parent': ['엄마/아빠 같이 쇼핑 가요!', '맛있는 거 먹으러 가요!', '오늘 뭐 재밌는 거 해요!'],
        'child': ['우리 애기 놀러가자!', '재밌는 거 하러 갈까?', '오늘 뭐 먹고 싶어?'],
        'colleague': ['점심 같이 드실래요?', '회식 어때요? ㅎㅎ', '커피 마시러 가실래요?']
      },
      'ESFJ': {
        'friend': ['밥은 먹었어?', '오늘 컨디션 괜찮아?', '뭐 필요한 거 없어?'],
        'lover': ['자기 밥 먹었어?', '오늘 많이 피곤하지?', '내가 뭐 해줄까?'],
        'crush': ['밥은 드셨어요?', '요즘 잘 지내세요?', '날씨가 추운데 감기 조심하세요'],
        'parent': ['엄마/아빠 식사하셨어요?', '건강은 어떠세요?', '제가 뭐 해드릴까요?'],
        'child': ['우리 애기 배고프지 않아?', '오늘 학교 어땠어?', '엄마/아빠가 맛있는 거 해줄까?'],
        'colleague': ['식사는 하셨나요?', '오늘 많이 바쁘신가요?', '도움 필요하시면 말씀하세요']
      },
      'ESTP': {
        'friend': ['야 뭐해? 나와!', '오늘 운동하러 갈래?', '재밌는 거 하자 ㅋㅋ'],
        'lover': ['자기 오늘 뭐하고 놀까?', '드라이브 갈래?', '새로운 거 해보자!'],
        'crush': ['혹시 운동 좋아해?', '같이 뭐 하러 갈래?', '오늘 시간 어때?'],
        'parent': ['엄마/아빠 산책 가요!', '같이 운동해요!', '밖에 나가요!'],
        'child': ['놀이터 갈까?', '재밌는 거 하러 가자!', '뭐하고 놀까?'],
        'colleague': ['퇴근 후에 한잔 어때요?', '점심시간에 산책하실래요?', '볼링 치러 가실래요?']
      },
      'ESTJ': {
        'friend': ['오늘 일정 어때?', '뭐 계획 있어?', '시간 되면 만날래?'],
        'lover': ['오늘 스케줄 어때?', '저녁 약속 잡을까?', '주말 계획 세우자'],
        'crush': ['혹시 이번 주 시간 되세요?', '같이 스터디할래요?', '커피 마실 시간 있으세요?'],
        'parent': ['엄마/아빠 오늘 일정이 어떻게 되세요?', '제가 장 봐올까요?', '필요하신 거 있으세요?'],
        'child': ['숙제는 다 했니?', '오늘 할 일 정리했어?', '계획표 확인했어?'],
        'colleague': ['오늘 회의 준비 되셨나요?', '일정 조율 가능하신가요?', '프로젝트 마감일 확인하셨죠?']
      }
    };

    const mbtiMessages = welcomeMessages[mbti]?.[relationship] || ['안녕!'];
    let selectedMessage = mbtiMessages[Math.floor(Math.random() * mbtiMessages.length)];
    
    // 시간대별 인사말을 30% 확률로 추가 (동료 관계는 50%)
    const shouldAddTimeGreeting = relationship === 'colleague' ? Math.random() < 0.5 : Math.random() < 0.3;
    if (shouldAddTimeGreeting) {
      const timeGreeting = timeGreetings[timeOfDay as keyof typeof timeGreetings];
      selectedMessage = timeGreeting[Math.floor(Math.random() * timeGreeting.length)];
    }
    
    return selectedMessage;
  };

  const addBotMessage = async (content: string) => {
    const newMessage = generateChatMessage(content, 'bot');
    setMessages(prev => {
      const updated = [...prev, newMessage];
      saveChatMessages(updated); // localStorage에 저장
      return updated;
    });
    lastBotMessageTimeRef.current = new Date();
    
    // 침묵 타이머 시작
    await startSilenceTimer();
  };

  // 유저가 대답 안 할 때 챗봇이 반응하는 함수
  const startSilenceTimer = async () => {
    // 기존 타이머 제거
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }

    // 3번 이상 침묵 반응했으면 종료
    if (silenceCountRef.current >= 3) {
      console.log('침묵 반응 한계 도달 (3번), 종료');
      return;
    }
    
    // 대화 종료 감지 - 유저와 봇 모두 종료 멘트인지 확인
    const isConversationEnded = await checkIfConversationEnded();
    if (isConversationEnded) {
      console.log('대화가 자연스럽게 종료된 상태, 침묵 로직 실행 안함');
      return;
    }
    
    // MBTI별 침묵 대기 시간 (초) - 2배로 증가
    const silenceTimeByMBTI: Record<string, number> = {
      'ENFP': 60, // 활발해서 빨리 반응 (30 -> 60)
      'ESFP': 70, // 35 -> 70
      'ENFJ': 80, // 40 -> 80
      'ESFJ': 90, // 45 -> 90
      'ENTP': 100, // 50 -> 100
      'ESTP': 90, // 45 -> 90
      'ENTJ': 120, // 60 -> 120
      'ESTJ': 120, // 60 -> 120
      'INFP': 100, // 50 -> 100
      'ISFP': 110, // 55 -> 110
      'INFJ': 120, // 60 -> 120
      'ISFJ': 130, // 65 -> 130
      'INTP': 140, // 70 -> 140 (내향적이라 늦게 반응)
      'ISTP': 150, // 75 -> 150
      'INTJ': 160, // 80 -> 160
      'ISTJ': 170 // 85 -> 170
    };

    // 침묵 반응 횟수에 따른 대기 시간 결정
    let waitTime: number;
    if (silenceCountRef.current === 0) {
      // 첫 번째 침묵 반응: 기본 MBTI 시간
      waitTime = (silenceTimeByMBTI[config.mbti] || 120) * 1000;
    } else if (silenceCountRef.current === 1) {
      // 두 번째 침묵 반응: 5분 후
      waitTime = 5 * 60 * 1000;
    } else if (silenceCountRef.current === 2) {
      // 세 번째 침묵 반응: 30분 후
      waitTime = 30 * 60 * 1000;
    } else {
      // 더 이상 침묵 반응 없음
      return;
    }

    silenceTimerRef.current = setTimeout(async () => {
      // 마지막 메시지가 봇 메시지인지 확인 (최신 상태 참조)
      const currentMessages = messagesRef.current;
      const lastMessage = currentMessages[currentMessages.length - 1];
      if (lastMessage && lastMessage.sender === 'bot') {
        // 다시 한 번 대화 종료 감지 (시간이 지나면서 상황이 바뇌 수 있음)
        const isEnded = await checkIfConversationEnded();
        if (isEnded) {
          console.log('침묵 시간 대기 중 대화 종료 감지, 침묵 반응 취소');
          return;
        }
        
        silenceCountRef.current++;
        console.log(`침묵 반응 ${silenceCountRef.current}번째 실행`);
        
        // AI를 통한 자연스러운 침묵 반응 생성
        const silenceResponse = await generateNaturalSilenceResponse();
        
        // 이전 침묵 메시지에 추가
        if (silenceResponse.text) {
          previousSilenceMessages.current.push(silenceResponse.text);
        }
        
        setIsTyping(true);
        // 타이핑 시간 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        if (silenceResponse.segments) {
          for (let i = 0; i < silenceResponse.segments.length; i++) {
            if (i > 0) {
              await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
            }
            await addBotMessage(silenceResponse.segments[i]);
          }
        } else {
          await addBotMessage(silenceResponse.text);
        }
        
        setIsTyping(false);
        
        // 3번 미만이면 다시 침묵 타이머 시작
        if (silenceCountRef.current < 3) {
          await startSilenceTimer();
        }
      }
    }, waitTime);
  };

  // 대화 종료 감지 함수
  const checkIfConversationEnded = async (): Promise<boolean> => {
    try {
      const currentMessages = messagesRef.current;
      const recentMessages = currentMessages.slice(-6); // 최근 6개 메시지만 확인
      if (recentMessages.length < 2) return false;
      
      // 가장 최근의 유저 메시지와 봇 메시지 찾기
      const lastUserMessage = recentMessages.slice().reverse().find(m => m.sender === 'user')?.content || '';
      const lastBotMessage = recentMessages.slice().reverse().find(m => m.sender === 'bot')?.content || '';
      
      // 메시지가 없으면 종료 아님
      if (!lastUserMessage || !lastBotMessage) return false;
      
      // 빠른 패턴 매칭으로 명확한 종료 신호 감지
      const endingPatterns = [
        // 종료 관련 패턴들 (유저와 봇 모두에게 적용)
        /잘\s?자|굿\s?나잇|good\s?night|바이|bye|안녕|나중에|다음에|이만|그럼|끝|수고|고마워|땡큐|thank/i,
        /좋은\s?꿈|편안한|달콤한|내일\s?봐|다음에\s?봐|또\s?봐/i,
        /잘\s?쉬|푹\s?쉬|휴식|자러\s?가|잠\s?자|주무세요/i,
        /이따\s?봐|이따\s?보자|오키|오케이|okay|ok|알았어|알겠어|응\s?이따/i,
        /나중에\s?연락|연락할게|연락해|갈게|간다|출발|나감/i
      ];
      
      const userEnding = endingPatterns.some(pattern => pattern.test(lastUserMessage));
      const botEnding = endingPatterns.some(pattern => pattern.test(lastBotMessage));
      
      // 둘 다 종료 신호를 보냈거나, 명확한 종료 대화인 경우
      if (userEnding && botEnding) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('대화 종료 감지 오류:', error);
      return false;
    }
  };

  // AI를 통한 자연스러운 침묵 반응 생성
  const generateNaturalSilenceResponse = async () => {
    try {
      const silenceCount = silenceCountRef.current;
      const attemptNumber = silenceCount + 1;
      
      // 대화 맥락을 위해 최근 메시지 포함 (최신 상태 참조)
      const currentMessages = messagesRef.current;
      const recentMessages = currentMessages.slice(-6); // 최근 6개 메시지
      const conversationHistory = recentMessages.map(m => ({
        sender: m.sender,
        content: m.content
      }));
      
      // 클라이언트에서 한국 시간 계산
      const now = new Date();
      const koreaTimeString = now.toLocaleString("en-US", { timeZone: "Asia/Seoul" });
      const koreaTime = new Date(koreaTimeString);
      
      const koreaTimeInfo = {
        year: koreaTime.getFullYear(),
        month: koreaTime.getMonth() + 1,
        date: koreaTime.getDate(),
        hour: koreaTime.getHours(),
        minute: koreaTime.getMinutes(),
        second: koreaTime.getSeconds(),
        dayOfWeek: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][koreaTime.getDay()]
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: recentMessages, // 대화 맥락 포함
          config,
          clientTime: new Date().toISOString(),
          koreaTimeInfo, // 한국 시간 정보 추가
          sessionId: sessionIdRef.current,
          isSilenceResponse: true,
          silenceContext: {
            attemptNumber,
            totalAttempts: 3,
            conversationHistory,
            previousSilenceMessages: previousSilenceMessages.current // 이전 침묵 메시지 중복 방지
          }
        }),
      });

      if (!response.ok) {
        throw new Error('침묵 반응 생성 실패');
      }

      const data = await response.json();
      
      return {
        segments: data.segments || [data.text],
        text: data.text
      };
    } catch (error) {
      console.error('자연스러운 침묵 반응 생성 실패:', error);
      // 폴백: 간단한 기본 반응
      const fallbackMessages = {
        'E': ['야 거기 있어?', '어디갔어?', '답장 좋시다~'],
        'I': ['바쁜가보네', '안 바쁜 때 연락줘', '다른 얘기할까']
      };
      const fallbacks = fallbackMessages[config.mbti[0] as 'E' | 'I'] || fallbackMessages['I'];
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      
      return {
        text: randomFallback
      };
    }
  };

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
      isRead: true
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (message: string) => {
    // 침묵 타이머 정리
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    
    // 유저가 응답하면 침묵 카운터와 이전 메시지 리셋
    silenceCountRef.current = 0;
    previousSilenceMessages.current = [];
    
    // 사용자가 메시지를 보내면, 이전 봇 메시지들을 모두 '읽음'으로 처리
    const messagesAsRead = messages.map(msg => 
      msg.sender === 'bot' ? { ...msg, isRead: true } : msg
    );

    const newUserMessage = generateChatMessage(message, 'user');

    const updatedMessages = [...messagesAsRead, newUserMessage];
    setMessages(updatedMessages);
    saveChatMessages(updatedMessages); // localStorage에 저장
    
    // 봇이 메시지를 읽는 시간 시뮬레이션 (0.5초 후 읽음 처리)
    setTimeout(() => {
      setMessages(prev => {
        const updated = prev.map(msg => 
          msg.id === newUserMessage.id ? { ...msg, isRead: true } : msg
        );
        saveChatMessages(updated); // 읽음 상태도 저장
        return updated;
      });
      
      // 읽음 처리 후 추가 0.3초 뒤에 타이핑 시작
      setTimeout(() => {
        setIsTyping(true);
      }, 300);
    }, 500);

    try {
      console.log('Sending message to API:', { 
        messageCount: updatedMessages.length, 
        config,
        lastMessage: message,
        messages: updatedMessages.map(m => ({ id: m.id, content: m.content.substring(0, 50), sender: m.sender })) 
      });

      // 클라이언트에서 한국 시간 계산
      const now = new Date();
      const koreaTimeString = now.toLocaleString("en-US", { timeZone: "Asia/Seoul" });
      const koreaTime = new Date(koreaTimeString);
      
      const koreaTimeInfo = {
        year: koreaTime.getFullYear(),
        month: koreaTime.getMonth() + 1,
        date: koreaTime.getDate(),
        hour: koreaTime.getHours(),
        minute: koreaTime.getMinutes(),
        second: koreaTime.getSeconds(),
        dayOfWeek: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][koreaTime.getDay()]
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: updatedMessages, 
          config,
          clientTime: new Date().toISOString(), // UTC 시간 (호환성)
          koreaTimeInfo, // 한국 시간 정보 추가
          sessionId: sessionIdRef.current // 세션 ID 전달
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        
        if (errorData.debug && process.env.NODE_ENV === 'development') {
          console.error('Debug info:', errorData.debug);
        }
        
        throw new Error(errorData.details || errorData.error || 'AI 응답에 실패했습니다.');
      }

      const data = await response.json();
      console.log('Received response:', data);
      console.log('Current messages state:', messages.map(m => ({ id: m.id, content: m.content.substring(0, 50), sender: m.sender })));
      
      // 세션 ID 저장
      if (data.sessionId) {
        sessionIdRef.current = data.sessionId;
      }
      
      // 시간 정보가 있으면 콘솔에 표시 (디버깅용)
      if (data.currentTime) {
        console.log('Current server time:', data.currentTime.timeString);
      }

      // segments가 있으면 사용하고, 없으면 text를 그대로 사용
      const messageSegments = data.segments || [data.text];

      if (messageSegments.length > 1) {
        for (let i = 0; i < messageSegments.length; i++) {
          // 첫 메시지는 바로 보내고, 다음 메시지부터 딜레이 적용
          if (i > 0) {
            // 300ms ~ 1000ms 사이의 랜덤 딜레이 (더 자연스러운 타이핑 시뮬레이션)
            await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
          }
          await addBotMessage(messageSegments[i].trim());
        }
      } else {
        await addBotMessage(messageSegments[0].trim());
      }

    } catch (error) {
      console.error('메시지 전송 실패:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      await addBotMessage(`죄송해요, 오류가 발생했어요. 😢\n\n${errorMessage}\n\n잠시 후 다시 시도해주세요.`);
    } finally {
      setIsTyping(false);
    }
  };

  const mbtiData = MBTI_TYPES.find(m => m.type === config.mbti);
  const relationshipData = RELATIONSHIPS.find(r => r.type === config.relationship);

  const botName = `${mbtiData?.type} ${config.gender === 'male' ? '남자' : '여자'} (${relationshipData?.name})`;
  const botProfile = mbtiData?.emoji || '💬';

  return (
    <ModernChatUI
      botName={botName}
      botProfile={botProfile}
      messages={messages}
      isTyping={isTyping}
      onSendMessage={handleSendMessage}
      onGoBack={() => {
        clearChatMessages(); // 대화 초기화
        router.push('/setup');
      }}
      config={config}
    />
  );
};
