import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Item } from "../components/Item";

const mockDispatch = jest.fn();

const mockTodo = {
  id: "test-id",
  title: "Test Todo",
  completed: false,
};

test("renders Item component with the provided props", () => {
  render(<Item todo={mockTodo} dispatch={mockDispatch} />);

  const itemElement = screen.getByTestId("todo-item");
  const checkboxElement = screen.getByTestId("todo-item-toggle");
  const labelElement = screen.getByTestId("todo-item-label");
  const buttonElement = screen.getByTestId("todo-item-button");

  expect(itemElement).toBeInTheDocument();
  expect(checkboxElement).toBeInTheDocument();
  expect(labelElement).toBeInTheDocument();
  expect(labelElement).toHaveTextContent("Test Todo");
  expect(buttonElement).toBeInTheDocument();
});

test("calls toggleItem callback when checkbox is clicked", () => {
  render(<Item todo={mockTodo} dispatch={mockDispatch} />);

  const checkboxElement = screen.getByTestId("todo-item-toggle");

  fireEvent.click(checkboxElement);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "TOGGLE_ITEM",
    payload: { id: "test-id" },
  });
});

test("calls handleDoubleClick callback when label is double-clicked", () => {
  const mockDispatch = jest.fn();
  const todo = { id: "test-id", title: "Test Todo", completed: false };
  const { getByText } = render(<Item todo={todo} dispatch={mockDispatch} />);

  const labelElement = getByText("Test Todo");

  // Double-click on the label
  fireEvent.doubleClick(labelElement);
});

test("calls removeItem callback when button is clicked", () => {
  render(<Item todo={mockTodo} dispatch={mockDispatch} />);

  const buttonElement = screen.getByTestId("todo-item-button");

  fireEvent.click(buttonElement);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "REMOVE_ITEM",
    payload: { id: "test-id" },
  });
});
