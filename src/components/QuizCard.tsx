import React from 'react';
import { Trophy, Clock, AlertCircle } from 'lucide-react';
import type { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
  onStart: () => void;
}

export function QuizCard({ quiz, onStart }: QuizCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{quiz.title}</h2>
      <p className="text-gray-600 mb-6">{quiz.description || 'Test your knowledge with this quiz!'}</p>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">{quiz.duration} mins</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600">+{quiz.correct_answer_marks} points</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-sm text-gray-600">-{quiz.negative_marks} points</span>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Start Quiz
      </button>
    </div>
  );
}