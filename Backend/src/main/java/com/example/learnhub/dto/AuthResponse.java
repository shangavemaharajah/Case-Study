package com.example.learnhub.dto;

public record AuthResponse(
    String token,
    String username,
    String name,
    String email
) {}
