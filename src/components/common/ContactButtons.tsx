import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

interface ContactButtonsProps {
  email: string;
  whatsapp?: string;
  className?: string;
}

export const ContactButtons = ({ email, whatsapp, className = '' }: ContactButtonsProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-1 px-3 py-1.5 
          bg-primary-50 text-primary-600 
          dark:bg-primary-900 dark:text-primary-400
          rounded-lg text-sm font-medium
          hover:bg-primary-100 dark:hover:bg-primary-800
          transition-colors duration-200"
      >
        <Mail className="w-4 h-4" />
        Email
      </a>
      
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5
            bg-green-50 text-green-600
            dark:bg-green-900 dark:text-green-400
            rounded-lg text-sm font-medium
            hover:bg-green-100 dark:hover:bg-green-800
            transition-colors duration-200"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      )}
    </div>
  );
};