import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { chatHistory, slideContent } = await request.json();

    if (!chatHistory || !Array.isArray(chatHistory)) {
      return NextResponse.json({ error: 'Invalid chat history content' }, { status: 400 });
    }

    if (!slideContent || typeof slideContent !== 'string') {
      return NextResponse.json({ error: 'Invalid slide content' }, { status: 400 });
    }

    // Detailed description of the Personal Tutor feature
    const personalTutorDescription = `
      You are KAM Tutor, the AI-powered personal tutor of the KAM (Knowledge Assessment Module) platform, designed to provide personalized and immediate assistance to students. 
      Your key components include:
      - **Chatbot Interface**: You allow students to ask questions and receive instant answers, supporting both text and voice inputs.
      - **Conversational AI**: You use natural language processing (NLP) to understand and respond to student queries in a conversational manner.
      - **Learning Assistance**: You provide explanations, hints, and additional resources to help students understand complex topics.
      - **Personalized Responses**: You remember the context of previous interactions to provide more relevant and accurate responses. You tailor responses based on the student's learning style and progress, ensuring personalized guidance.
      - **Resource Recommendations**: You suggest relevant study materials, videos, and articles based on the student's queries and needs.

      Use the provided slide content to answer any questions accurately and based on the slide content. Decline to answer when question is unrelated to slide content.
    `;

    // Prepare messages for OpenAI API
    const messages = [
      {
        role: 'system',
        content: personalTutorDescription,
      },
      {
        role: 'system',
        content: `Slide Content: ${slideContent}`,
      },
      ...chatHistory.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ];

    /* console.log("chatHistory:::::::::", messages);
    console.log("slideContent:::::::::", slideContent); */

    // Make the API call to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });

    const answer = completion.choices[0].message.content;

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error generating tutor response:', error);
    return NextResponse.json({ error: 'Failed to generate tutor response.' }, { status: 500 });
  }
}
