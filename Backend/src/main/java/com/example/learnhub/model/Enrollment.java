// Enrollment.java
package com.example.learnhub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
@Document(collection = "enrollments")
public class Enrollment {
    @Id
    private String id;
    
    @DBRef
    private User user;
    
    @DBRef
    private Course course;
    
    private Map<String, Boolean> completedModules = new HashMap<>(); // moduleId -> completion status
    private Date enrollmentDate;
    private double progressPercentage;
}