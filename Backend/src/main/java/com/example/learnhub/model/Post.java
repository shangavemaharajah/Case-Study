package com.example.learnhub.model;

import org.springframework.data.annotation.Id;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Data
@Document("post")
public class Post {
    @Id
    private String id;
    private String title;
    private String text;
    private List<String> tags;
    private LocalDateTime createdAt;
    private int likes;
    private PostCreator creator;
    private List<Comment> comments = new ArrayList<>();
    private int views;
    private String category;
    private List<String> likedBy = new ArrayList<>();
    private List<String> mediaIds = new ArrayList<>();
}
