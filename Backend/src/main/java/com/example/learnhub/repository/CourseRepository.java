package com.example.learnhub.repository;

import com.example.learnhub.dto.CourseDTO;
import com.example.learnhub.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.example.learnhub.model.User; // Add this import for the User class

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByCreator(User creator);
    List<Course> findByPublished(boolean published);
    List<Course> findByTemplateId(String templateId);
    List<Course> findByCreatorAndTemplateId(User creator, String templateId);
    List<Course> findByCategory(String category);
    List<CourseDTO> getCoursesByTemplate(String templateId);
    List<CourseDTO> getCoursesByCreatorAndTemplate(User creator, String templateId);
}