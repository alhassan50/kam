import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Server action to generate theoretical questions with answers
export async function generateTheoreticalQuestions(slideContent: string, numberOfQuestions: string, difficulty: string) {
  try {
    if (!slideContent || typeof slideContent !== 'string') {
      throw new Error('Invalid slide content');
    }

    // Updated prompt for generating theoretical questions
    const prompt = `
      You are an AI assistant generating personalized theoretical questions for students. Based on the following slide content, create a series of questions that test the student's understanding of the material.

      Slide Content: ${slideContent}

      Requirements:
      1. Generate ${numberOfQuestions} theoretical questions. The difficulty should be ${difficulty}.
      2. Each question should be open-ended and designed to test deeper understanding.
      3. Provide a detailed answer for each question. This answer should be revealed only when the user clicks a 'View Answer' button.
      4. Provide questions in the JSON format with these properties:
        - "question": "The content of the theoretical question"
        - "answer": "The detailed answer to the question"
      5. Ensure that the questions are clear, concise, and relevant to the slide content provided.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: {
        type: 'json_object', // specify the format
      },
      messages: [
        { role: 'system', content: 'You are an AI assistant expert in generating theoretical questions.' },
        { role: 'user', content: prompt },
      ],
    });

    // Parse the JSON response
    const messageContent: string | null = completion.choices[0]?.message?.content;

    if (!messageContent) {
      throw new Error('Failed to generate valid response from OpenAI');
    }

    const generatedQuestions = JSON.parse(messageContent);

    return { theoreticalQuestions: generatedQuestions.questions };
  } catch (error) {
    console.error('Error generating theoretical questions:', error);
    throw new Error('Failed to generate theoretical questions');
  }
}
