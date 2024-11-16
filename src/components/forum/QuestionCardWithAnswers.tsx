// src/components/forum/QuestionCardWithAnswers.tsx

import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';

interface Answer {
  id: string;
  author: string;
  content: string;
  date: string;
}

interface QuestionCardWithAnswersProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  answers: Answer[];
  onAddAnswer: (questionId: string, answer: Answer) => void;
}

export const QuestionCardWithAnswers: React.FC<QuestionCardWithAnswersProps> = ({
  id,
  title,
  content,
  author,
  date,
  answers,
  onAddAnswer,
}) => {
  const [newAnswer, setNewAnswer] = useState('');

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer: Answer = {
      id: Date.now().toString(),
      author: 'Current User',
      content: newAnswer,
      date: new Date().toISOString().split('T')[0],
    };
    onAddAnswer(id, answer);
    setNewAnswer(''); // Clear the input
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{`By ${author} on ${date}`}</p>
      <p className="text-sm text-gray-700 mt-2">{content}</p>

      <div className="mt-4">
        <h4 className="text-md font-semibold">Answers</h4>
        <ul className="space-y-2 mt-2">
          {answers.map((answer) => (
            <li key={answer.id} className="text-sm text-gray-800 dark:text-gray-200">
              <p>
                <span className="font-bold">{answer.author}</span> - {answer.date}
              </p>
              <p>{answer.content}</p>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleAnswerSubmit} className="mt-4">
        <Input
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write an answer..."
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Answer
        </button>
      </form>
    </Card>
  );
};
