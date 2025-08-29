'use client';

import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing...',
  className,
  minHeight = '200px'
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = before + selectedText + after;

    const newValue = value.substring(0, start) + newText + value.substring(end);
    onChange(newValue);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  }, [value, onChange]);

  const formatButtons = [
    { label: 'B', action: () => insertText('**', '**'), title: 'Bold' },
    { label: 'I', action: () => insertText('*', '*'), title: 'Italic' },
    { label: 'H1', action: () => insertText('# '), title: 'Heading 1' },
    { label: 'H2', action: () => insertText('## '), title: 'Heading 2' },
    { label: 'H3', action: () => insertText('### '), title: 'Heading 3' },
    { label: '•', action: () => insertText('- '), title: 'Bullet List' },
    { label: '1.', action: () => insertText('1. '), title: 'Numbered List' },
    { label: '"', action: () => insertText('`', '`'), title: 'Code' },
    { label: '🔗', action: () => insertText('[', '](url)'), title: 'Link' },
  ];

  return (
    <div className={cn('border border-gray-300 rounded-lg overflow-hidden', className)}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {formatButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            title={button.title}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 text-gray-900 bg-white resize-none focus:outline-none focus:ring-0"
        style={{ minHeight }}
        rows={10}
      />

      {/* Footer with character count */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-sm text-gray-500">
        {value.length} characters
      </div>
    </div>
  );
}
