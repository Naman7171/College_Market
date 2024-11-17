import React from 'react';
import { ThumbsUp, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Card } from '../common/Card';
import type { ForumPost } from '../../types';

interface PostListProps {
  posts: ForumPost[];
  onLike: (postId: string) => void;
  onReply: (postId: string) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onLike, onReply }) => {
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-start gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold hover:text-indigo-600 cursor-pointer">
                      {post.author.name}
                    </h2>
                    {post.author.role === 'faculty' && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Faculty
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{post.content}</p>
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post attachment"
                  className="mt-4 rounded-lg max-h-96 w-full object-cover"
                />
              )}

              <div className="mt-4 flex items-center justify-between border-t border-b border-gray-100 py-3">
                <button 
                  onClick={() => onLike(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <ThumbsUp className={`w-5 h-5 ${post.liked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                  <span>{post.upvotes} likes</span>
                </button>
                <button 
                  onClick={() => onReply(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.replies.length} replies</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  <Bookmark className="w-5 h-5" />
                  <span>Save</span>
                </button>
              </div>

              {post.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                  {post.replies.slice(0, 2).map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3 pl-6 border-l-2 border-gray-100">
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{reply.author.name}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-1">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                  {post.replies.length > 2 && (
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium ml-6">
                      View all {post.replies.length} replies
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};