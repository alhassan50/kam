import MCQContainer from '@/app/components/practice-exams/MCQContainer ';
import { generatePracticeExams } from '@/app/serverActions/getPracticeExams';
import { getSlideContent } from '@/app/serverActions/getSlideContent';
import { cookies } from 'next/headers';

// Server component
export default async function MCQs({ params, searchParams }: { params: { slideId: string }, searchParams: { numberOfQuestions?: string, difficulty?: string } }) {
  const sessionCookie = cookies().get('session')?.value;
  const slideId = params.slideId;

  // Fetch slide content using server action
  const { slideContent } = await getSlideContent({ slideId, sessionCookie });

  // Extract search params for number of questions and difficulty
  const numberOfQuestions = searchParams.numberOfQuestions || '5';
  const difficulty = searchParams.difficulty || 'medium';

  // Generate practice exams using the parameters
  const { practiceTest } = await generatePracticeExams(slideContent, numberOfQuestions, difficulty);

  console.log(practiceTest);
  

  return (
    <main className="p-0">
      <MCQContainer questions={practiceTest.questions} />
    </main>
  );
}
