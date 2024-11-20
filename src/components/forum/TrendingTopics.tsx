import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card } from '../common/Card';

export const TrendingTopics: React.FC = () => {
  const trends = [
    { id: 1, topic: 'Final Exams', posts: 156 },
    { id: 2, topic: 'Campus Events', posts: 89 },
    { id: 3, topic: 'Study Groups', posts: 67 },
    { id: 4, topic: 'Career Fair', posts: 45 },
    { id: 5, topic: 'Research Projects', posts: 34 }
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-indigo-600" />
        <h2 className="font-semibold text-gray-900 dark:text-white">Trending Topics</h2>
      </div>
      <div className="space-y-3">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer text-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            <span className="text-sm font-medium">#{trend.topic}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{trend.posts} posts</span>
          </div>
        ))}
      </div>
    </Card>
  );
};