import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { createTodo } from "./Service/Api";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleCreateTodo = async (title, completed) => {
    setRefresh(!refresh);

    try {
      await createTodo(title, completed);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Failed to create todo");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Task Manager</h2>

          <TodoForm onCreateTodo={handleCreateTodo} />
          <TodoList refresh={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;
