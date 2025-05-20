package com.g_29.FullstackTodo.service;

import com.g_29.FullstackTodo.model.Todo;
import com.g_29.FullstackTodo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private Todo todo;

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAlltodos(){
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo todo){
      return   todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo todo) {
        Todo actualTodo = todoRepository.findById(id).orElseThrow();

        // Keep existing title
        actualTodo.setCompleted(todo.isCompleted()); // Corrected: use getCompleted() instead of setCompleted(true)

        return todoRepository.save(actualTodo);
    }


    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }

}
