// src/main/java/com/example/learnhub/service/CourseTemplateService.java
package com.example.learnhub.service;

import com.example.learnhub.dto.TemplateCreationDTO;
import com.example.learnhub.exception.TemplateNotFoundException;
import com.example.learnhub.model.CourseTemplate;
import com.example.learnhub.model.Module;
import com.example.learnhub.repository.CourseTemplateRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CourseTemplateService {

    public CourseTemplate publishTemplate(String templateId) {
        CourseTemplate template = getTemplateById(templateId);
        template.setPublic(true);
        return templateRepository.save(template);
    }

    private final CourseTemplateRepository templateRepository;

    public CourseTemplateService(CourseTemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public List<CourseTemplate> getAllTemplates() {
        return templateRepository.findAll();
    }

    // Removed duplicate method getTemplatesByCreator(String userId)

    /**
     * Retrieves all public course templates
     * @return List of public CourseTemplate objects
     */
    public List<CourseTemplate> getAllPublicTemplates() {
        return templateRepository.findByIsPublic(true);
    }

    /**
     * Finds public templates by category
     * @param category The category to filter by
     * @return List of matching CourseTemplate objects
     * @throws IllegalArgumentException if category is null or empty
     */
    public List<CourseTemplate> getTemplatesByCategory(String category) {
        if (category == null || category.isBlank()) {
            throw new IllegalArgumentException("Category cannot be null or empty");
        }
        return templateRepository.findByCategoryAndIsPublic(category, true);
    }

    /**
     * Finds a template by its ID
     * @param id The template ID to search for
     * @return The found CourseTemplate
     * @throws IllegalArgumentException if ID is null or empty
     * @throws TemplateNotFoundException if template not found
     */
    public CourseTemplate getTemplateById(String id) {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("ID cannot be null or empty");
        }
        return templateRepository.findById(id)
                .orElseThrow(() -> new TemplateNotFoundException("Template not found with id: " + id));
    }

    /**
     * Creates a new course template from DTO
     * @param templateDTO The template data to create
     * @return The created CourseTemplate
     * @throws IllegalArgumentException if template data is invalid
     */
    public CourseTemplate createTemplate(TemplateCreationDTO templateDTO) {
        // Validate input
        if (templateDTO == null) {
            throw new IllegalArgumentException("Template data cannot be null");
        }
        if (templateDTO.getTitle() == null || templateDTO.getTitle().isBlank()) {
            throw new IllegalArgumentException("Template title cannot be empty");
        }
        if (templateDTO.getModules() == null || templateDTO.getModules().isEmpty()) {
            throw new IllegalArgumentException("Template must have at least one module");
        }

        // Convert DTO to entity
        CourseTemplate template = new CourseTemplate();
        template.setTitle(templateDTO.getTitle());
        template.setDescription(templateDTO.getDescription());
        template.setCategory(templateDTO.getCategory());
        template.setPublic(templateDTO.isPublic());
        
        template.setCreatorId(templateDTO.getCreatorId());
        // Convert ModuleDTOs to Modules with generated IDs
        List<Module> modules = templateDTO.getModules().stream()
                .map(moduleDTO -> {
                    Module module = new Module();
                    module.setId(UUID.randomUUID().toString());
                    module.setTitle(moduleDTO.getTitle());
                    module.setDescription(moduleDTO.getDescription());
                    module.setOrder(moduleDTO.getOrder());
                    module.setEstimatedDurationMinutes(moduleDTO.getEstimatedDurationMinutes());
                    return module;
                })
                .collect(Collectors.toList());
        
        template.setModules(modules);

        return templateRepository.save(template);
    }

    public List<CourseTemplate> getTemplatesByCreator(String userId) {
        return templateRepository.findByCreatorId(userId);
    }
}