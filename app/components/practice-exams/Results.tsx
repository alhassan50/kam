import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ResultsProps {
  score: number;
  totalQuestions: number;
}

const Results = ({ score, totalQuestions }: ResultsProps) => {
  const { width, height } = useWindowSize();
  const passed = score / totalQuestions >= 0.5;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
      {passed && <Confetti width={width} height={height} />}
      <h2 className="text-4xl font-bold mb-6">Quiz Completed!</h2>
      <p className="text-[80px] font-extrabold text-green-500 mb-4">
        {score} / {totalQuestions}
      </p>
      <p className="text-xl font-medium mb-8">
        {passed ? 'Congratulations! You passed the quiz!' : 'Good try! Keep practicing!'}
      </p>
      <button
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md"
        onClick={() => window.location.reload()}
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default Results;
