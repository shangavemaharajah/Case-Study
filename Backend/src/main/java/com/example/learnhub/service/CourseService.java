package com.example.learnhub.service;

import com.example.learnhub.dto.CourseDTO;
import com.example.learnhub.dto.CourseUpdateDTO;
import com.example.learnhub.dto.CourseCreationDTO;
import com.example.learnhub.exception.CourseNotFoundException;
import com.example.learnhub.model.Course;
import com.example.learnhub.model.CourseTemplate;
import com.example.learnhub.model.User;
import com.example.learnhub.repository.CourseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final CourseTemplateService templateService;
    //private final UserService userService;
    private final ModelMapper modelMapper;

    public CourseService(CourseRepository courseRepository,
                        CourseTemplateService templateService,
                        UserService userService,
                        ModelMapper modelMapper) {
        this.courseRepository = courseRepository;
        this.templateService = templateService;
        
        this.modelMapper = modelMapper;
    }
    
    public CourseDTO createCourseFromTemplate(String templateId, User creator, CourseCreationDTO creationDTO) {
        
        CourseTemplate template = templateService.getTemplateById(templateId);
        
        Course course = new Course();
        course.setTitle(creationDTO.getCustomTitle() != null ? 
                      creationDTO.getCustomTitle() : template.getTitle());
        course.setDescription(creationDTO.getCustomDescription() != null ? 
                           creationDTO.getCustomDescription() : template.getDescription());
        course.setCreator(creator);
        course.setTemplate(template);
        course.setModules(template.getModules());
        course.setPublished(false);
        course.setCategory(creationDTO.getCategory() != null ? 
                          creationDTO.getCategory() : template.getCategory());
        course.setImageUrl(creationDTO.getImageUrl() != null ?
                         creationDTO.getImageUrl() : "default-course.jpg");
        course.setTotalEnrollments(0);
        
        Course savedCourse = courseRepository.save(course);
        return convertToDTO(savedCourse);
    }
    
    public List<CourseDTO> getCoursesByCreator(User creator) {
        return courseRepository.findByCreator(creator).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<CourseDTO> getCoursesByTemplate(String templateId) {
        return courseRepository.findByTemplateId(templateId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<CourseDTO> getCoursesByCreatorAndTemplate(User creator, String templateId) {
        return courseRepository.findByCreatorAndTemplateId(creator, templateId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public CourseDTO publishCourse(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + courseId));
        course.setPublished(true);
        Course updatedCourse = courseRepository.save(course);
        return convertToDTO(updatedCourse);
    }
    
    public List<CourseDTO> getPublishedCourses() {
        return courseRepository.findByPublished(true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public CourseDTO getCourseById(String id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + id));
        return convertToDTO(course);
    }

    public Course getCourseEntityById(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + id));
    }
    
    public CourseDTO updateCourse(String courseId, CourseUpdateDTO updateDTO) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + courseId));
        
        if (updateDTO.getTitle() != null) {
            course.setTitle(updateDTO.getTitle());
        }
        if (updateDTO.getDescription() != null) {
            course.setDescription(updateDTO.getDescription());
        }
        if (updateDTO.getCategory() != null) {
            course.setCategory(updateDTO.getCategory());
        }
        if (updateDTO.getImageUrl() != null) {
            course.setImageUrl(updateDTO.getImageUrl());
        }
        if (updateDTO.getPublished() != null) {
            course.setPublished(updateDTO.getPublished());
        }
        
        Course updatedCourse = courseRepository.save(course);
        return convertToDTO(updatedCourse);
    }
    
    public void deleteCourse(String courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new CourseNotFoundException("Course not found with id: " + courseId);
        }
        courseRepository.deleteById(courseId);
    }
    
    private CourseDTO convertToDTO(Course course) {
        CourseDTO dto = modelMapper.map(course, CourseDTO.class);
        // Map creator and template IDs if needed
        if (course.getCreator() != null) {
            dto.setCreatorId(course.getCreator().getId());
        }
        if (course.getTemplate() != null) {
            dto.setTemplateId(course.getTemplate().getId());
        }
        return dto;
    }
}