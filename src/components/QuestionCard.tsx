import React from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedOptionId: number | null;
  onSelectOption: (optionId: number) => void;
  showAnswer?: boolean;
}

export function QuestionCard({ question, selectedOptionId, onSelectOption, showAnswer }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.description}</h3>
      
      <div className="space-y-4">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = showAnswer && option.is_correct;
          const isWrong = showAnswer && isSelected && !option.is_correct;
          
          return (
            <button
              key={option.id}
              onClick={() => !showAnswer && onSelectOption(option.id)}
              disabled={showAnswer}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              } ${
                isCorrect
                  ? 'border-green-500 bg-green-50'
                  : isWrong
                  ? 'border-red-500 bg-red-50'
                  : ''
              }`}
            >
              <p className="text-gray-700">{option.description}</p>
            </button>
          );
        })}
      </div>

      {showAnswer && question.detailed_solution && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Explanation:</h4>
          <p className="text-gray-600">{question.detailed_solution}</p>
        </div>
      )}
    </div>
  );
}