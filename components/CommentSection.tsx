'use client';

import { useState } from 'react';

type Comment = {
  id: string;
  author: string;
  content: string;
  date: string;
};

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); 
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postSlug,
          content: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const newCommentData: Comment = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setErrorMessage('Failed to submit comment. Please try again.');
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmitComment} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Write a comment..."
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Comment
        </button>
        {errorMessage && (
          <p className="mt-2 text-red-500">{errorMessage}</p>
        )}
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-md">
            <p className="font-semibold">{comment.author}</p>
            <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleString()}</p>
            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}