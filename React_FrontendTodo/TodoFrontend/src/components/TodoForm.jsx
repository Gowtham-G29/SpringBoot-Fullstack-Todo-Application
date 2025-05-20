import { useState } from "react";

function TodoForm({onCreateTodo}) {


    const[title, setTitle] = useState("");
    const[completed, setCompleted] = useState(false);

 
    const handleSubmit= async(e)=>{
        e.preventDefault();

        try {
            await onCreateTodo(title,completed);
            setTitle("");
            setCompleted(false);
        } catch (error) {
            console.error("Error creating todo:", error);
            alert("Failed to create todo");
        }
           
            
    }
    

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Add a new task"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </form>
    )
}

export default TodoForm
