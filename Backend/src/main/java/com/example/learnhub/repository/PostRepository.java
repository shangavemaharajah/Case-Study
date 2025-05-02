package com.example.learnhub.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.example.learnhub.model.Post;

public interface PostRepository extends MongoRepository<Post, String> {
    // Original method (can be kept for backward compatibility if needed)
    Page<Post> findByTitleLikeOrTextLikeOrTagsContaining(
        String title,
        String text,
        String tag,
        Pageable pageable
    );
    
    // New improved search method with MongoDB regex for better text matching
    @Query("{'$or':[ {'title': {$regex: ?0, $options: 'i'}}, {'text': {$regex: ?0, $options: 'i'}}, {'tags': {$regex: ?0, $options: 'i'}} ]}")
    Page<Post> searchByKeyword(String keyword, Pageable pageable);
}