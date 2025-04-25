package com.Shangave.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import lombok.Data;

@Entity
@Table(name = "linkedin_post_ideas")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;            // e.g., "Project Launch: Expense Tracker App"
    private String imageUrl;         // Optional: Link to an image
    private String videoUrl;         // Optional: Link to a video
    private String documentUrl;      // Optional: PDF or slide deck
    private String content;          // Main post body
    private String hashtags;         // Comma-separated hashtags
    private String mentions;         // Optional: tagged users or companies
}
