package com.paf.server.service;


import com.paf.server.model.AuthenticationResponce;
import com.paf.server.model.Role;
import com.paf.server.model.Token;
import com.paf.server.model.User;
import com.paf.server.repository.TokenRepo;
import com.paf.server.repository.UserRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenRepo tokenRepo;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepo userRepo, PasswordEncoder passwordEncoder, JwtService jwtService, TokenRepo tokenRepo, AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepo = tokenRepo;
        this.authenticationManager = authenticationManager;
    }

    // Register
    public AuthenticationResponce register(User request) {
        if (userRepo.findByUsername(request.getUsername()).isPresent()) {
            return new AuthenticationResponce(null,null,"User already exits",null,null,null);
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        if (request.getRole() == null) {
            user.setRole(Role.valueOf("USER"));  // Default role
        } else {
            user.setRole(request.getRole());  // Set provided role
        }

        user = userRepo.save(user);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        saveUserToken(accessToken, refreshToken, user);

        return new AuthenticationResponce(accessToken, refreshToken, "User registered successfully", user.getUsername(), user.getRole(), user.getId());
    }

    // Login
    public AuthenticationResponce authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user =  userRepo.findByUsername(request.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(accessToken, refreshToken, user);

        return new AuthenticationResponce(accessToken, refreshToken, "User logged in successfully", user.getUsername(), user.getRole(), user.getId());
    }

    private void revokeAllTokenByUser(User user) {
        List<Token> validTokens = tokenRepo.findAllAccessTokenByUser(user.getId());
        if (validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(t -> t.setLoggedOut(true));
        tokenRepo.saveAll(validTokens);
    }

    private void saveUserToken(String accessToken, String refreshToken, User user) {
        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setUser(user);
        token.setLoggedOut(false);
        tokenRepo.save(token);
    }

    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // extract username from token
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);

        // check if the user exist in database
        User user = userRepo.findByUsername(username)
                .orElseThrow(()->new RuntimeException("No user found"));


        if (jwtService.isValidRefreshToken(token, user)) {
            // generate access token
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            revokeAllTokenByUser(user);
            saveUserToken(accessToken, refreshToken, user);

            return ResponseEntity.ok(new AuthenticationResponce(accessToken, refreshToken, "New token generated", user.getUsername(), user.getRole(), user.getId()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
