import { useCallback, useMemo } from "react";
import { REMOVE_COMPLETED_ITEMS } from "../constants";
import { TodoAction, Todo } from "../types";
import classnames from "classnames";
import { useLocation } from "react-router-dom";

interface FooterProps {
  todos: Todo[]; // array of todos
  dispatch: React.Dispatch<TodoAction>; // dispatcher function for todo actions
}

export const Footer: React.FC<FooterProps> = ({ todos, dispatch }) => {
  const { pathname: route } = useLocation();

  // memoized calculation of active todos
  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );

  // dispatch action for removing completed todos
  const removeCompleted = useCallback(
    () => dispatch({ type: REMOVE_COMPLETED_ITEMS }),
    [dispatch]
  );

  //return nothing if there are no todos
  if (todos.length === 0) return null;

  return (
    <footer className="footer" data-testid="footer">
      <span className="todo-count">{`${activeTodos.length} ${
        activeTodos.length === 1 ? "item" : "items"
      } left!`}</span>
      <ul className="filters" data-testid="footer-navigation">
        <li>
          <a className={classnames({ selected: route === "/" })} href="#/">
            All
          </a>
        </li>
        <li>
          <a
            className={classnames({ selected: route === "/active" })}
            href="#/active"
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={classnames({ selected: route === "/completed" })}
            href="#/completed"
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        disabled={activeTodos.length === todos.length}
        onClick={removeCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
