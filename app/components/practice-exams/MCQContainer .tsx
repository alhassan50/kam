'use client';

import { useState } from 'react';
import Question from './Question';
import Answers from './Answers';
import SubmitButton from './SubmitButton';
import NextButton from './NextButton';
import ProgressBar from './ProgressBar';
import Results from './Results';
import Hint from './Hint';

interface QuestionData {
  question: string;
  options: string[]; 
  correctAnswer: string | boolean;
  type: string;
  hint: string;
}

interface MCQContainerProps {
  questions: QuestionData[];
}

const MCQContainer = ({ questions }: MCQContainerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false); // State to control hint visibility

  console.log("questionsquestionsquestionsquestions: ", questions);
  

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowHint(false); // Reset hint state for the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleHintClick = () => {
    setShowHint(prev => !prev); // Show hint when clicked
  };

  if (isQuizCompleted) {
    return <Results score={score} totalQuestions={questions.length} />;
  }

  return (
    <div className="h-full flex flex-col relative">
      <div className="md:grid md:grid-cols-2 gap-5 flex-1 items-start p-4 md:p-10">
        <div className="md:sticky top-10 mb-5 md:mb-0 grid gap-3">
          <Question text={currentQuestion.question} questionNumber={currentQuestionIndex + 1} />
          <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />
        </div>
        <div>
          <Answers
            answers={currentQuestion.options}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onSelect={handleAnswerSelect}
            isAnswered={isAnswered}
          />
        </div>
      </div>
      <div className="md:sticky blur-bg backdrop-blur bottom-0 left-0 right-0 flex flex-col md:flex-row justify-end gap-4 p-4 md:px-10 border-t border-[var(--border-color)]">
        <Hint handleHintClick={handleHintClick} isAnswered={isAnswered} showHint={showHint} hint={currentQuestion.hint} />
        <SubmitButton 
          selectedAnswer={selectedAnswer} 
          isAnswered={isAnswered} 
          onSubmit={handleSubmit} 
        />
        <NextButton 
          label={currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'} 
          isAnswered={isAnswered} 
          onNext={handleNextQuestion} 
        />
      </div>
    </div>
  );
};

export default MCQContainer;
