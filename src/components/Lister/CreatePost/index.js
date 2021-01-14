import React, { useReducer } from "react";

const CreatePost = ({ onCreate }) => {
	const initialState = {
		title: "",
		body: "",
		author: "",
	};

	const postReducer = (state, { type, ...payload }) => {
		switch (type) {
			case "update": {
				switch (payload.key) {
					case "title": {
						return {
							...state,
							title: payload.value,
						};
					}
					case "body": {
						return {
							...state,
							body: payload.value,
						};
					}
					case "author": {
						return {
							...state,
							author: payload.value,
						};
					}
					default: {
						return state;
					}
				}
			}
			case "reset": {
				return initialState;
			}
			default: {
				return initialState;
			}
		}
	};

	const [{ title, body, author }, dispatch] = useReducer(postReducer, initialState);

	return (
		<form aria-label="Create post">
			<fieldset>
				<h3>Add new post</h3>
				<ul>
					<li>
						<label htmlFor="title">Title</label>
						<input type="text" id="title" value={title} onChange={({ target: { value } }) => dispatch({ type: "update", key: "title", value })} />
					</li>
					<li>
						<label htmlFor="body">Body</label>
						<textarea id="body" value={body} onChange={({ target: { value } }) => dispatch({ type: "update", key: "body", value })}></textarea>
					</li>
					<li>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" value={author} onChange={({ target: { value } }) => dispatch({ type: "update", key: "author", value })} />
					</li>
				</ul>

				<button
					type="button"
					onClick={() => {
						onCreate({ title, body, author });
						dispatch({ type: "reset" });
					}}
				>
					Add post
				</button>
				<button type="button" onClick={() => dispatch({ type: "reset" })}>
					Reset
				</button>
			</fieldset>
		</form>
	);
};

export default CreatePost;
