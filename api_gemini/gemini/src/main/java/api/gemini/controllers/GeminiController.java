package api.gemini.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api.gemini.models.TodoDTO;
import api.gemini.services.GeminiService;



@RestController
public class GeminiController {
  @PostMapping("/todo")
  public TodoDTO createGeminiTodo(@RequestBody String requestText) {
      return new TodoDTO(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        10
      );
  }
  
  @GetMapping("/todo")
  public void testGemini() {
    GeminiService.generateTodoDTO("I'm out of toilet paper");
    GeminiService.generateTodoDTO("remind me to buy some toilet paper");
    GeminiService.generateTodoDTO("toilet paper");
  }
  
}
