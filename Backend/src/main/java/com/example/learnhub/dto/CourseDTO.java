package com.example.learnhub.dto;

import lombok.Data;
import java.util.List;

@Data
public class CourseDTO {
    private String id;
    private String title;
    private String description;
    private String creatorId;
    private String templateId;
    private boolean published;
    private String category;
    private String imageUrl;
    private int totalEnrollments;
    private List<ModuleDTO> modules;
}