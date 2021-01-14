import React from "react";
import { render, waitForElementToBeRemoved, fireEvent, within } from "@testing-library/react";
import Lister from ".";
import getPosts from "../../services/posts";

jest.mock("../../services/posts");

const firstPost = {
	id: 1,
	title: "Title 1",
	body: "Sample body 1",
	author: "Pete",
};
const secondPost = {
	id: 2,
	title: "Title 2",
	body: "Sample body 2",
	author: "Alan",
};

describe("<Lister />", () => {
	it("should display a loading message", () => {
		getPosts.mockReturnValue(new Promise(() => {}));
		const container = render(<Lister />);

		expect(container.getByText("Loading...")).toBeInTheDocument();
	});

	describe("when no posts are available", () => {
		beforeEach(() => {
			getPosts.mockResolvedValue([]);
		});

		it("should display a message when no posts exist", async () => {
			const container = render(<Lister />);

			await waitForElementToBeRemoved(() => container.getByText("Loading..."));
			expect(container.getByText("No posts available...")).toBeInTheDocument();
		});

		it("should show the add posts form", async () => {
			const container = render(<Lister />);

			await waitForElementToBeRemoved(() => container.getByText("Loading..."));
			expect(container.getByRole("button", { name: "Add post" })).toBeInTheDocument();
		});
	});

	describe("when posts exist", () => {
		beforeEach(() => {
			getPosts.mockResolvedValue([firstPost, secondPost]);
		});

		it("should display posts when they exist", async () => {
			const container = render(<Lister />);

			await waitForElementToBeRemoved(() => container.getByText("Loading..."));
			expect(container.queryByText("No posts available...")).not.toBeInTheDocument();

			expect(container.getByText(firstPost.title)).toBeInTheDocument();
			expect(container.getByText(firstPost.body)).toBeInTheDocument();
			expect(container.getByText(secondPost.title)).toBeInTheDocument();
			expect(container.getByText(secondPost.body)).toBeInTheDocument();
		});

		it("should allow a post to be deleted", async () => {
			const container = render(<Lister />);

			await waitForElementToBeRemoved(() => container.getByText("Loading..."));

			const deleteButtons = container.getAllByText("Delete");
			fireEvent.click(deleteButtons[0]);

			expect(container.queryByText(firstPost.title)).not.toBeInTheDocument();
			expect(container.getByText(secondPost.title)).toBeInTheDocument();
		});

		it("should show the add posts form", async () => {
			const container = render(<Lister />);

			await waitForElementToBeRemoved(() => container.getByText("Loading..."));
			expect(container.getByRole("button", { name: "Add post" })).toBeInTheDocument();
		});

		it("should allow a post to be added at the end of the list", async () => {
			const container = render(<Lister />);

			await waitForElementToBeRemoved(() => container.getByText("Loading..."));

			const newPost = {
				title: "Title 3",
				body: "Sample body 3",
				author: "Joss",
			};

			const form = container.getByRole("form");

			const title = within(form).getByLabelText("Title");
			fireEvent.change(title, { target: { value: newPost.title } });

			const body = within(form).getByLabelText("Body");
			fireEvent.change(body, { target: { value: newPost.body } });

			const author = within(form).getByLabelText("Author");
			fireEvent.change(author, { target: { value: newPost.author } });

			fireEvent.click(within(form).getByRole("button", { name: "Add post" }));

			expect(container.getByText(newPost.title)).toBeInTheDocument();
			expect(container.getByText(newPost.body)).toBeInTheDocument();
		});
	});
});
