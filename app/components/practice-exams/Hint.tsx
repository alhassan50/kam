interface HintButtonProps {
    handleHintClick: () => void;
    isAnswered: boolean;
    showHint: boolean;
    hint: string
}

function Hint({handleHintClick, isAnswered, showHint, hint}: HintButtonProps) {
  return (
    <button 
          onClick={handleHintClick}
          disabled={isAnswered}
          className={`w-full relative md:max-w-[200px] py-2 rounded font-semibold transition-all duration-200 ${
            isAnswered ? 'bg-[#6e6e6e] py-4 rounded-[4px] text-[#fff] cursor-not-allowed' : 'btn-primary hover:bg-blue-600 text-white'
          }`}
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
          {showHint && (
            <div className="bg-gray-100 absolute bottom-[110%] p-2 rounded border border-[var(--bg-card)] shadow-md mt-2">
              <p className='text-[14px] text-left text-[#171717]'>
                {hint}
              </p>
            </div>
          )}
        </button>
  )
}

export default Hint