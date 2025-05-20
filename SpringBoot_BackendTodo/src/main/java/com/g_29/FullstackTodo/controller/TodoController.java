package com.g_29.FullstackTodo.controller;

import com.g_29.FullstackTodo.model.Todo;
import com.g_29.FullstackTodo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow only from Vite dev server
public class TodoController {

      @Autowired
      private TodoService todoService;

      @GetMapping("/getAllTodos")
      public ResponseEntity<List> getAllTodo(){
         List<Todo> todos=todoService.getAlltodos();
         return ResponseEntity.status(200).body(todos);
     }

     @PostMapping("/addTodo")
     public ResponseEntity<Todo> createTodo(@Valid @RequestBody  Todo todo){
          Todo newTodo=todoService.createTodo(todo);
          return  ResponseEntity.status(201).body(newTodo);
     }

     @PutMapping("/updateTodo/{id}")
     public ResponseEntity<Todo> updateTodo(@PathVariable long id, @RequestBody Todo todo){
         Todo updatedTodo=todoService.updateTodo(id, todo);
         return ResponseEntity.status(201).body(updatedTodo);
     }

     @DeleteMapping("/deleteTodo/{id}")
      public ResponseEntity<?> deleteTodo(@PathVariable long id){

          todoService.deleteTodo(id);

          return ResponseEntity.noContent().build();
      }




}
