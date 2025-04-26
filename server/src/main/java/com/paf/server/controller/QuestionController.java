package com.paf.server.controller;

import com.paf.server.model.Questions;
import com.paf.server.service.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/question")
public class QuestionController {
    private final IQuestionService questionService;

    public QuestionController(IQuestionService questionService) {
        this.questionService = questionService;
    }


    @PostMapping("/create-new-question")
    public ResponseEntity<Questions> createQuestion(@Validated @RequestBody Questions question){
        Questions createdQuestion = questionService.createQuestion(question);
        return ResponseEntity.status(CREATED).body(createdQuestion);
    }

    @GetMapping("/allquestions")
    public ResponseEntity<List<Questions>> getAllQuestions(){
        List<Questions> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Questions> getQuestionById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Questions> theQuestion = questionService.getQuestionById(id);
        if (theQuestion.isPresent()){
            return ResponseEntity.ok(theQuestion.get());
        }else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<Questions> updateQuestion(
            @PathVariable Long id, @RequestBody Questions question) throws ChangeSetPersister.NotFoundException {
        Questions updatedQuestion = questionService.updateQuestion(id, question);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects(){
        List<String> subjects = questionService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/fetch-questions-for-user")
    public ResponseEntity<List<Questions>> getQuestionsForUser(
            @RequestParam(required = true) Integer numOfQuestions,
            @RequestParam(required = true) String subject) {

        if (numOfQuestions == null || subject == null) {
            return ResponseEntity.badRequest().build();
        }
        System.out.println("Calling service layer");

        List<Questions> allQuestions = questionService.getQuestionsForUser(numOfQuestions, subject);
        Collections.shuffle(allQuestions);

        int availableQuestions = Math.min(numOfQuestions, allQuestions.size());
        List<Questions> randomQuestions = allQuestions.subList(0, availableQuestions);

        return ResponseEntity.ok(randomQuestions);
    }
}
