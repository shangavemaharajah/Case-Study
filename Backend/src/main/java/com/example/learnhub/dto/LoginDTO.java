package com.example.learnhub.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String username;  // Changed from email to username
    private String password;
}