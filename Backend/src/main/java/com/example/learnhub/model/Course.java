// src/main/java/com/example/learnhub/model/Course.java
package com.example.learnhub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "courses")
public class Course {
    @Id
    private String id;

    @DBRef
    private User creator; // Track who created the course

    @DBRef
    private CourseTemplate template; // Reference to the template used

    private String title;
    private String description;
    private String creatorId; // Reference to User
    private String templateId; // Reference to Template
    private List<Module> modules;
    private boolean published;
    private String category;
    private String imageUrl;
    private int totalEnrollments;
}