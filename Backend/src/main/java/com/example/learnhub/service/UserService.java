// src/main/java/com/example/learnhub/service/UserService.java
package com.example.learnhub.service;

import com.example.learnhub.dto.UserDTO;
import com.example.learnhub.exception.UserAlreadyExistsException;
import com.example.learnhub.exception.UserNotFoundException;
import com.example.learnhub.model.User;
import com.example.learnhub.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserService(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    // Basic CRUD operations
    public UserDTO registerUser(User newUser) {
        validateUserDoesNotExist(newUser);
        User savedUser = userRepository.save(newUser);
        return convertToDTO(savedUser);
    }


    public User getUserEntityById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }
    
    public UserDTO getUserById(String id) {
        User user = getUserEntityById(id);
        return convertToDTO(user);
    }

 
    

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    // Creator-related methods
    public List<UserDTO> getCreatorsByTemplate(String templateId) {
        return userRepository.findUsersByCreatedTemplates(templateId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getCreatorsByCourse(String courseId) {
        return userRepository.findUsersByCreatedCourses(courseId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Utility methods
    public boolean existsById(String userId) {
        return userRepository.existsById(userId);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    private void validateUserDoesNotExist(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("Email already in use: " + user.getEmail());
        }
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Username already taken: " + user.getUsername());
        }
    }

    private UserDTO convertToDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public User convertToEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}