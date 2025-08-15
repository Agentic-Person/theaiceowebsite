'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Sparkles, Mic, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { Card } from '../ui/Card';
import ScrollReveal from '../animations/ScrollReveal';
import VoiceAgentDemo from './VoiceAgentDemo';

const VoiceAgentsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const avatarVariants = {
    idle: {
      scale: 1,
      boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut' as const
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 60px rgba(6, 182, 212, 0.6)',
      transition: {
        duration: 0.3
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.1, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  };

  return (
    <section id="ai-voice" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">Voice Agents</h2>
          <p className="text-2xl lg:text-3xl text-cyan-400 font-semibold mb-2">Never Lose a Deal to a Dumb Bot Again</p>
          <p className="text-lg text-gray-400">Conversations Close Deals, Not Repetitions</p>
        </ScrollReveal>

        {/* Three Card Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20"
        >
          {/* Card 1: AI Avatar */}
          <Card className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-2xl hover:border-cyan-400/40 transition-all duration-300">
            <div className="flex flex-col items-center h-full">
              {/* AI Avatar Container */}
              <div className="relative mb-6">
                {/* Pulse Effects */}
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="absolute inset-0 bg-cyan-500 rounded-full"
                />
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="absolute inset-0 bg-cyan-500 rounded-full"
                  style={{ animationDelay: '1s' }}
                />
                
                {/* Avatar */}
                <motion.div
                  variants={avatarVariants}
                  animate="idle"
                  whileHover="hover"
                  className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
                >
                  <Image
                    src="/ai-agent-avatar-02.png"
                    alt="AI Voice Agent"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                  {/* Sparkle overlay */}
                  <Sparkles className="w-8 h-8 text-yellow-400 absolute bottom-4 right-4 animate-pulse" />
                </motion.div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Meet Your AI Sales Pro</h3>
              <p className="text-gray-300 text-center">
                Professional, personable, and powered by advanced AI that speaks naturally and closes effectively
              </p>
            </div>
          </Card>

          {/* Card 2: Memory Features */}
          <Card className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-2xl hover:border-cyan-400/40 transition-all duration-300">
            <div className="flex flex-col h-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Memory That Closes</h3>
              </div>
              
              <div className="space-y-4 flex-grow">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <span className="text-cyan-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Recalls buyer pain points across every interaction</p>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <span className="text-cyan-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Tracks previous objections and addresses them proactively</p>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <span className="text-cyan-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Handles long sales cycles without dropping the thread</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 3: Results */}
          <Card className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-2xl hover:border-cyan-400/40 transition-all duration-300">
            <div className="flex flex-col h-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Results That Matter</h3>
              </div>
              
              <div className="space-y-4 flex-grow">
                <div className="bg-slate-700/30 rounded-lg p-4 border border-cyan-500/10">
                  <p className="text-cyan-400 font-semibold mb-1">More Trust</p>
                  <p className="text-gray-300 text-sm">= Faster closes with consistent messaging</p>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4 border border-cyan-500/10">
                  <p className="text-cyan-400 font-semibold mb-1">More Continuity</p>
                  <p className="text-gray-300 text-sm">= Fewer drop-offs in the sales pipeline</p>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4 border border-cyan-500/10">
                  <p className="text-cyan-400 font-semibold mb-1">More Insight</p>
                  <p className="text-gray-300 text-sm">= Better follow-up and qualification</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Problem Statement Block */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="bg-gradient-to-r from-slate-800/30 via-slate-800/50 to-slate-800/30 backdrop-blur-xl rounded-2xl p-12 border border-cyan-500/10">
              <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                When your AI forgets key objections or misses buying signals, 
                <span className="text-cyan-400 font-semibold"> you lose trust and you lose deals</span>. 
                Our system gives your AI the power to hold the full conversation 
                <span className="text-white font-semibold"> from intro to close</span>.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            className="inline-flex items-center bg-cyan-500 hover:bg-cyan-400"
          >
            Equip Your Team with Smart AI
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-gray-400 mt-4">AI that remembers what matters and sells like a pro</p>
        </div>
      </div>
    </section>
  );
};

export default VoiceAgentsSection;