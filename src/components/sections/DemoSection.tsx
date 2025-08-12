'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Maximize, Loader2 } from 'lucide-react';

interface Demo {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnail?: string;
  duration?: string;
}

const demos: Demo[] = [
  {
    id: 'sales-marketing',
    title: 'Sales & Marketing AI',
    description: 'Advanced customer experience automation',
    duration: '2:30',
    thumbnail: '/api/placeholder/600/400'
  },
  {
    id: 'operations',
    title: 'Operations Automation',
    description: 'Streamline processes and eliminate repetitive tasks',
    duration: '3:15',
    thumbnail: '/api/placeholder/600/400'
  },
  {
    id: 'knowledge-rag',
    title: 'Knowledge Base RAG',
    description: 'Intelligent search across all your content',
    duration: '2:45',
    thumbnail: '/api/placeholder/600/400'
  },
  {
    id: 'custom-workflows',
    title: 'Custom Workflows',
    description: 'Tailored solutions for your business needs',
    duration: '4:00',
    thumbnail: '/api/placeholder/600/400'
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    description: 'Real-time insights and performance metrics',
    duration: '3:30',
    thumbnail: '/api/placeholder/600/400'
  }
];

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState<Demo>(demos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoSelect = (demo: Demo) => {
    if (demo.id !== activeDemo.id) {
      setIsLoading(true);
      setIsPlaying(false);
      setTimeout(() => {
        setActiveDemo(demo);
        setIsLoading(false);
      }, 300);
    }
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="demos" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      {/* Background particles effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[\#4e8ad3] rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-[\#4e8ad3]/70 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-1500"></div>
      </div>

      <Container>
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            DEMOS
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            See our AI solutions in action. Select a demo below to watch how we transform businesses.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 items-start">
          {/* Left Column - Demo List */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 border-2 ${
                    activeDemo.id === demo.id 
                      ? 'border-[\#4e8ad3] shadow-lg shadow-[\#4e8ad3]/20' 
                      : 'border-transparent hover:border-[\#4e8ad3]/50'
                  }`}
                  style={{ backgroundColor: 'var(--card-background)' }}
                  onClick={() => handleDemoSelect(demo)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 
                        className={`text-xl font-bold transition-colors duration-300 ${
                          activeDemo.id === demo.id ? 'text-[\#4e8ad3]' : ''
                        }`}
                        style={{ color: activeDemo.id === demo.id ? '#4e8ad3' : 'var(--text-primary)' }}
                      >
                        {demo.title}
                      </h3>
                      {activeDemo.id === demo.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-[\#4e8ad3] rounded-full"
                        />
                      )}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                      {demo.description}
                    </p>
                    {demo.duration && (
                      <div className="flex items-center mt-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span>Duration: {demo.duration}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Video Player */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <Card className="overflow-hidden shadow-2xl" style={{ backgroundColor: 'var(--card-background)' }}>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                  {/* Video Thumbnail/Placeholder */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDemo.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%), url(${activeDemo.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {isLoading ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center"
                        >
                          <Loader2 className="w-12 h-12 text-[\#4e8ad3] animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePlayToggle}
                          className="group relative"
                        >
                          <div className="w-20 h-20 bg-[\#4e8ad3]/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-[\#4e8ad3]/30 group-hover:bg-[\#4e8ad3]/30 transition-all duration-300">
                            {isPlaying ? (
                              <Pause className="w-8 h-8 text-[\#4e8ad3] ml-0" />
                            ) : (
                              <Play className="w-8 h-8 text-[\#4e8ad3] ml-1" />
                            )}
                          </div>
                        </motion.button>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Video Title Overlay */}
                  <div className="absolute top-4 left-4">
                    <motion.div
                      key={activeDemo.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm"
                    >
                      <h4 className="text-lg font-bold text-white">{activeDemo.title}</h4>
                      <p className="text-sm text-gray-300">{activeDemo.description}</p>
                    </motion.div>
                  </div>

                  {/* Custom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePlayToggle}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </motion.button>
                        <div className="text-sm opacity-75">
                          {activeDemo.duration}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <Volume2 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <Maximize className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <motion.div 
                          className="bg-[\#4e8ad3] h-1 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: isPlaying ? "100%" : "0%" }}
                          transition={{ duration: isPlaying ? 10 : 0 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}