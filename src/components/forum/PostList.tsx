import React from 'react';
import { ThumbsUp, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Card } from '../common/Card';
import type { ForumPost } from '../../types';

interface PostListProps {
  posts: ForumPost[];
  onLike: (postId: string) => void;
  onReply: (postId: string, content: string) => void;
  replyFormRef: React.RefObject<HTMLDivElement>;
}

export const PostList: React.FC<PostListProps> = ({ posts, onLike, onReply, replyFormRef }) => {
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <Card key={post.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 cursor-pointer">
                      {post.author.name}
                    </h2>
                    {post.author.role === 'faculty' && (
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-xs font-medium">
                        Faculty
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs capitalize">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">{post.title}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post attachment"
                  className="mt-4 rounded-lg max-h-96 w-full object-cover"
                />
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-3 gap-2">
                <button 
                  onClick={() => onLike(post.id)}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <ThumbsUp className={`w-5 h-5 ${post.liked ? 'fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400' : ''}`} />
                  <span>{post.upvotes} likes</span>
                </button>
                <button 
                  onClick={() => onReply(post.id, '')}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.replies.length} replies</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Bookmark className="w-5 h-5" />
                  <span>Save</span>
                </button>
              </div>

              {post.replies.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">Replies</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.replies.length} replies</span>
                  </div>
                  <div className="max-h-48 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-3 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                        <img
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">{reply.author.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(reply.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mt-1">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div ref={replyFormRef} className="mt-4">
                <textarea
                  placeholder="Write a reply..."
                  className="w-full px-3 py-2 
                    bg-white dark:bg-gray-800 
                    border border-gray-200 dark:border-gray-700 
                    rounded-lg 
                    text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                    hover:border-gray-300 dark:hover:border-gray-600
                    resize-none
                    transition-all duration-200"
                  rows={3}
                />
                <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};