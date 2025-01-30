export interface Question {
  id: number;
  description: string;
  options: {
    id: number;
    description: string;
    is_correct: boolean;
  }[];
  detailed_solution: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  correct_answer_marks: number;
  negative_marks: number;
}

export interface UserAnswer {
  questionId: number;
  selectedOptionId: number;
  isCorrect: boolean;
}