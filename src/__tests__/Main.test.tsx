import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Main } from "../components/Main";

const mockDispatch = jest.fn();

const mockTodos = [
  { id: "1", title: "Todo 1", completed: false },
  { id: "2", title: "Todo 2", completed: true },
];

test("renders Main component with the provided props", () => {
  render(
    <Router>
      <Main todos={mockTodos} dispatch={mockDispatch} />
    </Router>
  );

  const mainElement = screen.getByTestId("main");
  const toggleAllElement = screen.getByTestId("toggle-all");
  const toggleAllLabelElement = screen.getByText("Toggle All Input");
  const todoListElement = screen.getByTestId("todo-list");

  expect(mainElement).toBeInTheDocument();
  expect(toggleAllElement).toBeInTheDocument();
  expect(toggleAllLabelElement).toBeInTheDocument();
  expect(todoListElement).toBeInTheDocument();
});

test("calls toggleAll callback when toggle-all checkbox is clicked", () => {
  render(
    <Router>
      <Main todos={mockTodos} dispatch={mockDispatch} />
    </Router>
  );

  const toggleAllElement = screen.getByTestId("toggle-all");

  fireEvent.click(toggleAllElement);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "TOGGLE_ALL",
    payload: { completed: true },
  });
});
