'use client';

import Container from '@/components/ui/Container';
import { motion } from 'framer-motion';
import Image from 'next/image';

const workflowSteps = [
  {
    number: 1,
    title: "Discover",
    subtitle: "Free assessment + strategy session",
    description: "We start by understanding your business, challenges, and goals through our comprehensive AI readiness assessment.",
    features: [
      "Free 15-minute consultation",
      "Custom opportunity analysis", 
      "Industry-specific recommendations",
      "ROI projections for your business"
    ]
  },
  {
    number: 2,
    title: "Design", 
    subtitle: "Custom solution blueprint",
    description: "Based on our findings, we create a detailed blueprint of your custom AI solution with clear specifications.",
    features: [
      "Tailored AI architecture",
      "Integration planning",
      "Security & compliance design",
      "Implementation roadmap"
    ]
  },
  {
    number: 3,
    title: "Develop",
    subtitle: "Build and test your tools", 
    description: "Our team develops your custom AI tools, rigorously testing them to ensure they meet your requirements.",
    features: [
      "Custom AI development",
      "Rigorous testing protocols",
      "Security implementation",
      "Performance optimization"
    ]
  },
  {
    number: 4,
    title: "Deploy",
    subtitle: "Launch and train your team",
    description: "We handle the deployment and provide comprehensive training to ensure your team can effectively use the new tools.",
    features: [
      "Seamless deployment",
      "Team training sessions",
      "Documentation & guides",
      "Go-live support"
    ]
  },
  {
    number: 5,
    title: "Deliver",
    subtitle: "Ongoing support and optimization",
    description: "Continuous monitoring and optimization to ensure your AI solutions deliver lasting value as your business grows.",
    features: [
      "Performance monitoring",
      "Continuous optimization",
      "Ongoing support",
      "Success measurement"
    ]
  }
];

export default function WorkflowSection() {
  const stepImages: string[] = [
    '/01_discover_card_v2.webp',
    '/02_design_solutions_card.webp',
    '/03_development_build_card.webp',
    '/04_training_implementation_card.png',
    '/05_customer_success_support_card.png',
  ];

  return (
    <section id="workflow" className="py-32" style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            How We Work
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Our proven 5-step process ensures your AI implementation succeeds from day one. 
            From discovery to delivery, we&apos;re with you every step of the way.
          </p>
        </motion.div>

        {/* Alternating Process Steps */}
        <div className="space-y-24 max-w-7xl mx-auto">
          {workflowSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_120px_auto_120px_1fr] items-center">
                  {isEven ? (
                    <>
                      {/* Left Image */}
                      <div className="flex justify-end">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-[400px] h-[300px] rounded-2xl overflow-hidden shadow-2xl"
                          style={{ borderColor: '#4e8ad3', borderWidth: '2px' }}
                        >
                          <Image
                            src={stepImages[index]}
                            alt={step.title}
                            fill
                            className="object-cover"
                            priority={index < 2}
                          />
                        </motion.div>
                      </div>
                      
                      {/* Left Gap */}
                      <div />
                      
                      {/* Center Line */}
                      <div className="relative flex justify-center">
                        <div className="absolute top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--border)' }} />
                        <div 
                          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                          style={{ 
                            backgroundColor: '#4e8ad3',
                            color: 'white'
                          }}
                        >
                          {step.number}
                        </div>
                      </div>
                      
                      {/* Right Gap */}
                      <div />
                      
                      {/* Right Content */}
                      <div className="flex justify-start">
                        <div className="max-w-md">
                          <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                            {step.title}
                          </h3>
                          <p className="text-lg font-medium mb-4" style={{ color: '#4e8ad3' }}>
                            {step.subtitle}
                          </p>
                          <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                            {step.description}
                          </p>
                          <ul className="space-y-3">
                            {step.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start space-x-3">
                                <div 
                                  className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center"
                                  style={{ backgroundColor: '#4e8ad3' }}
                                >
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                </div>
                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left Content */}
                      <div className="flex justify-end">
                        <div className="max-w-md">
                          <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                            {step.title}
                          </h3>
                          <p className="text-lg font-medium mb-4" style={{ color: '#4e8ad3' }}>
                            {step.subtitle}
                          </p>
                          <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                            {step.description}
                          </p>
                          <ul className="space-y-3">
                            {step.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start space-x-3">
                                <div 
                                  className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center"
                                  style={{ backgroundColor: '#4e8ad3' }}
                                >
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                </div>
                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Left Gap */}
                      <div />
                      
                      {/* Center Line */}
                      <div className="relative flex justify-center">
                        <div className="absolute top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--border)' }} />
                        <div 
                          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                          style={{ 
                            backgroundColor: '#4e8ad3',
                            color: 'white'
                          }}
                        >
                          {step.number}
                        </div>
                      </div>
                      
                      {/* Right Gap */}
                      <div />
                      
                      {/* Right Image */}
                      <div className="flex justify-start">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-[400px] h-[300px] rounded-2xl overflow-hidden shadow-2xl"
                          style={{ borderColor: '#4e8ad3', borderWidth: '2px' }}
                        >
                          <Image
                            src={stepImages[index]}
                            alt={step.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile/Tablet Layout */}
                <div className="lg:hidden space-y-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                      style={{ 
                        backgroundColor: '#4e8ad3',
                        color: 'white'
                      }}
                    >
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {step.title}
                      </h3>
                      <p className="text-base font-medium" style={{ color: '#4e8ad3' }}>
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src={stepImages[index]}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-body)' }}>
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div 
                          className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center"
                          style={{ backgroundColor: '#4e8ad3' }}
                        >
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}