import React from 'react';
import { Comment } from '@/hooks/useComments';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <div className="space-y-8">
    {comments.map((comment) => (
      <div key={comment.id} className="bg-inherit">
        <div className="flex items-start space-x-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
            {comment.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-200">{comment.author}</p>
            <p className="text-gray-400 text-xs">
              {new Date(comment.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className="pl-13 ml-10">
          <p className="text-gray-300 leading-relaxed">{comment.content}</p>
        </div>
      </div>
    ))}
  </div>
);

export default CommentList;