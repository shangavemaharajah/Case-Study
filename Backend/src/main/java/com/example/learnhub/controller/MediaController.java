package com.example.learnhub.controller;

import com.example.learnhub.service.MediaService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.InputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;

@RestController
@RequestMapping("/media")
@AllArgsConstructor
public class MediaController {

    private final MediaService mediaService;

    @GetMapping(value = "/{id}", produces = MediaType.ALL_VALUE)
    public ResponseEntity<byte[]> getMedia(@PathVariable String id) {
        try (InputStream inputStream = mediaService.downloadFile(id)) {
            String contentType = mediaService.getContentType(id);
            byte[] bytes = inputStream.readAllBytes();

            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                    .body(bytes);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/{id}/type")
    public ResponseEntity<String> getMediaType(@PathVariable String id) {
        try {
            String contentType = mediaService.getContentType(id);
            return ResponseEntity.ok(contentType);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("unknown");
        }
    }

}
