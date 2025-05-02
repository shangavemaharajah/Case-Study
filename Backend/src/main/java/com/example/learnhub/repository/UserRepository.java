// src/main/java/com/example/learnhub/repository/UserRepository.java
package com.example.learnhub.repository;

import com.example.learnhub.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsById(String id);

    @Query("{ 'createdTemplates.$id' : ?0 }")
    List<User> findUsersByCreatedTemplates(String templateId);

    @Query("{ 'createdCourses.$id' : ?0 }")
    List<User> findUsersByCreatedCourses(String courseId);
}