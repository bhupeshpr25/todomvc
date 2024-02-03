import { Input } from "./Input";
import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";
import { Todo, TodoAction } from "../types";

interface ItemProps {
  todo: Todo;
  dispatch: React.Dispatch<TodoAction>;
}

// memoized Item component to optimize rendering
export const Item: React.FC<ItemProps> = memo(({ todo, dispatch }) => {
  const [isWritable, setIsWritable] = useState(false);
  const { title, completed, id } = todo;

  // toggle the todo completed
  const toggleItem = useCallback(
    () => dispatch({ type: TOGGLE_ITEM, payload: { id } }),
    [dispatch, id]
  );

  // remove the todo
  const removeItem = useCallback(
    () => dispatch({ type: REMOVE_ITEM, payload: { id } }),
    [dispatch, id]
  );

  // update the todo
  const updateItem = useCallback(
    (id: string, title: string) =>
      dispatch({ type: UPDATE_ITEM, payload: { id, title } }),
    [dispatch]
  );

  // enable writable mode when double-clicked
  const handleDoubleClick = useCallback(() => {
    setIsWritable(true);
  }, []);

  // disable weitable mode on blur
  const handleBlur = useCallback(() => {
    setIsWritable(false);
  }, []);

  // handle updating the Todo item on user input
  const handleUpdate = useCallback(
    (title: string) => {
      // remove todo if title is empty
      if (title.length === 0) removeItem();
      else updateItem(id, title);

      // disable writable mode
      setIsWritable(false);
    },
    [id, removeItem, updateItem]
  );

  return (
    <div
      className={classnames({ completed: todo.completed })}
      data-testid="todo-item"
    >
      <div className="view">
        {isWritable ? (
          <Input
            onSubmit={handleUpdate}
            label="Edit Todo Input"
            defaultValue={title}
            onBlur={handleBlur}
            placeholder="edit todo"
          />
        ) : (
          <>
            <input
              className="toggle"
              type="checkbox"
              data-testid="todo-item-toggle"
              checked={completed}
              onChange={toggleItem}
            />
            <label
              data-testid="todo-item-label"
              onDoubleClick={handleDoubleClick}
            >
              {title}
            </label>
            <button
              className="destroy"
              data-testid="todo-item-button"
              onClick={removeItem}
            >
              x
            </button>
          </>
        )}
      </div>
    </div>
  );
});
