// src/pages/Forum.tsx

import React, { useState } from 'react';
import { PostCard } from '../components/forum/PostCard';
import { PostQuestionForm } from '../components/forum/PostQuestionForm';
import { CommunityHeader } from '../components/forum/CommunityHeader';
import { Modal } from '../components/common/Modal';

interface Reply {
  id: string;
  author: string;
  content: string;
  date: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  category: string;
  replies: Reply[];
}

export const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReply = (postId: string, reply: Reply) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, replies: [...post.replies, reply] }
          : post
      )
    );
  };

  const handleAddPost = (title: string, content: string, category: string, imageUrl?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      author: 'Current User',
      date: new Date().toISOString().split('T')[0],
      imageUrl,
      category,
      replies: [],
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setIsModalOpen(false);
  };

  const handleOpenCreatePostModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreatePostModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <CommunityHeader onOpenCreatePostModal={handleOpenCreatePostModal} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            {...post}
            onAddReply={handleAddReply}
          />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseCreatePostModal}>
        <PostQuestionForm onAddPost={handleAddPost} />
      </Modal>
    </div>
  );
};
