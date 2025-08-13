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
    id: 'demo-1',
    title: 'Demo 1',
    description: 'Advanced customer experience automation',
    duration: '2:30',
    videoUrl: 'https://youtu.be/0IIZU_Mp9HI',
    thumbnail: '/api/placeholder/600/400'
  },
  {
    id: 'demo-2',
    title: 'Demo 2',
    description: 'Streamline processes and eliminate repetitive tasks',
    duration: '3:15',
    videoUrl: '',
    thumbnail: '/api/placeholder/600/400'
  },
  {
    id: 'demo-3',
    title: 'Demo 3',
    description: 'Intelligent search across all your content',
    duration: '2:45',
    videoUrl: '',
    thumbnail: '/api/placeholder/600/400'
  },
  {
    id: 'demo-4',
    title: 'Demo 4',
    description: 'Tailored solutions for your business needs',
    duration: '4:00',
    videoUrl: '',
    thumbnail: '/api/placeholder/600/400'
  },
  {
    id: 'demo-5',
    title: 'Demo 5',
    description: 'Real-time insights and performance metrics',
    duration: '3:30',
    videoUrl: '',
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
                  {/* If we have a video URL, show the embed, otherwise show placeholder */}
                  {activeDemo.videoUrl ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeDemo.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        {isLoading ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                            <Loader2 className="w-12 h-12 text-[\#4e8ad3] animate-spin" />
                          </div>
                        ) : (
                          <iframe
                            src={`${activeDemo.videoUrl.includes('youtu')
                              ? activeDemo.videoUrl.replace('https://youtu.be/', 'https://www.youtube.com/embed/').replace('watch?v=', 'embed/')
                              : activeDemo.videoUrl.replace('share', 'embed')}`}
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    /* Original placeholder for demos without videos */
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
                        <div className="text-center">
                          <h4 className="text-2xl font-bold text-white mb-2">{activeDemo.title}</h4>
                          <p className="text-lg text-gray-300 mb-4">{activeDemo.description}</p>
                          <p className="text-sm text-gray-400">Video coming soon</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}