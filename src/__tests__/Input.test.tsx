import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../components/Input";

test("renders Input component with the provided props", () => {
  const onSubmit = jest.fn();
  const onBlur = jest.fn();

  render(
    <Input
      onSubmit={onSubmit}
      placeholder="Test Placeholder"
      label="Test Label"
      defaultValue="Test Default Value"
      onBlur={onBlur}
    />
  );

  const inputElement = screen.getByTestId("text-input");
  const labelElement = screen.getByLabelText(/Test Label/);

  expect(inputElement).toBeInTheDocument();
  expect(labelElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("placeholder", "Test Placeholder");
  expect(inputElement).toHaveAttribute("value", "Test Default Value");
});

test("calls onSubmit callback when Enter key is pressed with a valid value", () => {
  const onSubmit = jest.fn();

  render(
    <Input
      onSubmit={onSubmit}
      placeholder="Test Placeholder"
      label="Test Label"
    />
  );

  const inputElement = screen.getByTestId("text-input");

  fireEvent.change(inputElement, { target: { value: "Valid Todo" } });
  fireEvent.keyDown(inputElement, { key: "Enter" });

  expect(onSubmit).toHaveBeenCalledWith("Valid Todo");
});

test("does not call onSubmit callback when Enter key is pressed with an invalid value", () => {
  const onSubmit = jest.fn();

  render(
    <Input
      onSubmit={onSubmit}
      placeholder="Test Placeholder"
      label="Test Label"
    />
  );

  const inputElement = screen.getByTestId("text-input");

  fireEvent.change(inputElement, { target: { value: "I" } });
  fireEvent.keyDown(inputElement, { key: "Enter" });

  expect(onSubmit).not.toHaveBeenCalled();
});

test("calls onBlur callback when the input loses focus", () => {
  const onBlur = jest.fn();

  render(
    <Input
      onSubmit={jest.fn()}
      placeholder="Test Placeholder"
      label="Test Label"
      onBlur={onBlur}
    />
  );

  const inputElement = screen.getByTestId("text-input");

  userEvent.click(inputElement); // Focus on the input
  fireEvent.blur(inputElement);

  expect(onBlur).toHaveBeenCalled();
});
