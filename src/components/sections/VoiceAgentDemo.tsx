'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Sparkles, Radio } from 'lucide-react';
import ChatInterface from '../ui/ChatInterface';
import { ChatMode } from '@/types/chat';

export default function VoiceAgentDemo() {
  const [mode, setMode] = useState<ChatMode>('text');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const handleModeSwitch = (newMode: ChatMode) => {
    setMode(newMode);
    if (newMode === 'voice') {
      setIsCallActive(true);
    } else {
      setIsCallActive(false);
    }
  };

  const handleStartCall = () => {
    setMode('voice');
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setMode('text');
    setIsCallActive(false);
  };

  const avatarVariants = {
    idle: {
      scale: 1,
      boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
    },
    active: {
      scale: [1, 1.02, 1],
      boxShadow: '0 0 60px rgba(6, 182, 212, 0.6)',
      transition: {
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.1, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          Meet Our AI Consultant Expert
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl lg:text-3xl text-cyan-400 mb-3"
        >
          Chat or speak with our AI to discover how The AI CEO transforms businesses
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto"
        >
          Ask about our custom AI agents, voice solutions, n8n automation, ABLE Leadership Focus, 
          SMB-focused pricing, or schedule a free strategy session. Available 24/7 to answer your questions.
        </motion.p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Voice Avatar Section (Left - 5 cols) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8"
        >
          {/* Avatar Container */}
          <div className="relative mb-8">
            {/* Pulse Effects when active */}
            {isCallActive && (
              <>
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="absolute inset-0 bg-cyan-500 rounded-full"
                />
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="absolute inset-0 bg-cyan-500 rounded-full"
                  style={{ animationDelay: '0.5s' }}
                />
              </>
            )}
            
            {/* Main Avatar */}
            <motion.div
              variants={avatarVariants}
              animate={isCallActive ? 'active' : 'idle'}
              className="relative w-48 h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl"
            >
              <div className="w-44 h-44 lg:w-52 lg:h-52 bg-slate-900 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* AI Agent Avatar Image at full opacity */}
                <img 
                  src="/ai-agent-avatar.png" 
                  alt="AI Business Consultant"
                  className="w-full h-full object-cover"
                />
                
                {/* Status Indicator when active */}
                <AnimatePresence>
                  {isCallActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-2 right-2"
                    >
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            {/* Name under avatar */}
            <p className="text-3xl font-semibold text-white mt-4 text-center">"Emily"</p>
          </div>

          {/* Voice Status */}
          <div className="text-center mb-6">
            <AnimatePresence mode="wait">
              {isCallActive ? (
                <motion.div
                  key="active"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <p className="text-2xl font-bold text-cyan-400">Voice Mode Active</p>
                  <p className="text-gray-400">I'm listening to your questions...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <p className="text-2xl font-bold text-white">AI Consultant Ready</p>
                  <p className="text-gray-400">Type or speak to learn about The AI CEO</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4">
            {!isCallActive ? (
              <button
                onClick={handleStartCall}
                className="relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white text-lg font-semibold rounded-xl flex items-center gap-2 transition-all overflow-hidden group"
              >
                {/* Base white border */}
                <div className="absolute inset-0 border-4 border-white/60 rounded-xl" />
                
                {/* Rotating light effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-[-50%] bg-gradient-conic from-transparent via-white to-transparent opacity-80"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.8) 10%, transparent 20%, transparent)',
                    }}
                  />
                </div>
                
                {/* Inner glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-white/30 to-cyan-400/20 rounded-xl blur-md"
                />
                
                {/* Pulse effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 border-4 border-white rounded-xl"
                />
                
                <Phone className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Start Call</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleEndCall}
                  className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-xl flex items-center gap-2 transition-all"
                >
                  <PhoneOff className="w-5 h-5" />
                  End Call
                </button>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-xl transition-all ${
                    isMuted 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-slate-700/50 text-gray-400 hover:text-white'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`p-3 rounded-xl transition-all ${
                    !isSpeakerOn 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-slate-700/50 text-gray-400 hover:text-white'
                  }`}
                  title={isSpeakerOn ? 'Mute speaker' : 'Unmute speaker'}
                >
                  {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
              </>
            )}
          </div>

        </motion.div>

        {/* Chat Interface Section (Right - 7 cols) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-7"
        >
          <ChatInterface 
            className="h-[600px]" 
            mode={mode}
            onModeSwitch={handleModeSwitch}
          />
        </motion.div>
      </div>

      {/* Info Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 p-4 bg-slate-800/20 backdrop-blur-sm rounded-xl border border-cyan-500/10 text-center"
      >
        <p className="text-gray-400 mb-2">
          <span className="text-cyan-400 font-semibold">Try asking:</span>
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300">
            "What makes The AI CEO different?"
          </span>
          <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300">
            "Tell me about custom voice agents"
          </span>
          <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300">
            "How does Prompt Surgeon™ work?"
          </span>
          <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300">
            "What's your pricing for SMBs?"
          </span>
          <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300">
            "Book a strategy session"
          </span>
        </div>
      </motion.div>
    </div>
  );
}