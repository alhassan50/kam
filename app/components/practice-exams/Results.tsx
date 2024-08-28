interface ResultsProps {
    score: number;
    totalQuestions: number;
  }
  
  const Results = ({ score, totalQuestions }: ResultsProps) => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl">Your Score: {score} / {totalQuestions}</p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => window.location.reload()}>
          Retake Quiz
        </button>
      </div>
    );
  };
  
  export default Results;
  