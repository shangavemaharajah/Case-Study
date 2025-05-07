package com.paf.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "questions")
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @JsonProperty("question")
    private String question;

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("questionType")
    private String questionType;

    @JsonProperty("userId")
    private String userId;

    @ElementCollection
    private List<String> choices;

    @ElementCollection
    private List<String> correctAnswers;

    // --- DEFAULT CONSTRUCTOR - VERY IMPORTANT FOR HIBERNATE ---
    public Questions() {
    }

    // --- PARAMETERIZED CONSTRUCTOR ---
    public Questions(Long id, String question, String subject, String questionType, String userId, List<String> choices, List<String> correctAnswers) {
        this.id = id;
        this.question = question;
        this.subject = subject;
        this.questionType = questionType;
        this.userId = userId;
        this.choices = choices;
        this.correctAnswers = correctAnswers;
    }

    // --- GETTERS & SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<String> getChoices() {
        return choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }

    public List<String> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(List<String> correctAnswers) {
        this.correctAnswers = correctAnswers;}
}