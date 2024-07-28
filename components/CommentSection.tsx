'use client';

import React from 'react';
import { useComments } from '@/hooks/useComments';
import { useCommentForm } from '@/hooks/useCommentForm';
import CommentList from './CommentList';
import CommentForm from './comment-section/CommentForm';

const CommentSection: React.FC<{ postSlug: string }> = ({ postSlug }) => {
  const { comments, error, isLoading } = useComments(postSlug);
  const { handleSubmit, authorName, setAuthorName, newComment, setNewComment } = useCommentForm(postSlug);

  return (
    <section className="mt-12 bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Comments</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {isLoading ? (
        <p className="text-gray-400">Loading comments...</p>
      ) : (
        <CommentList comments={comments} />
      )}
      <CommentForm
        authorName={authorName}
        setAuthorName={setAuthorName}
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default CommentSection;