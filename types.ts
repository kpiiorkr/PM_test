
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SCENARIO = 'SCENARIO'
}

export interface Choice {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  day: number;
  type: QuestionType;
  title: string;
  context?: string;
  question: string;
  choices: Choice[];
  correctAnswerId: number;
  explanation: string;
}

export interface UserAnswer {
  questionId: number;
  selectedId: number;
  isCorrect: boolean;
}

export enum AppMode {
  START = 'START',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
  REVIEW = 'REVIEW'
}
