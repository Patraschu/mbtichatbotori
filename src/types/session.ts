export interface DeveloperSession {
  isDeveloper: boolean;
  attempts: number;
  lastAttempt: Date;
  blockedUntil?: Date;
  sessionId: string;
}

export interface SessionStore {
  [sessionId: string]: DeveloperSession;
}