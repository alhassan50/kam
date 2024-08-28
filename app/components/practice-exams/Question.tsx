interface QuestionProps {
    text: string;
    questionNumber: number;
  }
  
  const Question = ({ text, questionNumber }: QuestionProps) => {
    return (
      <div className="">
        <div>
          <p className="italic">
            Question {questionNumber}
          </p>
        </div>
        <h2 className="mt-3">
          {text}
        </h2>
      </div>
    );
  };
  
  export default Question;
  