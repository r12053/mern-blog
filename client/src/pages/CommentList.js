import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';

const CommentsList = ({ blogId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/comments/${blogId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      } else {
        console.error('Failed to load comments');
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Comments</h3>
      <CommentForm blogId={blogId} onCommentAdded={fetchComments} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment._id} style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #ccc' }}>
              <p><strong>{comment.author}</strong></p>
              <p>{comment.content}</p>
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>No comments yet. Be the first!</p>
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
