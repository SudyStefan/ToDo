package api.gemini.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api.gemini.models.GeminiResponse;
import api.gemini.services.GeminiService;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class GeminiController {
  @PostMapping("/todo")
  public GeminiResponse createGeminiTodo(@RequestBody String requestText) {
    final GeminiResponse response = GeminiService.promptForTodo(requestText);
    System.out.print(response);
    return response;
  }
  
  @GetMapping("/todo")
  public GeminiResponse testGemini() {
    return GeminiService.promptForTodo("I'm out of toilet paper");
  }
  
}
