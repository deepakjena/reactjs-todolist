import React, { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  // let todos = ["todo1", "todo2", "todo3"];
  const [todos, setTodos] = useState(["todo1", "todo2", "todo3"]);
  const [todoValue, setTodoValue] = useState("");
  function handleAddTodo(newTodo) {
    console.log("newTodo", newTodo);
    const newTodos = [...todos, newTodo];
    saveToLocalStorage(newTodos);
    setTodos(newTodos);
  }
  function handleDeleteTodo(todoIndex) {
    const newTodoList = todos.filter((todo, index) => index !== todoIndex);
    setTodos(newTodoList);
    saveToLocalStorage(newTodoList);
    console.log("delete todo" + todoIndex);
  }
  function handleEditTodo(todoIndex) {
    const valueToBeEdited = todos[todoIndex];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(todoIndex);
    console.log("edit todo" + todoIndex);
  }

  function saveToLocalStorage(todos) {
    if (!localStorage) return;
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  useEffect(() => {
    if (!localStorage) return;
    let localTodos = localStorage.getItem("todos");
    if (!localTodos) return;
    localTodos = JSON.parse(localTodos);
    setTodos(localTodos);
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodo={handleAddTodo}
      />
      <TodoList
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </>
  );
}

export default App;
