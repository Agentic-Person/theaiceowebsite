export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'error';

export type ChatMode = 'text' | 'voice';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  isTyping?: boolean;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  mode: ChatMode;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRequest {
  message: string;
  sessionId: string;
  mode?: ChatMode;
  context?: any;
}

export interface ChatResponse {
  message: string;
  sessionId: string;
  timestamp: Date;
  error?: string;
  audioData?: string; // Base64 encoded audio for voice responses
  mode?: ChatMode;
}

export interface VoiceAgentStatus {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  mode: ChatMode;
}

export interface WebhookPayload {
  message: string;
  sessionId: string;
  timestamp: string;
  mode: ChatMode;
  metadata?: {
    userAgent?: string;
    referrer?: string;
    [key: string]: any;
  };
}

export interface WebhookResponse {
  response?: string; // For backward compatibility
  message?: string; // New field name
  sessionId: string;
  timestamp: string;
  success?: boolean;
  error?: string;
  audioData?: string; // Base64 audio for voice mode
  mode?: ChatMode;
}