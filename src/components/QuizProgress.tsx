import React from 'react';
import { Timer } from 'lucide-react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}

export function QuizProgress({ currentQuestion, totalQuestions, timeLeft }: QuizProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}