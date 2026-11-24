import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { notification, showNotification } = useApp();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle max-w-md">
      <div className="bg-green-900 text-white px-4 py-3.5 rounded-2xl shadow-2xl border-2 border-sun flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-sun shrink-0" />
        <span className="text-sm font-medium leading-snug flex-1">
          {notification}
        </span>
        <button
          onClick={() => showNotification('')}
          className="text-green-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
