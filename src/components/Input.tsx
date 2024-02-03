import { useCallback } from "react";

interface InputProps {
  onSubmit: (value: string) => void;
  placeholder: string;
  label: string;
  defaultValue?: string;
  onBlur?: () => void;
}

// sanitize special characters in a string
const sanitize = (string: string): string => {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
};

// check if a string has a valid minimum length
const hasValidMin = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const Input: React.FC<InputProps> = ({
  onSubmit,
  placeholder,
  label,
  defaultValue,
  onBlur,
}) => {
  // callback for handling blur event
  const handleBlur = useCallback(() => {
    if (onBlur) onBlur();
  }, [onBlur]);

  // callback for handling keydown event
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = e.currentTarget.value.trim();

        // check valid minimum length
        if (!hasValidMin(value, 2)) return;

        // sanitize the value and submit it
        onSubmit(sanitize(value));

        // clear the input field after submission
        e.currentTarget.value = "";
      }
    },
    [onSubmit]
  );

  return (
    <div className="input-container">
      <input
        className="new-todo"
        id="todo-input"
        type="text"
        data-testid="text-input"
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <label className="visually-hidden" htmlFor="todo-input">
        {label}
      </label>
    </div>
  );
};
