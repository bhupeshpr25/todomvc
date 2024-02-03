import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { useReducer } from "react";
import { todoReducer } from "./reducer";
import { Todo, TodoAction } from "./types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              dispatch={dispatch as React.Dispatch<TodoAction>}
              todos={todos}
            />
          }
        />
      </Routes>
    </Router>
  );
};

interface HomeProps {
  dispatch: React.Dispatch<TodoAction>;
  todos: Todo[];
}

const Home: React.FC<HomeProps> = ({ dispatch, todos }) => {
  return (
    <>
      <Header dispatch={dispatch} />
      <Main todos={todos} dispatch={dispatch} />
      <Footer todos={todos} dispatch={dispatch} />
    </>
  );
};

export default App;
