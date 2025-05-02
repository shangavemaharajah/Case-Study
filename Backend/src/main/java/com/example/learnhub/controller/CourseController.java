// src/main/java/com/example/learnhub/controller/CourseController.java
package com.example.learnhub.controller;

import com.example.learnhub.dto.CourseCreationDTO;
import com.example.learnhub.dto.CourseDTO;
import com.example.learnhub.dto.CourseUpdateDTO;
import com.example.learnhub.model.User;
import com.example.learnhub.service.CourseService;
import com.example.learnhub.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final UserService userService;

    public CourseController(CourseService courseService, UserService userService) {
        this.courseService = courseService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<CourseDTO> createCourse(
            @RequestParam String templateId,
            @RequestParam String creatorId,
            @RequestBody CourseCreationDTO creationDTO) {
        
                User creator = userService.getUserEntityById(creatorId);
                CourseDTO course = courseService.createCourseFromTemplate(templateId, creator, creationDTO);
                return new ResponseEntity<>(course, HttpStatus.CREATED);
            }

    @GetMapping("/creator/{creatorId}")
    public ResponseEntity<List<CourseDTO>> getCoursesByCreator(@PathVariable String creatorId) {
        User creator = userService.getUserEntityById(creatorId);
        List<CourseDTO> courses = courseService.getCoursesByCreator(creator);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/template/{templateId}")
    public ResponseEntity<List<CourseDTO>> getCoursesByTemplate(@PathVariable String templateId) {
        List<CourseDTO> courses = courseService.getCoursesByTemplate(templateId);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/creator/{creatorId}/template/{templateId}")
    public ResponseEntity<List<CourseDTO>> getCoursesByCreatorAndTemplate(
            @PathVariable String creatorId,
            @PathVariable String templateId) {
                User creator = userService.getUserEntityById(creatorId);
        List<CourseDTO> courses = courseService.getCoursesByCreatorAndTemplate(creator, templateId);
        return ResponseEntity.ok(courses);
    }

    @PutMapping("/{id}/publish")
    public ResponseEntity<CourseDTO> publishCourse(@PathVariable String id) {
        CourseDTO course = courseService.publishCourse(id);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/published")
    public ResponseEntity<List<CourseDTO>> getPublishedCourses() {
        List<CourseDTO> courses = courseService.getPublishedCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable String id) {
        CourseDTO course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> updateCourse(
            @PathVariable String id,
            @RequestBody CourseUpdateDTO updateDTO) {
        CourseDTO course = courseService.updateCourse(id, updateDTO);
        return ResponseEntity.ok(course);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}