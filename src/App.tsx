import React, { useState, useEffect } from 'react';
import { QuizCard } from './components/QuizCard';
import { QuestionCard } from './components/QuestionCard';
import { QuizProgress } from './components/QuizProgress';
import { QuizResults } from './components/QuizResults';
import { Quiz, UserAnswer } from './types';

const App = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Fetch quiz data from API with CORS proxy
    fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.jsonserve.com/Uw5CrX'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const parsedData = JSON.parse(data.contents);
        console.log('Fetched data:', parsedData); // Log the fetched data
        setQuiz(parsedData);
        setTimeLeft(parsedData.duration * 60);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch quiz data:', error); // Log the error
        setError(`Failed to fetch quiz data: ${error.message}`);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [started, timeLeft]);

  const handleStartQuiz = () => {
    setStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  const handleSelectOption = (optionId: number) => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options.find(
      (opt) => opt.id === optionId
    )?.is_correct;

    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      isCorrect: isCorrect || false,
    };

    setUserAnswers((prev) => [...prev, answer]);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <QuizCard quiz={quiz} onStart={handleStartQuiz} />
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <QuizResults quiz={quiz} userAnswers={userAnswers} onRetry={handleStartQuiz} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <QuizProgress
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
          timeLeft={timeLeft}
        />
        <QuestionCard
          question={quiz.questions[currentQuestionIndex]}
          selectedOptionId={null}
          onSelectOption={handleSelectOption}
        />
      </div>
    </div>
  );
};

export default App;