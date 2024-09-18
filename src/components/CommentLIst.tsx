import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment } from '@/store/features/commentSlice';
import { AppDispatch, RootState } from '@/store/Store';
import CommentComponent from './Comments';

interface CommentListProps {
  blogId: string;
}

const CommentList: React.FC<CommentListProps> = ({ blogId }) => {
  const dispatch: AppDispatch = useDispatch();
  const { comments, loading, error } = useSelector((state: RootState) => state.comments);
  const [newComment, setNewComment] = useState<string>('');

  // Fetch comments when the component mounts or when blogId changes
  useEffect(() => {
    dispatch(fetchComments(blogId));
  }, [dispatch, blogId]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    // Dispatch the addComment action
    dispatch(addComment({
      blogId,
      userId: 'current-user-id', // Replace with the actual logged-in user's ID
      content: newComment,
      parentCommentId: null, // Correct spelling: parentCommentId for direct comments
      createdAt: new Date().toISOString(),
    }));

    setNewComment(''); // Clear the input field after submission
  };

  return (
    <div className="comment-list">
      <h3>Comments</h3>
      {loading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      
      {/* Render the list of comments */}
      {comments.map((comment) => (
        <CommentComponent key={comment.$id} comment={comment} blogId={blogId} />
      ))}

      {/* Add new comment */}
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default CommentList;
