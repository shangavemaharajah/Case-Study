// EnrollmentRepository.java
package com.example.learnhub.repository;

import com.example.learnhub.model.Enrollment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {
    List<Enrollment> findByUserId(String userId);
    List<Enrollment> findByCourseId(String courseId);
    // Inherits save() and findById() from MongoRepository
}