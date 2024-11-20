import React, { useState, useRef } from 'react';
import { Search, Users, Calendar, Lightbulb } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { CreatePostForm } from '../components/forum/CreatePostForm';
import { PostList } from '../components/forum/PostList';
import { TrendingTopics } from '../components/forum/TrendingTopics';
import type { ForumPost } from '../types';

const initialPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Important: Final Exam Schedule Changes',
    content: 'Due to the upcoming campus event, there have been some adjustments to the final exam schedule. Please check the updated timetable on the student portal.',
    author: {
      id: 'prof1',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@university.edu',
      role: 'faculty',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    },
    category: 'announcements',
    tags: ['exams', 'important'],
    createdAt: '2024-03-15T09:00:00Z',
    upvotes: 45,
    downvotes: 0,
    replies: [
      {
        id: 'r1',
        content: 'Thank you for the update! Will the changes affect all departments?',
        author: {
          id: 'student1',
          name: 'Alex Chen',
          email: 'alex@university.edu',
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80'
        },
        createdAt: '2024-03-15T09:15:00Z',
        upvotes: 2,
        downvotes: 0
      }
    ],
    image: 'https://images.unsplash.com/photo-1522661067900-ab829854a57f?auto=format&fit=crop&w=800&q=80'
  },
  // ... rest of the initialPosts array remains the same
];

export const Forum = () => {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const replyFormRef = useRef<HTMLDivElement>(null);

  const categories = ['all', 'announcements', 'academic', 'events', 'general'];

  const handleCreatePost = (newPost: Omit<ForumPost, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'replies'>) => {
    const post: ForumPost = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      replies: []
    };
    setPosts(prev => [post, ...prev]);
    setIsModalOpen(false);
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, upvotes: post.upvotes + 1, liked: true } : post
    ));
  };

  const handleReply = (postId: string, content: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newReply = {
          id: Date.now().toString(),
          content,
          author: {
            id: 'current-user',
            name: 'Current User',
            email: 'user@university.edu',
            role: 'student',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
          },
          createdAt: new Date().toISOString(),
          upvotes: 0,
          downvotes: 0
        };
        return {
          ...post,
          replies: [...post.replies, newReply]
        };
      }
      return post;
    }));
  };

  const filteredPosts = posts
    .filter(post => 
      (selectedCategory === 'all' || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Mobile Collapsible */}
        <div className="lg:col-span-1">
          <div className="lg:hidden mb-4">
            <details className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <summary className="p-4 cursor-pointer font-semibold">Quick Links & Trending</summary>
              <div className="p-4 border-t dark:border-gray-700">
                <QuickLinks />
                <div className="mt-4">
                  <TrendingTopics />
                </div>
              </div>
            </details>
          </div>
          <div className="hidden lg:block">
            <QuickLinks />
            <div className="mt-6">
              <TrendingTopics />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header Section */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Community Forum</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Create Post
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 
                    bg-white dark:bg-gray-800 
                    border border-gray-200 dark:border-gray-700 
                    rounded-lg 
                    text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    hover:border-gray-300 dark:hover:border-gray-600
                    shadow-sm
                    transition-all duration-200"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 
                  bg-white dark:bg-gray-800 
                  border border-gray-200 dark:border-gray-700 
                  rounded-lg 
                  text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  hover:border-gray-300 dark:hover:border-gray-600
                  shadow-sm
                  transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-white dark:bg-gray-800">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
                className="w-full sm:w-auto px-4 py-2 
                  bg-white dark:bg-gray-800 
                  border border-gray-200 dark:border-gray-700 
                  rounded-lg 
                  text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  hover:border-gray-300 dark:hover:border-gray-600
                  shadow-sm
                  transition-all duration-200"
              >
                <option value="newest" className="bg-white dark:bg-gray-800">Newest</option>
                <option value="popular" className="bg-white dark:bg-gray-800">Popular</option>
              </select>
            </div>
          </div>

          {/* Posts List */}
          <PostList 
            posts={filteredPosts}
            onLike={handleLike}
            onReply={handleReply}
            replyFormRef={replyFormRef}
          />
        </div>
      </div>

      {/* Create Post Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreatePostForm onSubmit={handleCreatePost} />
      </Modal>
    </div>
  );
};

const QuickLinks = () => (
  <Card className="p-4">
    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h2>
    <div className="space-y-2">
      <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
        <Users className="w-5 h-5 text-indigo-600" />
        <span>Study Groups</span>
      </a>
      <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <span>Events</span>
      </a>
      <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
        <Lightbulb className="w-5 h-5 text-indigo-600" />
        <span>Resources</span>
      </a>
    </div>
  </Card>
);