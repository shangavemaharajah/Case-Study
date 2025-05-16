package com.paf.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class Post {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @JsonProperty("username")
    private String username;

    @JsonProperty("date")
    private String date;

    @JsonProperty("caption")
    private String caption;

    @JsonProperty("title")
    private String title;

    @JsonProperty("imageURL")
    private String imageURL;

    @JsonProperty("linkRef")
    private String linkRef;

    @JsonProperty("userId")
    private String userId;



    // --- Default CONSTRUCTOR ---
    public Post() {

    }

    // --- PARAMETERIZED CONSTRUCTOR ---
    public Post(Long id, String username, String date, String caption, String title, String imageURL, String linkRef, String userId) {
        this.id = id;
        this.username = username;
        this.date = date;
        this.caption = caption;
        this.title = title;
        this.imageURL = imageURL;
        this.linkRef = linkRef;
        this.userId = userId;
    }

    // --- GETTERS & SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getLinkRef() {
        return linkRef;
    }

    public void setLinkRef(String linkRef) {
        this.linkRef = linkRef;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}

