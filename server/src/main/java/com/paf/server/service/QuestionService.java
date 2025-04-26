package com.paf.server.service;

import com.paf.server.model.Questions;
import com.paf.server.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class QuestionService implements IQuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public Questions createQuestion(Questions question) {
        return questionRepository.save(question);
    }

    @Override
    public List<Questions> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Optional<Questions> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public List<String> getAllSubjects() {
        return questionRepository.findDistinctSubject();
    }

    @Override
    public Questions updateQuestion(Long id, Questions question) throws ChangeSetPersister.NotFoundException {
        Optional<Questions> theQuestion = this.getQuestionById(id);
        if (theQuestion.isPresent()) {
            Questions updatedQuestion = theQuestion.get();
            updatedQuestion.setQuestion(question.getQuestion());
            updatedQuestion.setChoices(question.getChoices());
            updatedQuestion.setCorrectAnswers(question.getCorrectAnswers());
            return questionRepository.save(updatedQuestion);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public List<Questions> getQuestionsForUser(Integer numOfQuestions, String subject) {
        System.out.println("Fetching " + numOfQuestions + " questions for subject: " + subject);
        System.out.println("Repo Calling");
        Pageable pageable = PageRequest.of(0, numOfQuestions);
        return questionRepository.findBySubject(subject, pageable).getContent();

//        System.out.println("Subjects fetched from DB: " + questions);
//        System.out.println("Found questions: " + questions.size());
//        return questions;
    }
}
