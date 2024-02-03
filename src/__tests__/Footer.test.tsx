import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Footer } from "../components/Footer";
import { BrowserRouter } from "react-router-dom";

test("displays the correct number of active items", () => {
  const todos = [
    { id: "1", title: "Todo 1", completed: false },
    { id: "2", title: "Todo 2", completed: true },
    { id: "3", title: "Todo 3", completed: false },
  ];

  render(
    <BrowserRouter>
      <Footer todos={todos} dispatch={jest.fn()} />
    </BrowserRouter>
  );

  const countElement = screen.getByText(/2 items left/i);
  expect(countElement).toBeInTheDocument();
});

test("renders null when there are no todos", () => {
  render(
    <BrowserRouter>
      <Footer todos={[]} dispatch={jest.fn()} />
    </BrowserRouter>
  );
  const footerElement = screen.queryByTestId("footer");
  expect(footerElement).toBeNull();
});

test('displays "item" for one active todo', () => {
  const todos = [{ id: "1", title: "Todo 1", completed: false }];
  render(
    <BrowserRouter>
      <Footer todos={todos} dispatch={jest.fn()} />
    </BrowserRouter>
  );
  const countElement = screen.getByText(/1 item left/i);
  expect(countElement).toBeInTheDocument();
});

test('calls dispatch function to remove completed items when "Clear completed" button is clicked', () => {
  const todos = [
    { id: "1", title: "Todo 1", completed: false },
    { id: "2", title: "Todo 2", completed: true },
  ];
  const dispatchMock = jest.fn();
  render(
    <BrowserRouter>
      <Footer todos={todos} dispatch={dispatchMock} />
    </BrowserRouter>
  );

  const clearCompletedButton = screen.getByText(/Clear completed/i);
  fireEvent.click(clearCompletedButton);

  expect(dispatchMock).toHaveBeenCalledWith({ type: "REMOVE_COMPLETED_ITEMS" });
});

test('disables "Clear completed" button when there are no completed todos', () => {
  const todos = [
    { id: "1", title: "Todo 1", completed: false },
    { id: "2", title: "Todo 2", completed: false },
  ];
  render(
    <BrowserRouter>
      <Footer todos={todos} dispatch={jest.fn()} />
    </BrowserRouter>
  );

  const clearCompletedButton = screen.getByText(/Clear completed/i);
  expect(clearCompletedButton).toBeDisabled();
});

test('enables "Clear completed" button when there are completed todos', () => {
  const todos = [
    { id: "1", title: "Todo 1", completed: false },
    { id: "2", title: "Todo 2", completed: true },
  ];
  render(
    <BrowserRouter>
      <Footer todos={todos} dispatch={jest.fn()} />
    </BrowserRouter>
  );

  const clearCompletedButton = screen.getByText(/Clear completed/i);
  expect(clearCompletedButton).toBeEnabled();
});
