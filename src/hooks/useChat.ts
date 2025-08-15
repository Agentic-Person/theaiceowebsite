'use client';

import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Message, ChatSession, ChatMode, ChatRequest, ChatResponse } from '@/types/chat';

const CHAT_API_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_API_ENDPOINT || '/api/chat';
const SESSION_STORAGE_KEY = 'ai-chat-session';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<ChatMode>('text');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Don't auto-load session on initial page load to prevent auto-scrolling
    // Only load if explicitly requested
    const storedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedSession && false) { // Disabled auto-load for now
      try {
        const session: ChatSession = JSON.parse(storedSession);
        setMessages(session.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
        setSessionId(session.id);
        setMode(session.mode);
      } catch (e) {
        console.error('Failed to restore session:', e);
        initializeNewSession();
      }
    } else {
      initializeNewSession();
    }
  }, []);

  useEffect(() => {
    if (sessionId && messages.length > 0) {
      const session: ChatSession = {
        id: sessionId,
        messages,
        mode,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
  }, [messages, sessionId, mode]);

  const initializeNewSession = useCallback(() => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setMessages([]);
    setError(null);
    
    const welcomeMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: "Hi! I'm Emily, your AI Consultant Expert. I can help you understand how The AI CEO can transform your business with custom AI solutions. What would you like to know?",
      timestamp: new Date(),
      status: 'sent',
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setIsTyping(true);

    try {
      const request: ChatRequest = {
        message: content,
        sessionId,
        mode,
      };

      const response = await axios.post<ChatResponse>(CHAT_API_ENDPOINT, request);

      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date(response.data.timestamp),
        status: 'sent',
      };

      setIsTyping(false);
      setMessages(prev => [...prev, assistantMessage]);

      // If voice mode and audio data is available, play it
      if (mode === 'voice' && response.data.audioData) {
        playAudioResponse(response.data.audioData);
      }

    } catch (err) {
      console.error('Failed to send message:', err);
      setIsTyping(false);
      
      let errorMessage = 'Failed to send message. Please try again.';
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      setError(errorMessage);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'error' }
            : msg
        )
      );

      const errorAssistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to contact us directly for immediate assistance.",
        timestamp: new Date(),
        status: 'sent',
      };
      
      setMessages(prev => [...prev, errorAssistantMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, mode, isLoading]);

  const clearChat = useCallback(() => {
    initializeNewSession();
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }, [initializeNewSession]);

  const switchMode = useCallback((newMode: ChatMode) => {
    setMode(newMode);
  }, []);

  const playAudioResponse = useCallback((audioData: string) => {
    try {
      const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
      audio.play().catch(e => console.error('Failed to play audio:', e));
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }, []);

  const startVoiceRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          const base64Audio = reader.result?.toString().split(',')[1];
          if (base64Audio) {
            // Send as voice message
            const request: ChatRequest = {
              message: base64Audio, // Audio data as message
              sessionId,
              mode: 'voice',
            };
            
            // Same API endpoint will handle voice
            sendMessage(base64Audio);
          }
        };
        
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      
      // Return stop function
      return () => {
        mediaRecorder.stop();
      };
    } catch (error) {
      console.error('Failed to start recording:', error);
      setError('Microphone access denied or unavailable');
      return null;
    }
  }, [sessionId, sendMessage]);

  return {
    messages,
    sessionId,
    isLoading,
    error,
    mode,
    isTyping,
    sendMessage,
    clearChat,
    switchMode,
    startVoiceRecording,
  };
}