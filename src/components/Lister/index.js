import React, { useEffect, useState } from "react";
import getPosts from "../../services/posts";
import Post from "./Post";
import CreatePost from "./CreatePost";

const Lister = () => {
	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);

	useEffect(() => {
		getPosts().then((data) => {
			setLoading(false);
			setPosts(data);
		});
	}, []);

	const onDeletePost = (id) => {
		setPosts(allPosts.filter((post) => post.id !== id));
	};

	const onCreatePost = (post) => {
		setPosts([
			...allPosts,
			{
				...post,
				id: allPosts[allPosts.length - 1].id + 1,
			},
		]);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="postList">
			<CreatePost onCreate={onCreatePost} />
			{allPosts.length === 0 && <div>No posts available...</div>}
			{allPosts.map((post) => (
				<Post key={post.id} {...post} onDelete={() => onDeletePost(post.id)} />
			))}
		</div>
	);
};

export default Lister;
