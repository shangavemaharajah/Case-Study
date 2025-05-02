// src/main/java/com/example/learnhub/dto/TemplateCreationDTO.java
package com.example.learnhub.dto;

import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class TemplateCreationDTO {
    private String title;
    private String description;
    private String category;
    private List<ModuleDTO> modules;
    @JsonProperty("isPublic")
    private boolean isPublic;
    private String creatorId;
}