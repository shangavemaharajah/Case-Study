// EnrollmentService.java
package com.example.learnhub.service;

import com.example.learnhub.model.Enrollment;
import com.example.learnhub.model.Course;
import com.example.learnhub.model.User;
import com.example.learnhub.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseService courseService;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, 
                           CourseService courseService) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseService = courseService;
    }

    public Enrollment enrollUserInCourse(User user, String courseId) {
        Course course = courseService.getCourseEntityById(courseId);
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(new Date());

        course.getModules().forEach(module -> 
        enrollment.getCompletedModules().put(module.getId(), false));
    
        enrollment.setProgressPercentage(0.0);
        return enrollmentRepository.save(enrollment);
    }

    public Enrollment getEnrollmentById(String id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
    }

    public Enrollment updateModuleCompletion(String enrollmentId, String moduleId, boolean completed) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        
        enrollment.getCompletedModules().put(moduleId, completed);
        
        // Calculate new progress
        long totalModules = enrollment.getCourse().getModules().size();
        long completedCount = enrollment.getCompletedModules().values().stream()
                .filter(Boolean::booleanValue).count();
        
        enrollment.setProgressPercentage((double) completedCount / totalModules * 100);
        
        return enrollmentRepository.save(enrollment);
    }
}