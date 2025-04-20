import { useState } from 'react';

const CommentForm = ({ blogId, onCommentAdded }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      blogId,
      author,
      content,
    };

    try {
      const res = await fetch('http://localhost:4000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        setContent('');
        setAuthor('');
        onCommentAdded(); // trigger refresh
      } else {
        console.error('Failed to post comment');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      />
      <textarea
        placeholder="Your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        style={{ display: 'block', width: '100%', height: '100px' }}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
