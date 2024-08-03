import { useState } from 'react';
import { useComments } from './useComments';

export const useCommentForm = (postSlug: string) => {
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const { refetchComments } = useComments(postSlug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postSlug, comment: { author: authorName, content: newComment } }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await refetchComments();
      setNewComment('');
      setAuthorName('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return { handleSubmit, authorName, setAuthorName, newComment, setNewComment };
};
