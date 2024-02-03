import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";

import { Header } from "../components/Header";

test("dispatches ADD_ITEM action on input change", () => {
  const dispatchMock = jest.fn();
  const { getByTestId } = render(<Header dispatch={dispatchMock} />);
  const inputElement = getByTestId("text-input");

  fireEvent.change(inputElement, { target: { value: "Test todo" } });
  fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

  // Check if the dispatch function was called with the correct arguments
  expect(dispatchMock).toHaveBeenCalledWith({
    type: "ADD_ITEM",
    payload: { title: "Test todo" },
  });
});
