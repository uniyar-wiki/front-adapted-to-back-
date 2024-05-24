import React, { useState, useEffect } from 'react';
import './CommentSection.css';
const CommentSection = ({ teacherId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const fetchComments = async () => {
      
    try {
      const response = await fetch(`http://localhost:5000/api/Comments/teacher/${teacherId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  useEffect(() => {
    

    fetchComments();
  }, [teacherId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/Comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          teacherId,
          userId,
          content: newComment,
          time: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchComments();
      setNewComment('');
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="comment-section">
      {userId && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
     <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            {comment.first && comment.last ? (
              <>
                <strong>{comment.first} {comment.last}</strong>
                <p>{comment.content}</p>
                <small>{new Date(comment.time).toLocaleString()}</small>
              </>
            ) : (
              <p>Invalid comment data</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
