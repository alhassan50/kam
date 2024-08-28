interface AnswersProps {
  answers: string[];
  selectedAnswer: string | null;
  correctAnswer: string | boolean;
  onSelect: (answer: string) => void;
  isAnswered: boolean;
}

const Answers = ({ answers, selectedAnswer, correctAnswer, onSelect, isAnswered }: AnswersProps) => {
  const checkAnswerEquality = (answer: string | boolean, correctAnswer: string | boolean) => {
    if (typeof correctAnswer === 'boolean') {
      // Convert the answer to a boolean and compare
      return String(correctAnswer).toLowerCase() === String(answer).toLowerCase();
    } else if (typeof correctAnswer === 'string' && typeof answer === 'string') {
      // Compare both as lowercase strings
      return correctAnswer.toLowerCase() === answer.toLowerCase();
    }
    return false;
  };
  

  const getAnswerStyle = (answer: string) => {
    if (isAnswered) {
      if (checkAnswerEquality(answer, correctAnswer)) return "bg-green-500 text-white";
      if (answer === selectedAnswer && !checkAnswerEquality(answer, correctAnswer)) return "bg-red-500 text-white";
    }
    return selectedAnswer === answer ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300";
  };

  const getLabelStyle = (answer: string) => {
    if (isAnswered) {
      if (checkAnswerEquality(answer, correctAnswer)) return "bg-green-500 text-white";
      if (answer === selectedAnswer && !checkAnswerEquality(answer, correctAnswer)) return "bg-red-500 text-white";
    }
    return selectedAnswer === answer ? "bg-blue-500 text-white" : "bg-[#6e6e6e] text-white";
  };

  return (
    <div className="flex flex-col gap-5">
      {answers.map((answer, index) => (
        <button
          key={answer}
          onClick={() => !isAnswered && onSelect(answer)}
          className={`p-3 rounded-[4px] text-left text-[#171717] border border-[var(--bg-card)] transition-all duration-200 flex gap-4 items-center ${getAnswerStyle(answer)} `}
          disabled={isAnswered}
        >
          <div className={`px-4 py-2 flex justify-center items-center border border-[var(--bg-card)] rounded ${getLabelStyle(answer)}`}>
            <h3 className="text-[#fff]">
              {String.fromCharCode('A'.charCodeAt(0) + index)}
            </h3>
          </div>
          <h3>{answer}</h3>
        </button>
      ))}
    </div>
  );
};

export default Answers;
