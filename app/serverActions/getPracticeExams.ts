import { log } from 'console';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Server action to generate practice exams with hints
export async function generatePracticeExams(slideContent: string, numberOfQuestions: string, difficulty: string) {
  try {
    if (!slideContent || typeof slideContent !== 'string') {
      throw new Error('Invalid slide content');
    }

    // Updated prompt to include hints for each question
    const prompt = `
      You are an AI assistant generating a personalized practice test for students. Based on the following slide content, create a dynamic and engaging test with hints for each question.

      Slide Content: ${slideContent}

      Requirements:
      1. Generate ${numberOfQuestions} practice questions. The difficulty should be ${difficulty}.
      2. The majority of the questions should be multiple-choice (MCQs) with at least 4 options, ensuring only one correct answer.
      3. Include at least 1-2 True/False questions to add variety but make sure these are the minority.
      4. Provide a hint for each question to assist the student if they need help. The hint should be relevant but not give away the answer directly.
      5. Provide questions in the JSON format with these properties:
        - "type": "MCQ" or "True/False"
        - "question": "The content of the question"
        - "options": ["Option1", "Option2", ..., "OptionN"] (for MCQs) and ["True", "False"] (for True/False)
        - "correctAnswer": "The correct answer text" (for MCQs) or true/false (for True/False)
        - "hint": "A clue or helpful tip for solving the question"
      6. Ensure that the questions are clear, concise, and relevant to the slide content provided.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: {
        type: 'json_object', // specify the format
      },
      messages: [
        { role: 'system', content: 'You are an AI assistant expert in generating practice tests.' },
        { role: 'user', content: prompt },
      ],
    });

    // Parse the JSON response
    const messageContent: string | null = completion.choices[0]?.message?.content;

    if (!messageContent) {
    throw new Error('Failed to generate valid response from OpenAI');
    }

    const generatedTest = JSON.parse(messageContent);

    return { practiceTest: generatedTest };
  } catch (error) {
    console.error('Error generating practice test:', error);
    throw new Error('Failed to generate practice test');
  }
}
