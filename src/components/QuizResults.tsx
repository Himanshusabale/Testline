import React from 'react';
import { Trophy, XCircle, CheckCircle } from 'lucide-react';
import type { UserAnswer, Quiz } from '../types';

interface QuizResultsProps {
  quiz: Quiz;
  userAnswers: UserAnswer[];
  onRetry: () => void;
}

export function QuizResults({ quiz, userAnswers, onRetry }: QuizResultsProps) {
  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
  const incorrectAnswers = userAnswers.length - correctAnswers;
  const totalScore = (correctAnswers * quiz.correct_answer_marks) - (incorrectAnswers * quiz.negative_marks);
  const percentage = (correctAnswers / userAnswers.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">Here's how you performed</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Correct Answers</p>
          <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Incorrect Answers</p>
          <p className="text-2xl font-bold text-red-600">{incorrectAnswers}</p>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-4xl font-bold text-blue-600 mb-2">{totalScore}</p>
        <p className="text-gray-600">Total Score</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button
        onClick={onRetry}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}