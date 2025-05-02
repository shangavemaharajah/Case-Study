package com.example.learnhub.dto;

import lombok.Data;
import java.util.List;

@Data
public class ModuleDTO {
    private String id;
    private String title;
    private String description;
    private List<String> content;
    private int order;
    private int estimatedDurationMinutes;
}