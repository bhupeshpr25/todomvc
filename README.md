# todoMVC - Test Plan

## Components:

1. **Header Component:**

   - **Test Types:**
     - Rendering Test: Ensure the component renders correctly.
     - Event Handling Test: Test user interactions such as adding new todos.
   - **Test Cases:**
     1. Render the header component with the title "todos."
     2. Simulate adding a new todo and check if the correct action is dispatched.

2. **Main Component:**

   - **Test Types:**
     - Rendering Test: Ensure the component renders correctly with the list of todos.
     - Event Handling Test: Test user interactions such as toggling all todos.
   - **Test Cases:**
     1. Render the main component with a list of todos.
     2. Simulate toggling all todos and check if the correct action is dispatched.

3. **Footer Component:**

   - **Test Types:**
     - Rendering Test: Ensure the component renders correctly with the footer elements.
     - Event Handling Test: Test user interactions such as removing completed todos.
   - **Test Cases:**
     1. Render the footer component with the correct count of active todos.
     2. Simulate removing completed todos and check if the correct action is dispatched.

4. **Item Component:**

   - **Test Types:**
     - Rendering Test: Ensure the component renders correctly with a todo item.
     - Event Handling Test: Test user interactions such as toggling a single todo.
   - **Test Cases:**
     1. Render the item component with a todo item.
     2. Simulate toggling a single todo and check if the correct action is dispatched.

5. **Input Component:**
   - **Test Types:**
     - Rendering Test: Ensure the component renders correctly with an input field.
     - Event Handling Test: Test user interactions such as submitting a new todo.
   - **Test Cases:**
     1. Render the input component with the correct placeholder and label.
     2. Simulate submitting a new todo and check if the correct action is dispatched.

## Installation

### 1. clone the repository

`git clone https://github.com/bhupeshpr25/mortyverse`

### 2. install dependencies

`pnpm install` or npm/yarn equivalent

### 3. run the application

`pnpm dev`

### 4. run tests:

`pnpm test`

### Future Scope:

- Set up continuous integration (CI) to run tests automatically on every code push.
- Aim for high test coverage to ensure most parts of the application are tested.
- Regularly review and update tests as new features are added or existing ones are modified.

### Deployment

live link - https://todomvc-tests.vercel.app/
