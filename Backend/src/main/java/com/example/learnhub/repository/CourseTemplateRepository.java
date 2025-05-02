// src/main/java/com/example/learnhub/repository/CourseTemplateRepository.java
package com.example.learnhub.repository;

import com.example.learnhub.model.CourseTemplate;
import com.example.learnhub.model.User; // Ensure User class is imported
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CourseTemplateRepository extends MongoRepository<CourseTemplate, String> {
    List<CourseTemplate> findByCategoryAndIsPublic(String category, boolean isPublic);
    List<CourseTemplate> findByIsPublic(boolean isPublic);
    List<CourseTemplate> findByCreator(User creator);
    List<CourseTemplate> findByCreatorId(String creatorId);
    
}