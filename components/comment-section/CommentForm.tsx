import React from 'react';

interface CommentFormProps {
  authorName: string;
  setAuthorName: (name: string) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({
  authorName,
  setAuthorName,
  newComment,
  setNewComment,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="author" className="block mb-1 text-sm font-medium text-gray-400">
        Name
      </label>
      <input
        type="text"
        id="author"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors duration-200"
        required
      />
    </div>
    <div>
      <label htmlFor="comment" className="block mb-1 text-sm font-medium text-gray-400">
        Comment
      </label>
      <textarea
        id="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors duration-200 resize-y"
        rows={4}
        required
      />
    </div>
    <div className="flex justify-end">
      <button
        type="submit"
        className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Post Comment
      </button>
    </div>
  </form>
);

export default CommentForm;
