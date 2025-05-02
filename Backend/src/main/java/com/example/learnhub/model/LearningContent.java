package com.example.learnhub.model;

import lombok.Data;

// LearningContent.java
@Data
public class LearningContent {
    private String id;
    private ContentType type;
    private String url;
    private String content;
}
