'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Phone, Trash2, Bot, Wifi, WifiOff } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { useChat } from '@/hooks/useChat';
import { ChatMode } from '@/types/chat';

interface ChatInterfaceProps {
  className?: string;
  mode?: ChatMode;
  onModeSwitch?: (mode: ChatMode) => void;
}

export default function ChatInterface({ 
  className = '', 
  mode: externalMode,
  onModeSwitch 
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const {
    messages,
    isLoading,
    error,
    mode: internalMode,
    isTyping,
    sendMessage,
    clearChat,
    switchMode: internalSwitchMode,
  } = useChat();

  const mode = externalMode || internalMode;

  const [hasInteracted, setHasInteracted] = useState(false);
  
  const scrollToBottom = () => {
    // Only scroll within the chat container, not the whole page
    if (hasInteracted && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    // Only scroll if user has interacted and there are messages
    if (hasInteracted && (messages.length > 0 || isTyping)) {
      scrollToBottom();
    }
  }, [messages, isTyping, hasInteracted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      setHasInteracted(true);
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleModeSwitch = (newMode: ChatMode) => {
    if (onModeSwitch) {
      onModeSwitch(newMode);
    } else {
      internalSwitchMode(newMode);
    }
  };

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return (
    <div className={`flex flex-col h-full bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold">Emily - AI Consultant Expert</h3>
            <div className="flex items-center gap-2">
              <Wifi className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-400">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Toggle */}
          <button
            onClick={() => handleModeSwitch(mode === 'text' ? 'voice' : 'text')}
            className={`p-2 rounded-lg transition-all ${
              mode === 'voice'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-slate-700/50 text-gray-400 hover:text-cyan-400'
            }`}
            title={mode === 'voice' ? 'Switch to text' : 'Switch to voice'}
          >
            {mode === 'voice' ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Clear Chat */}
          <button
            onClick={clearChat}
            className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-red-400 transition-colors"
            title="Clear conversation"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: '500px' }}>
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <ChatMessage
              message={{
                id: 'typing',
                role: 'assistant',
                content: '',
                timestamp: new Date(),
              }}
              isTyping={true}
            />
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mx-6 mb-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-slate-700/50 p-4 bg-slate-800/50">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                mode === 'voice' 
                  ? "Voice mode active - click mic to speak..." 
                  : "Message your AI Sales Pro..."
              }
              className="w-full px-4 py-3 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl border border-slate-600/50 focus:border-cyan-500/50 focus:outline-none resize-none transition-all"
              rows={1}
              disabled={isLoading || mode === 'voice'}
            />
          </div>
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading || mode === 'voice'}
            className={`px-4 py-3 rounded-xl transition-all flex items-center justify-center ${
              input.trim() && !isLoading && mode !== 'voice'
                ? 'bg-cyan-500 hover:bg-cyan-400 text-white'
                : 'bg-slate-700/30 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : mode === 'voice' ? (
              <Phone className="w-5 h-5" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {/* Character/Mode Indicator */}
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-xs text-gray-500">
            {mode === 'voice' ? 'Voice mode' : `${input.length} characters`}
          </span>
          <span className="text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </span>
        </div>
      </form>
    </div>
  );
}