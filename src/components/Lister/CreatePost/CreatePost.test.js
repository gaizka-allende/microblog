import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CreatePost from ".";

describe("<CreatePost />", () => {
	const titleValue = "Bacon ipsum";
	const bodyValue = "Andouille ham hock beef pastrami short loin";
	const authorValue = "Pete";

	it("should render title and allow it to be edited", () => {
		const container = render(<CreatePost />);

		const title = container.getByLabelText("Title");
		fireEvent.change(title, { target: { value: titleValue } });

		expect(title.value).toBe(titleValue);
	});

	it("should render body and allow it to be edited", () => {
		const container = render(<CreatePost />);

		const body = container.getByLabelText("Body");
		fireEvent.change(body, { target: { value: bodyValue } });

		expect(body.value).toBe(bodyValue);
	});

	it("should render author and allow it to be edited", () => {
		const container = render(<CreatePost />);

		const author = container.getByLabelText("Author");
		fireEvent.change(author, { target: { value: authorValue } });

		expect(author.value).toBe(authorValue);
	});

	it("should add a post when the Add button is clicked", () => {
		const addPost = jest.fn();
		const container = render(<CreatePost onCreate={addPost} />);

		const title = container.getByLabelText("Title");
		fireEvent.change(title, { target: { value: titleValue } });

		const body = container.getByLabelText("Body");
		fireEvent.change(body, { target: { value: bodyValue } });

		const author = container.getByLabelText("Author");
		fireEvent.change(author, { target: { value: authorValue } });

		expect(addPost).not.toHaveBeenCalled();
		fireEvent.click(container.getByRole("button", { name: "Add post" }));
		expect(addPost).toHaveBeenCalledWith({ title: titleValue, body: bodyValue, author: authorValue });
	});

	it("should reset the form when Reset is clicked", () => {
		const container = render(<CreatePost />);

		const title = container.getByLabelText("Title");
		fireEvent.change(title, { target: { value: titleValue } });

		const body = container.getByLabelText("Body");
		fireEvent.change(body, { target: { value: bodyValue } });

		const author = container.getByLabelText("Author");
		fireEvent.change(author, { target: { value: authorValue } });

		fireEvent.click(container.getByRole("button", { name: "Reset" }));

		expect(title.value).toBe("");
		expect(body.value).toBe("");
		expect(author.value).toBe("");
	});
});
