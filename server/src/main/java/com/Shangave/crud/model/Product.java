package com.Shangave.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Entity
@Table(name = "products") // Table name 'products'
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;         // Product title
    private Double price;         // Product price
    private String description;   // Product description
    private String category;      // Product category
    private String url;           // Product URL
    private String urlType;       // URL type (Document, Image, Video, Other)
}
