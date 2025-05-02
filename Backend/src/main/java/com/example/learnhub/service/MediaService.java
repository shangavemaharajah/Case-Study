package com.example.learnhub.service;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;

import org.springframework.http.MediaType;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;

@Service
public class MediaService {
    
    private static final Logger logger = LoggerFactory.getLogger(MediaService.class);
    private final GridFSBucket gridFSBucket;

    @Autowired
    public MediaService(GridFSBucket gridFSBucket) {
        this.gridFSBucket = gridFSBucket;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream()) {
            String fileName = file.getOriginalFilename();
            
            // Try to detect content type if not set
            String contentType = file.getContentType();
            if (contentType == null || contentType.isBlank()) {
                contentType = java.nio.file.Files.probeContentType(java.nio.file.Paths.get(fileName));
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
            }
    
            GridFSUploadOptions options = new GridFSUploadOptions()
                .metadata(new Document("contentType", contentType));
    
            ObjectId fileId = gridFSBucket.uploadFromStream(fileName, inputStream, options);
            return fileId.toString();
        } catch (Exception e) {
            throw new IOException("File upload failed for: " + file.getOriginalFilename(), e);
        }
    }
    
    public InputStream downloadFile(String fileId) {
        GridFSFile gridFSFile = gridFSBucket.find(new org.bson.Document("_id", new ObjectId(fileId))).first();
        if (gridFSFile == null) {
            throw new RuntimeException("File not found with ID: " + fileId);
        }
        return gridFSBucket.openDownloadStream(gridFSFile.getObjectId());
    }

    public String getContentType(String fileId) {
        GridFSFile file = gridFSBucket.find(new Document("_id", new ObjectId(fileId))).first();
        if (file != null && file.getMetadata() != null) {
            return file.getMetadata().getString("contentType");
        }
        return MediaType.APPLICATION_OCTET_STREAM_VALUE;
    }
    
    public void deleteMedia(String id) {
        try {
            gridFSBucket.delete(new ObjectId(id));
            logger.info("Successfully deleted media with id: {}", id);
        } catch (Exception e) {
            logger.error("Error deleting media with id: {}", id, e);
            throw new RuntimeException("Failed to delete media: " + e.getMessage());
        }
    }
}