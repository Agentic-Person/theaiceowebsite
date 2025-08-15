'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, AlertCircle, Clock, Check, CheckCheck } from 'lucide-react';
import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export default function ChatMessage({ message, isTyping }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = () => {
    if (message.status === 'sending') {
      return <Clock className="w-3 h-3 text-gray-400" />;
    }
    if (message.status === 'error') {
      return <AlertCircle className="w-3 h-3 text-red-400" />;
    }
    if (message.status === 'sent' && isUser) {
      return <CheckCheck className="w-3 h-3 text-cyan-400" />;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isUser
              ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
              : 'bg-gradient-to-br from-slate-700 to-slate-600'
          }`}
        >
          {isUser ? (
            <User className="w-6 h-6 text-white" />
          ) : (
            <Bot className="w-6 h-6 text-cyan-400" />
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Name and Time */}
        <div className={`flex items-center gap-2 mb-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs font-medium text-gray-400">
            {isUser ? 'You' : 'Emily'}
          </span>
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
        </div>

        {/* Message Bubble */}
        <div
          className={`relative px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-br from-cyan-600 to-cyan-500 text-white'
              : 'bg-slate-700/50 backdrop-blur-sm text-gray-100 border border-slate-600/50'
          }`}
        >
          {/* Typing Indicator */}
          {isTyping && !isUser ? (
            <div className="flex gap-1">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 bg-cyan-400 rounded-full"
              />
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-cyan-400 rounded-full"
              />
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-cyan-400 rounded-full"
              />
            </div>
          ) : (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          )}

          {/* Message tail */}
          <div
            className={`absolute top-3 ${
              isUser ? '-right-1' : '-left-1'
            } w-3 h-3 transform rotate-45 ${
              isUser
                ? 'bg-cyan-500'
                : 'bg-slate-700/50 border-l border-t border-slate-600/50'
            }`}
          />
        </div>

        {/* Status indicator */}
        {isUser && (
          <div className="flex items-center gap-1 mt-1">
            {getStatusIcon()}
          </div>
        )}
      </div>
    </motion.div>
  );
}