package com.paf.server.controller;

import com.paf.server.model.Post;
import com.paf.server.repository.PostRepository;
import com.paf.server.service.ImageUploadService;
import com.paf.server.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private ImageUploadService imageUploadService;


    @Autowired
    private PostService postService;


    @PostMapping("/add")
    public ResponseEntity<?> addPost(
            @RequestParam("username") String username,
            @RequestParam("date") String date,
            @RequestParam("caption") String caption,
            @RequestParam("title") String title,
            @RequestParam("linkRef") String linkRef,
            @RequestParam("userId") String userId,
            @RequestParam("image") MultipartFile imageFile
    ) {
        try {
            String imageUrl = imageUploadService.uploadImage(imageFile);

            Post post = new Post();
            post.setUsername(username);
            post.setDate(date);
            post.setCaption(caption);
            post.setTitle(title);
            post.setLinkRef(linkRef);
            post.setUserId(userId);
            post.setImageURL(imageUrl);

            Post savedPost = postService.createPost(post);

            return ResponseEntity.ok(savedPost);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Image upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        try {
            Post post = postService.updatePost(id, updatedPost);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok("Post deleted successfully");
    }

}
