// src/main/java/com/example/learnhub/repository/postTemplateRepository.java
package com.example.learnhub.repository;

import com.example.learnhub.model.postTemplate;
import com.example.learnhub.model.User; // Ensure User class is imported
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface postTemplateRepository extends MongoRepository<postTemplate, String> {
    List<postTemplate> findByCategoryAndIsPublic(String category, boolean isPublic);
    List<postTemplate> findByIsPublic(boolean isPublic);
    List<postTemplate> findByCreator(User creator);
    List<postTemplate> findByCreatorId(String creatorId);
    
}