type ChatItem = {
    id: string;
    title: string;
    dateModified: string;
};

export const chatList: ChatItem[] = [
    {
      id: '1',
      title: 'Introduction to Entrepreneurship Skills',
      dateModified: new Date('2024-07-01T12:00:00Z').toISOString(),
    },
    {
      id: '2',
      title: 'Software Engineering II',
      dateModified: new Date('2024-07-02T14:30:00Z').toISOString(),
    },
    {
      id: '3',
      title: 'Computer Security',
      dateModified: new Date('2024-07-03T09:45:00Z').toISOString(),
    },
    {
      id: '4',
      title: 'Artificial Intelligence 2',
      dateModified: new Date('2024-07-04T16:20:00Z').toISOString(),
    },
    {
      id: '5',
      title: 'Data Structures and Algorithms',
      dateModified: new Date('2024-07-05T11:10:00Z').toISOString(),
    },
    {
      id: '6',
      title: 'Database Management Systems',
      dateModified: new Date('2024-07-06T08:50:00Z').toISOString(),
    },
    {
      id: '7',
      title: 'Open Source Operating Systems',
      dateModified: new Date('2024-07-07T15:00:00Z').toISOString(),
    },
    {
      id: '8',
      title: 'Machine Learning',
      dateModified: new Date('2024-07-08T10:30:00Z').toISOString(),
    },
  ];
  