import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface VerificationBadgeProps {
  type: 'email' | 'student' | 'faculty';
  className?: string;
}

export const VerificationBadge = ({ type, className = '' }: VerificationBadgeProps) => {
  const badges = {
    email: {
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      text: 'Email Verified'
    },
    student: {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      text: 'Verified Student'
    },
    faculty: {
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
      text: 'Verified Faculty'
    }
  };

  const { color, text } = badges[type];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color} ${className}`}>
      <CheckCircle2 className="w-3 h-3" />
      {text}
    </span>
  );
};