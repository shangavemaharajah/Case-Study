package com.example.learnhub.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.learnhub.model.Post;
import com.example.learnhub.service.PostService;
import com.example.learnhub.dto.PostUpdateRequest;
import com.example.learnhub.exception.UnauthorizedException;
import java.io.IOException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/posts")
@AllArgsConstructor
public class PostController {
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);
    private final PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(
            @RequestParam String title,
            @RequestParam String text,
            @RequestParam List<String> tags,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) List<MultipartFile> mediaFiles) {
        try {
            Post post = postService.createPost(title, text, tags, category, mediaFiles);
            return ResponseEntity.ok(post);
        } catch (IllegalArgumentException e) {
            logger.error("Error creating post: Invalid input", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            logger.error("File upload failed: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error occurred: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String searchCriteria) {
        try {
            Page<Post> posts = postService.getAllPosts(page, size, searchCriteria);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            logger.error("Error fetching posts: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching posts: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable String id) {
        try {
            Post post = postService.getPostById(id);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            logger.error("Error fetching post with id {}: ", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Post not found: " + e.getMessage());
        }
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<?> updatePost(
    //         @PathVariable String id,
    //         @RequestParam String title,
    //         @RequestParam String text,
    //         @RequestParam List<String> tags) {
    //     try {
    //         Post updatedPost = postService.updatePost(id, title, text, tags);
    //         return ResponseEntity.ok(updatedPost);
    //     } catch (UnauthorizedException e) {
    //         logger.error("Unauthorized attempt to update post {}: ", id, e);
    //         return ResponseEntity.status(HttpStatus.FORBIDDEN)
    //                 .body("Unauthorized: " + e.getMessage());
    //     } catch (Exception e) {
    //         logger.error("Error updating post {}: ", id, e);
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                 .body("Error updating post: " + e.getMessage());
    //     }
    // }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable String id) {
        logger.info("Attempting to delete post with ID: {}", id); // ✅ NEW LOG
        try {
            postService.deletePost(id);
            logger.info("Successfully deleted post with ID: {}", id); // ✅ NEW LOG for successful deletion
            return ResponseEntity.ok().build();
        } catch (UnauthorizedException e) {
            logger.error("Unauthorized attempt to delete post {}: ", id, e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Unauthorized: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Failed to delete post with ID: {}", id, e); // ✅ IMPROVED ERROR LOG
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting post: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<?> addComment(@PathVariable String id, @RequestParam String text) {
        try {
            Post post = postService.addComment(id, text);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            logger.error("Error adding comment to post {}: ", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding comment: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/comments/{commentId}")
    public ResponseEntity<?> updateComment(
            @PathVariable String id,
            @PathVariable String commentId,
            @RequestParam String text) {
        try {
            Post post = postService.updateComment(id, commentId, text);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            logger.error("Error updating comment {} in post {}: ", commentId, id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating comment: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable String id,
            @PathVariable String commentId) {
        try {
            Post post = postService.deleteComment(id, commentId);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            logger.error("Error deleting comment {} in post {}: ", commentId, id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting comment: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable String id) {
        try {
            Post post = postService.toggleLike(id);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            logger.error("Error liking post {}: ", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error liking post: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<?> viewPost(@PathVariable String id) {
        try {
            Post post = postService.incrementViews(id);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            logger.error("Error incrementing views for post {}: ", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error incrementing views: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(
            @PathVariable String id,
            @RequestBody PostUpdateRequest request) {
        try {
            Post updatedPost = postService.updatePost(id, request.title, request.text, request.tags);
            return ResponseEntity.ok(updatedPost);
        } catch (UnauthorizedException e) {
            logger.error("Unauthorized attempt to update post {}: ", id, e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Unauthorized: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error updating post {}: ", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating post: " + e.getMessage());
        }
    }
}