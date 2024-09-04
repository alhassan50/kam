'use client'

import React, { useState } from 'react';

// TheoryContainer component
const TheoryContainer = ({ question, answer }: { question: string; answer: string }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="my-4 p-4 rounded hover:shadow-md transition-all duration-200 border border-[var(--bg-card)]">
      <h3 className="font-medium">{question}</h3>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? 'Hide Explanation' : 'View Explanation'}
      </button>
      {showAnswer && (
        <div className="mt-4 p-4 border rounded">
          <p className='text-sm'>{answer}</p>
        </div>
      )}
    </div>
  );
};

// TheoryModule component
const TheoryModule = ({ theoreticalQuestions }: { theoreticalQuestions: { question: string; answer: string }[] }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {theoreticalQuestions.map((q, index) => (
        <TheoryContainer key={index} question={q.question} answer={q.answer} />
      ))}
    </div>
  );
};

export default TheoryModule;
