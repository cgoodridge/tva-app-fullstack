import React from 'react';

const CommentsList = ({ comments }) => (
    <>
    <h3>Status Reports</h3>
        {comments.map((comment, key) => (
            <div key={key}>
                <h4>{comment.username}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
    </>
)

export default CommentsList;