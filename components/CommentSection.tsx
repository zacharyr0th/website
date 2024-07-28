'use client';

import React, { useState, useEffect } from 'react';

type Comment = {
  id: string;
  author: string;
  content: string;
  date: string;
};

const CommentSection: React.FC<{ postSlug: string }> = ({ postSlug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, [postSlug]);

  const fetchComments = async () => {
    // TODO: Replace with actual API call
    const response = await fetch(`/api/comments?postSlug=${postSlug}`);
    const data = await response.json();
    setComments(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(), // Temporary ID
      author: authorName,
      content: newComment,
      date: new Date().toISOString(),
    };

    // TODO: Replace with actual API call
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postSlug, comment }),
    });

    if (response.ok) {
      setComments([...comments, comment]);
      setNewComment('');
      setAuthorName('');
    } else {
      console.error('Failed to post comment');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">{comment.author}</p>
            <p className="text-gray-600 text-sm">{new Date(comment.date).toLocaleString()}</p>
            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="author" className="block mb-2 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="author"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block mb-2 font-semibold">
            Comment
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;