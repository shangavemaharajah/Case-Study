package com.example.learnhub.dto;

import lombok.Data;

@Data
public class postUpdateDTO {
    private String title;
    private String description;
    private String category;
    private String imageUrl;
    private Boolean published;
}