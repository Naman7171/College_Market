// src/components/forum/PostCardWithReplies.tsx

import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';

interface Reply {
  id: string;
  author: string;
  content: string;
  date: string;
}

interface PostCardWithRepliesProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  replies: Reply[];
  onAddReply: (postId: string, reply: Reply) => void;
}

export const PostCardWithReplies: React.FC<PostCardWithRepliesProps> = ({
  id,
  title,
  content,
  author,
  date,
  imageUrl,
  replies,
  onAddReply,
}) => {
  const [newReply, setNewReply] = useState('');

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reply: Reply = {
      id: Date.now().toString(),
      author: 'Current User',
      content: newReply,
      date: new Date().toISOString().split('T')[0],
    };
    onAddReply(id, reply);
    setNewReply(''); // Clear the input
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{`By ${author} on ${date}`}</p>
      {imageUrl && <img src={imageUrl} alt="Post Image" className="mt-2 rounded-lg" />}
      <p className="text-sm text-gray-700 mt-2">{content}</p>

      <div className="mt-4">
        <h4 className="text-md font-semibold">Replies</h4>
        <ul className="space-y-2 mt-2">
          {replies.map((reply) => (
            <li key={reply.id} className="text-sm text-gray-800 dark:text-gray-200">
              <p>
                <span className="font-bold">{reply.author}</span> - {reply.date}
              </p>
              <p>{reply.content}</p>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleReplySubmit} className="mt-4">
        <Input
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write a reply..."
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Reply
        </button>
      </form>
    </Card>
  );
};
