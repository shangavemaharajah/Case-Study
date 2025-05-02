package com.example.learnhub.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@Builder
public class PostCreator {
    @DBRef
    private User user;
    private String name;
}
