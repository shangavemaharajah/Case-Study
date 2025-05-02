package com.example.learnhub.service;

import org.springframework.util.StringUtils;
import lombok.AllArgsConstructor;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.learnhub.model.Post;
import com.example.learnhub.model.PostCreator;
import com.example.learnhub.model.User;
import com.example.learnhub.repository.PostRepository;
import com.example.learnhub.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.learnhub.model.Comment;
import com.example.learnhub.exception.PostNotFoundException;
import com.example.learnhub.exception.UnauthorizedException;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@AllArgsConstructor
@Transactional
public class PostService {
    private static final Logger logger = LoggerFactory.getLogger(PostService.class);
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final MediaService mediaService;

    public Post createPost(String title, String text, List<String> tags, String category, List<MultipartFile> mediaFiles) throws IOException {
        if (StringUtils.isEmpty(title) || StringUtils.isEmpty(text)) {
            throw new IllegalArgumentException("Title and text are required");
        }
        if (mediaFiles != null && mediaFiles.size() > 3) {
            throw new IllegalArgumentException("You can upload up to 3 media files only.");
        }

        List<String> mediaIds = new ArrayList<>();
        if (mediaFiles != null) {
            for (MultipartFile file : mediaFiles) {
                try {
                    if (!file.getContentType().startsWith("image/") && !file.getContentType().startsWith("video/")) {
                        throw new IllegalArgumentException("Only images and videos are allowed.");
                    }
                    if (file.getContentType().startsWith("video/") && file.getSize() > 30 * 1024 * 1024) {
                        throw new IllegalArgumentException("Video files must be less than 30 seconds.");
                    }
                    String mediaId = mediaService.uploadFile(file);
                    mediaIds.add(mediaId);
                } catch (Exception e) {
                    logger.error("Error uploading file: " + file.getOriginalFilename(), e);
                    throw new IOException("File upload failed for: " + file.getOriginalFilename(), e);
                }
            }
        }

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        Post post = new Post();
        post.setTitle(title.trim());
        post.setText(text.trim());
        post.setTags(tags != null ? tags.stream()
                .filter(tag -> !StringUtils.isEmpty(tag))
                .map(String::trim)
                .distinct()
                .collect(java.util.stream.Collectors.toList()) : new ArrayList<>());
        post.setCategory(category);
        post.setLikes(0);
        post.setViews(0);
        post.setCreator(PostCreator.builder()
                .user(user)
                .name(user.getName())
                .build());
        post.setCreatedAt(java.time.LocalDateTime.now());
        post.setComments(new ArrayList<>());
        post.setLikedBy(new ArrayList<>());
        post.setMediaIds(mediaIds);

        return postRepository.save(post);
    }

    public Page<Post> getAllPosts(int page, int size, String searchCriteria) {
        try {
            Sort sort = Sort.by(Direction.DESC, "createdAt");
            PageRequest pageRequest = PageRequest.of(page, size, sort);

            if (searchCriteria == null || searchCriteria.trim().isEmpty()) {
                return postRepository.findAll(pageRequest);
            }

            String searchTerm = "%" + searchCriteria.trim() + "%";
            return postRepository.findByTitleLikeOrTextLikeOrTagsContaining(
                    searchTerm,
                    searchTerm,
                    searchTerm,
                    pageRequest);
        } catch (Exception e) {
            logger.error("Error fetching posts: ", e);
            throw new RuntimeException("Error fetching posts: " + e.getMessage());
        }
    }

    public Post getPostById(String id) {
        if (StringUtils.isEmpty(id)) {
            throw new IllegalArgumentException("Post ID cannot be empty");
        }
        return postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));
    }

    public Post updatePost(String id, String title, String text, List<String> tags) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Post post = getPostById(id);

        if (!post.getCreator().getUser().getUsername().equals(username)) {
            throw new UnauthorizedException("Unauthorized to update this post");
        }

        if (StringUtils.hasText(title)) {
            post.setTitle(title.trim());
        }
        if (StringUtils.hasText(text)) {
            post.setText(text.trim());
        }
        if (tags != null && !tags.isEmpty()) {
            List<String> validTags = tags.stream()
                    .filter(tag -> StringUtils.hasText(tag))
                    .map(String::trim)
                    .distinct()
                    .collect(java.util.stream.Collectors.toList());
            if (!validTags.isEmpty()) {
                post.setTags(validTags);
            }
        }

        return postRepository.save(post);
    }

    public void deletePost(String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Post post = getPostById(id);

        System.out.println("User trying to delete post: " + username);
        System.out.println("Post created by: " + post.getCreator().getUser().getUsername());

        if (!post.getCreator().getUser().getUsername().equals(username)) {
            throw new UnauthorizedException("Unauthorized to delete this post");
        }

        if (!postRepository.existsById(id)) {
            throw new PostNotFoundException("Post not found with id: " + id);
        }

        if (post.getMediaIds() != null && !post.getMediaIds().isEmpty()) {
            for (String mediaId : post.getMediaIds()) {
                try {
                    mediaService.deleteMedia(mediaId);
                } catch (Exception e) {
                    logger.warn("Failed to delete media: " + mediaId, e);
                }
            }
        }

        postRepository.deleteById(id);
    }

    public Post addComment(String postId, String text) {
        if (StringUtils.isEmpty(text.trim())) {
            throw new IllegalArgumentException("Comment text cannot be empty");
        }

        Post post = getPostById(postId);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        Comment comment = new Comment();
        comment.setId(java.util.UUID.randomUUID().toString());
        comment.setText(text.trim());
        comment.setCreator(PostCreator.builder()
                .user(user)
                .name(user.getName())
                .build());
        comment.setCreatedAt(java.time.LocalDateTime.now());

        if (post.getComments() == null) {
            post.setComments(new ArrayList<>());
        }
        post.getComments().add(comment);

        return postRepository.save(post);
    }

    public Post incrementViews(String postId) {
        Post post = getPostById(postId);
        post.setViews(post.getViews() + 1);
        return postRepository.save(post);
    }

    @Transactional
    public synchronized Post toggleLike(String postId) {
        Post post = getPostById(postId);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (post.getLikedBy() == null) {
            post.setLikedBy(new ArrayList<>());
        }

        boolean wasLiked = post.getLikedBy().remove(username);
        if (!wasLiked) {
            post.getLikedBy().add(username);
            post.setLikes(post.getLikes() + 1);
        } else {
            post.setLikes(Math.max(0, post.getLikes() - 1));
        }

        return postRepository.save(post);
    }

    public Post deleteComment(String postId, String commentId) {
        if (StringUtils.isEmpty(postId) || StringUtils.isEmpty(commentId)) {
            throw new IllegalArgumentException("Post ID and Comment ID cannot be empty");
        }

        Post post = getPostById(postId);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<Comment> commentOpt = post.getComments().stream()
                .filter(c -> c.getId().equals(commentId))
                .findFirst();

        if (commentOpt.isEmpty()) {
            throw new PostNotFoundException("Comment not found");
        }

        Comment comment = commentOpt.get();

        System.out.println("User trying to delete comment: " + username);
        System.out.println("Comment created by: " + comment.getCreator().getUser().getUsername());

        if (!comment.getCreator().getUser().getUsername().equals(username) &&
                !post.getCreator().getUser().getUsername().equals(username)) {
            throw new UnauthorizedException("Unauthorized to delete this comment");
        }

        post.getComments().remove(comment);
        return postRepository.save(post);
    }

    public Post updateComment(String postId, String commentId, String newText) {
        if (StringUtils.isEmpty(postId) || StringUtils.isEmpty(commentId) || StringUtils.isEmpty(newText)) {
            throw new IllegalArgumentException("Post ID, Comment ID and text cannot be empty");
        }

        Post post = getPostById(postId);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<Comment> commentOpt = post.getComments().stream()
                .filter(c -> c.getId().equals(commentId))
                .findFirst();

        if (commentOpt.isEmpty()) {
            throw new PostNotFoundException("Comment not found");
        }

        Comment comment = commentOpt.get();

        if (!comment.getCreator().getUser().getUsername().equals(username)) {
            throw new UnauthorizedException("Unauthorized to edit this comment");
        }

        comment.setText(newText.trim());
        comment.setCreatedAt(java.time.LocalDateTime.now());

        return postRepository.save(post);
    }
}