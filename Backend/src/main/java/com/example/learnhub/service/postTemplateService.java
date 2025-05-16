// src/main/java/com/example/learnhub/service/postTemplateService.java
package com.example.learnhub.service;

import com.example.learnhub.dto.TemplateCreationDTO;
import com.example.learnhub.exception.TemplateNotFoundException;
import com.example.learnhub.model.postTemplate;
import com.example.learnhub.model.Module;
import com.example.learnhub.repository.postTemplateRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class postTemplateService {

    public postTemplate publishTemplate(String templateId) {
        postTemplate template = getTemplateById(templateId);
        template.setPublic(true);
        return templateRepository.save(template);
    }

    private final postTemplateRepository templateRepository;

    public postTemplateService(postTemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public List<postTemplate> getAllTemplates() {
        return templateRepository.findAll();
    }

    // Removed duplicate method getTemplatesByCreator(String userId)

    /**
     * Retrieves all public post templates
     * @return List of public postTemplate objects
     */
    public List<postTemplate> getAllPublicTemplates() {
        return templateRepository.findByIsPublic(true);
    }

    /**
     * Finds public templates by category
     * @param category The category to filter by
     * @return List of matching postTemplate objects
     * @throws IllegalArgumentException if category is null or empty
     */
    public List<postTemplate> getTemplatesByCategory(String category) {
        if (category == null || category.isBlank()) {
            throw new IllegalArgumentException("Category cannot be null or empty");
        }
        return templateRepository.findByCategoryAndIsPublic(category, true);
    }

    /**
     * Finds a template by its ID
     * @param id The template ID to search for
     * @return The found postTemplate
     * @throws IllegalArgumentException if ID is null or empty
     * @throws TemplateNotFoundException if template not found
     */
    public postTemplate getTemplateById(String id) {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("ID cannot be null or empty");
        }
        return templateRepository.findById(id)
                .orElseThrow(() -> new TemplateNotFoundException("Template not found with id: " + id));
    }

    /**
     * Creates a new post template from DTO
     * @param templateDTO The template data to create
     * @return The created postTemplate
     * @throws IllegalArgumentException if template data is invalid
     */
    public postTemplate createTemplate(TemplateCreationDTO templateDTO) {
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
        postTemplate template = new postTemplate();
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

    public List<postTemplate> getTemplatesByCreator(String userId) {
        return templateRepository.findByCreatorId(userId);
    }
}