interface ProgressBarProps {
    currentQuestionIndex: number;
    totalQuestions: number;
  }
  
  const ProgressBar = ({ currentQuestionIndex, totalQuestions }: ProgressBarProps) => {
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
    return (
      <div className="w-full md:w-[90%] h-2 bg-gray-200 rounded overflow-hidden my-4">
        <div
          className="bg-blue-500 h-full transition-width duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    );
  };
  
  export default ProgressBar;
  