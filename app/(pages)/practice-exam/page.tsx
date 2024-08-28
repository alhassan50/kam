import ExamSettings from '@/app/components/practice-exams/ExamSettings'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice Exam',
};

function PracticeTest() {
  const defaultValues = {
    slideId: "",
    examFormat: 'mcq' as 'mcq' | 'theory',
    numberOfQuestions: 5,
    difficulty: 'medium'
  };

  return (
    <main className='flex justify-center sm:items-center items-start'>
      <div className="sm:p-5 sm:bg-[var(--dialogue-primary)] sm:rounded max-w-[600px]">
        {/* <h2>
          Be patient! Practice Exam is coming soon....
        </h2> */}
        <ExamSettings defaultValues={defaultValues} />
      </div>
    </main>
  )
}

export default PracticeTest
