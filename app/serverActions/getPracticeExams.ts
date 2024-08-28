// Define the server action with static mock data
export async function generatePracticeExams(slideContent: string, numberOfQuestions: string, difficulty: string) {
    try {
      // Validate slideContent
      if (!slideContent || typeof slideContent !== 'string') {
        throw new Error('Invalid slide content');
      }
  
      // Static mock data for testing
      const staticMockData = {
        questions: [
          {
            type: 'MCQ',
            question: 'What is the primary focus of financial management for a new venture?',
            options: ['Maximizing profits', 'Managing finances for highest return', 'Minimizing expenses', 'Raising capital'],
            correctAnswer: 'Managing finances for highest return',
            hint: "Consider what purpose financial management serves in a company's operations."
          },
          {
            type: 'MCQ',
            question: "Which of the following financial statements reflects a firm's performance over a specific period?",
            options: ['Balance Sheet', 'Income Statement', 'Cash Flow Statement', 'Equity Statement'],
            correctAnswer: 'Income Statement',
            hint: 'Think about which statement shows revenues and expenses over time.'
          },
          {
            type: 'True/False',
            question: 'Pro forma financial statements are required by the SEC.',
            options: ['True', 'False'],
            correctAnswer: false,
            hint: 'Consider the difference between required and voluntary financial reporting.'
          },
          {
            type: 'MCQ',
            question: "Which financial objective relates to a firm's ability to meet short-term obligations?",
            options: ['Profitability', 'Liquidity', 'Leverage', 'Growth'],
            correctAnswer: 'Liquidity',
            hint: 'This objective is crucial for a firm to continue its daily operations.'
          },
          {
            type: 'MCQ',
            question: 'What is the first forecast developed by a new firm?',
            options: ['Profit forecast', 'Sales forecast', 'Expense forecast', 'Revenue forecast'],
            correctAnswer: 'Sales forecast',
            hint: 'This forecast sets the stage for most other financial predictions.'
          }
        ]
      }
      
  
      // Simulate processing of slideContent, numberOfQuestions, and difficulty
      console.log(`Slide Content: ${slideContent}`);
      console.log(`Number of Questions: ${numberOfQuestions}`);
      console.log(`Difficulty: ${difficulty}`);
  
      // Return the mock data instead of making an API call
      return { practiceTest: staticMockData };
  
    } catch (error) {
      console.error('Error generating practice test:', error);
      throw new Error('Failed to generate practice test');
    }
  }
  