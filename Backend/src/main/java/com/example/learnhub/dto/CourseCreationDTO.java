package com.example.learnhub.dto;

import java.util.List;

import lombok.Data;

@Data
public class CourseCreationDTO {
    private String templateId;
    private String customTitle;
    private String customDescription;
    private String category;
    private String creatorId;
    private String imageUrl;
    private List<ModuleDTO> modules;
}