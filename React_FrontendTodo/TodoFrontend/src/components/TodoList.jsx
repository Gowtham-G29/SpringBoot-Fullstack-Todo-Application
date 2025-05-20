import { getTodos, updateTodo, deleteTodo } from "../Service/Api";
import { useEffect, useState } from "react";

function TodoList({refresh}) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos once on mount
  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await getTodos();
      if (response) {
        setTodos(response);
      } else {
        alert("Failed to fetch todos");
      }
    } catch (error) {
        console.error("Error fetching todos:", error);
      alert("Error fetching todos");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id) => {
  try {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = {
      completed: !todoToUpdate.completed,
    };

    await updateTodo(id,updatedTodo); 

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
      )
    );
  } catch (error) {
    console.error("Error updating todo:", error);
    alert("Failed to update todo");
  }
};


  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
        console.error("Error deleting todo:", error);
      alert("Failed to delete todo");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {todos.length === 0 ? (
        <p className="flex justify-center items-center mt-5">No todos found</p>
      ) : (
        <ul className="space-y-4">
          {todos.slice().reverse().map((todo) => (
            <li
              key={todo.id}
              className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="w-5 h-5"
                />
                <h3
                  className={`text-xl font-bold ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}
                </h3>
              </div>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
