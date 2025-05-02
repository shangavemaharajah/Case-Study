package com.example.learnhub.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Comment {
    private String id;
    private String text;
    private PostCreator creator;
    private LocalDateTime createdAt;
}
