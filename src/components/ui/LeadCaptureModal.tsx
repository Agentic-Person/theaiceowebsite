'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Mail, User, Sparkles } from 'lucide-react';
import Button from './Button';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  ebookTitle?: string;
  ebookDescription?: string;
}

export default function LeadCaptureModal({ 
  isOpen, 
  onClose, 
  ebookTitle = "AI EDGE eBook",
  ebookDescription = "The Complete Guide to AI Implementation for SMBs"
}: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'ebook-download',
          ebookRequested: ebookTitle
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '', businessType: '' });
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
          >
            <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden">
              {/* Header */}
              <div className="relative p-6 pb-0">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{ebookTitle}</h3>
                  <p className="text-gray-400">{ebookDescription}</p>
                </div>
              </div>

              {/* Form */}
              <div className="p-6">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    {/* Business Type (Optional) */}
                    <div>
                      <label htmlFor="businessType" className="block text-sm font-medium text-gray-300 mb-2">
                        What's your biggest AI challenge? <span className="text-gray-500">(Optional)</span>
                      </label>
                      <select
                        id="businessType"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select an option...</option>
                        <option value="getting-started">Getting started with AI</option>
                        <option value="scaling">Scaling existing AI</option>
                        <option value="integration">System integration</option>
                        <option value="roi">Proving ROI</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                      >
                        <p className="text-red-400 text-sm">{error}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          Get Your Free eBook
                          <Sparkles className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      We'll send your eBook instantly. No spam, unsubscribe anytime.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5, delay: 0.2 }}
                      >
                        <Sparkles className="w-10 h-10 text-green-400" />
                      </motion.div>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Success!</h4>
                    <p className="text-gray-300">Check your email for your free eBook.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
