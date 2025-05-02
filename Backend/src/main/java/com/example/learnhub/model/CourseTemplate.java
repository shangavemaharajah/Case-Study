// src/main/java/com/example/learnhub/model/CourseTemplate.java
package com.example.learnhub.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@Data
@Document(collection = "templates")
public class CourseTemplate {
    @Id
    private String id;

    @DBRef
    private User creator; // Track who created the template
    private String title;
    private String description;
    private List<Module> modules;
    private String category;
    @JsonProperty("isPublic")
    private boolean isPublic;

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    private String creatorId;  // Stores the user ID who created this template

    // Explicit getter and setter for creatorId
    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    
}