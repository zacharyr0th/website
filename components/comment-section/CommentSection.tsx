'use client';

import React from 'react';
import { useComments } from '@/hooks/useComments';
import { useCommentForm } from '@/hooks/useCommentForm';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const CommentSection: React.FC<{ postSlug: string }> = ({ postSlug }) => {
  const { comments, error, isLoading } = useComments(postSlug);
  const { handleSubmit, authorName, setAuthorName, newComment, setNewComment } =
    useCommentForm(postSlug);

  return (
    <section className="mt-12 bg-inherit text-gray-300">
      <h2 className="text-3xl font-bold mb-8 text-white">Comments</h2>
      {error && (
        <p className="text-red-400 mb-4 p-4 bg-red-900 bg-opacity-20 rounded-lg">{error}</p>
      )}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-300"></div>
        </div>
      ) : (
        <CommentList comments={comments} />
      )}
      <div className="mt-8 border-t border-gray-700 pt-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Leave a comment</h3>
        <CommentForm
          authorName={authorName}
          setAuthorName={setAuthorName}
          newComment={newComment}
          setNewComment={setNewComment}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default CommentSection;
