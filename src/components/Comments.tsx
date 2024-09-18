import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '@/store/features/commentSlice';
import { AppDispatch } from '@/store/Store';

interface CommentProps {
  comment: Comment;
  blogId: string;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, blogId }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
console.log(comment)
  const handleReply = () => {
    if (replyContent.trim() === '') return;

    // Dispatch the addComment action with parentCommentId (correct spelling)
    dispatch(addComment({
      blogId,
      userId: 'current-user-id', // Replace with the actual logged-in user's ID
      content: replyContent,
      parentCommentId: comment.$id, // Pass the current comment ID as parentCommentId
      createdAt: new Date().toISOString(),
    }));

    setReplyContent('');
    setShowReplyForm(false);
  };

  return (
    <div className="comment">
      <div className="comment-body">
        <p>{comment.content}</p>
        <button onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Reply to this comment..."
          />
          <button onClick={handleReply}>Post Reply</button>
        </div>
      )}

      {/* Render replies (if any) */}
      {comment.replies?.map((reply) => (
        <CommentComponent key={reply.$id} comment={reply} blogId={blogId} />
      ))}
    </div>
  );
};

export default CommentComponent;
