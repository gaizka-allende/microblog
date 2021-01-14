import React from "react";

const Post = ({ title, body, author, onDelete }) => (
	<div className="postView">
		<h2>{title}</h2>
		<p>{body}</p>
		<p>Posted by: {author}</p>
		<button onClick={onDelete}>Delete</button>
	</div>
);

export default Post;
