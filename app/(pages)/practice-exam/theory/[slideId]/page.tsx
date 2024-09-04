import { Metadata } from "next";
import { getSlideContent } from '@/app/serverActions/getSlideContent';
import { cookies } from 'next/headers';
import { generateTheoreticalQuestions } from "@/app/serverActions/getTheoryExams";
import TheoryModule from "@/app/components/practice-exams/TheoryContainer";

export const metadata: Metadata = {
  title: 'Theory',
};

async function Theory({ params, searchParams }: { params: { slideId: string }, searchParams: { numberOfQuestions?: string, difficulty?: string } }) {
  const sessionCookie = cookies().get('session')?.value;
  const slideId = params.slideId;

  // Fetch slide content using server action
  const { slideContent } = await getSlideContent({ slideId, sessionCookie });

  // Extract search params for number of questions and difficulty
  const numberOfQuestions = searchParams.numberOfQuestions || '5';
  const difficulty = searchParams.difficulty || 'medium';

  // Generate practice exams using the parameters
  const { theoreticalQuestions } = await generateTheoreticalQuestions(slideContent, numberOfQuestions, difficulty);

  console.log(theoreticalQuestions);
  return (
    <main className="p-0 py-4">
      <TheoryModule theoreticalQuestions={theoreticalQuestions} />
    </main>
  )
}

export default Theory