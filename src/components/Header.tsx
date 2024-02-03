import { Input } from "./Input";
import { useCallback } from "react";
import { ADD_ITEM } from "../constants";
import { TodoAction } from "../types";

interface HeaderProps {
  dispatch: React.Dispatch<TodoAction>;
}

export const Header: React.FC<HeaderProps> = ({ dispatch }) => {

  // add item
  const addItem = useCallback(
    (title: string) => dispatch({ type: ADD_ITEM, payload: { title } }),
    [dispatch]
  );

  return (
    <header className="header" data-testid="header">
      <h1>todos</h1>
      <Input
        onSubmit={addItem}
        label="New Todo Input"
        placeholder="What needs to be done?"
      />
    </header>
  );
};
