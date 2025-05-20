import axios from "axios";

const BaseUrl = "http://localhost:8080/api";



export const createTodo = async (title,completed) => {

    const newTodo = {
        title: title,
        completed: completed
    };

    try {
        const response = await axios.post(`${BaseUrl}/addTodo`, newTodo);
        return response.data;
    } catch (error) {  
        console.error("Error creating todo:", error);
        return null;
    }
   
};

export const getTodos = async () => {

    try{
        const response = await axios.get(`${BaseUrl}/getAllTodos`);
        console.log("Todos fetched successfully:", response.data);
        return response.data;   
    }catch (error) {
        console.error("Error fetching todos:", error);
        return null;
    }
}

export const updateTodo = async (id, updatedTodo) => {
    try {
        const response = await axios.put(`${BaseUrl}/updateTodo/${id}`, updatedTodo);
        console.log("Todo updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating todo:", error);
        return null;
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${BaseUrl}/deleteTodo/${id}`);
        console.log("Todo deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting todo:", error);
        return null;
    }
};

