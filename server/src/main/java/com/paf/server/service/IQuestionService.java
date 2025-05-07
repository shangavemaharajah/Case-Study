package com.paf.server.service;

import com.paf.server.model.Questions;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;

public interface IQuestionService {

    Questions createQuestion(Questions question);

    List<Questions> getAllQuestions();

    Optional<Questions> getQuestionById(Long id);

    List<String> getAllSubjects();

    Questions updateQuestion(Long id, Questions question) throws ChangeSetPersister.NotFoundException;

    void  deleteQuestion(Long id);

    List<Questions> getQuestionsForUser(Integer numOfQuestions, String subject);

}
