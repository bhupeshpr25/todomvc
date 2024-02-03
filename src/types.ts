export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
export interface TodoAction {
  type: string;
  payload?: { id?: string; title?: string; completed?: boolean };
}
