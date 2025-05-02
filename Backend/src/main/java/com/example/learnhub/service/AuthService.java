package com.example.learnhub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.learnhub.model.User;
import com.example.learnhub.repository.UserRepository;
import com.example.learnhub.exception.UserAlreadyExistsException;
import com.example.learnhub.exception.InvalidCredentialsException;
import com.example.learnhub.exception.InvalidInputException;
import com.example.learnhub.dto.AuthResponse;

import java.util.regex.Pattern;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";

    public String register(User request) {
        validateRegistrationInput(request);

        if (userRepository.existsByUsername(request.getUsername().trim())) {
            throw new UserAlreadyExistsException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        var user = new User();
        user.setUsername(request.getUsername().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setName(request.getName() != null ? request.getName().trim() : request.getUsername().trim());
        user.setRole("USER");
        user.setCreatedAt(LocalDateTime.now());
        user.setActive(true);

        try {
            userRepository.save(user);
            return jwtService.generateToken(user.getUsername());
        } catch (Exception e) {
            throw new RuntimeException("Error registering user: " + e.getMessage());
        }
    }

    public AuthResponse login(String username, String password) {
        try {
            username = username.trim();
            var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));

            if (!user.isActive()) {
                throw new InvalidCredentialsException("Account is not active");
            }

            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );

            String token = jwtService.generateToken(username);
            return new AuthResponse(
                token,
                user.getUsername(),
                user.getName(),
                user.getEmail()
            );
        } catch (InvalidCredentialsException e) {
            throw e;
        } catch (Exception e) {
            throw new InvalidCredentialsException("Invalid credentials");
        }
    }

    private void validateRegistrationInput(User user) {
        if (user == null) throw new InvalidInputException("User data cannot be null");

        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new InvalidInputException("Username is required");
        }

        if (user.getPassword() == null || !Pattern.matches(PASSWORD_REGEX, user.getPassword())) {
            throw new InvalidInputException("Password must meet complexity requirements");
        }

        if (user.getEmail() == null || !Pattern.matches(EMAIL_REGEX, user.getEmail())) {
            throw new InvalidInputException("Invalid email format");
        }

        if (user.getName() == null || user.getName().trim().isEmpty()) {
            throw new InvalidInputException("Name is required");
        }
    }
}
