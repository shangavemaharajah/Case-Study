package com.example.learnhub.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoConfig {

    private final MongoClient mongoClient;

    public MongoConfig(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @Bean
    public GridFSBucket gridFSBucket() {
        try {
            return GridFSBuckets.create(mongoClient.getDatabase("Users")); // Ensure the database name is correct
        } catch (Exception e) {
            throw new RuntimeException("Failed to create GridFSBucket", e);  // Log the error if GridFSBucket creation fails
        }
    }
}
