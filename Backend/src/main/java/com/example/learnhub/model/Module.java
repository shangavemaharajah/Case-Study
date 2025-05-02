// Module.java - Updated
package com.example.learnhub.model;

import lombok.Data;
import java.util.List;

@Data
public class Module {
    private String id;
    private String title;
    private String description;
    private List<LearningContent> content;
    private int order;
    private int estimatedDurationMinutes;
}



