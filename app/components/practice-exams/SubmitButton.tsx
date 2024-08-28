interface SubmitButtonProps {
    selectedAnswer: string | null;
    isAnswered: boolean;
    onSubmit: () => void;
}
  
  const SubmitButton = ({ selectedAnswer, isAnswered, onSubmit }: SubmitButtonProps) => {
    const isDisabled = !selectedAnswer || isAnswered;
  
    return (
      <button
        onClick={onSubmit}
        className={`w-full md:max-w-[200px] py-2 rounded font-semibold transition-all duration-200 ${
          isDisabled ? 'bg-[#6e6e6e] py-4 rounded-[4px] text-[#fff] cursor-not-allowed' : 'btn-primary hover:bg-blue-600 text-white'
        }`}
        disabled={isDisabled}
      >
        Submit Answer
      </button>
    );
  };
  
  export default SubmitButton;
  