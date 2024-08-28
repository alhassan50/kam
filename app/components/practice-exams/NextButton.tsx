interface NextButtonProps {
    isAnswered: boolean;
    onNext: () => void;
    label: string
  }
  
  const NextButton = ({ isAnswered, onNext, label }: NextButtonProps) => {
    return (
      <button
        onClick={onNext}
        className={`w-full md:max-w-[200px] py-2 rounded font-semibold transition-all duration-200 ${
          !isAnswered ? 'cursor-not-allowed py-4 rounded-[4px] text-[#fff] bg-[#6e6e6e]' : 'btn-primary'
        }`}
        disabled={!isAnswered}
      >
        {label}
      </button>
    );
  };
  
  export default NextButton;
  