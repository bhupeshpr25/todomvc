import { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./Item";
import classnames from "classnames";

import { TOGGLE_ALL } from "../constants";
import { TodoAction, Todo } from "../types";

interface MainProps {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}

export const Main: React.FC<MainProps> = ({ todos, dispatch }) => {
  // get the current route
  const { pathname: route } = useLocation();

  // memoized array of visible todos based on the route
  const visibleTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (route === "/active") return !todo.completed;
        if (route === "/completed") return todo.completed;
        return todo;
      }),
    [todos, route]
  );

  //toggle all visible todos completed
  const toggleAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: TOGGLE_ALL,
        payload: { completed: e.target.checked },
      }),
    [dispatch]
  );

  return (
    <main className="main" data-testid="main">
      {visibleTodos.length > 0 ? (
        <div className="toggle-all-container">
          <input
            className="toggle-all"
            type="checkbox"
            data-testid="toggle-all"
            checked={visibleTodos.every((todo) => todo.completed)}
            onChange={toggleAll}
          />
          <label className="toggle-all-label" htmlFor="toggle-all">
            Toggle All Input
          </label>
        </div>
      ) : null}
      <ul className={classnames("todo-list")} data-testid="todo-list">
        {visibleTodos.map((todo) => (
          <Item todo={todo} key={todo.id} dispatch={dispatch} />
        ))}
      </ul>
    </main>
  );
};
