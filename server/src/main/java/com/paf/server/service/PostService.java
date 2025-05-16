package com.paf.server.service;

import com.paf.server.model.Post;
import com.paf.server.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Create post (already has image URL in it from controller)
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    // Get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Get post by ID
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    // Update a post
    public Post updatePost(Long id, Post updatedPost) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        // Only update fields that are allowed
        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setCaption(updatedPost.getCaption());
        existingPost.setLinkRef(updatedPost.getLinkRef());
        existingPost.setDate(updatedPost.getDate());

        return postRepository.save(existingPost);
    }

    // Delete a post
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
