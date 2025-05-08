package com.paf_assignment.paf_assignment.Controller;

import com.paf_assignment.paf_assignment.DTO.ProgressDTO;
import com.paf_assignment.paf_assignment.Exception.ProgressNotFoundException;
import com.paf_assignment.paf_assignment.Model.Progress;
import com.paf_assignment.paf_assignment.Model.ResponseMessage;
import com.paf_assignment.paf_assignment.Service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    // Create a new Progress entry
    @PostMapping("/add")
    public ResponseEntity<ResponseMessage> createProgress(@RequestBody ProgressDTO progressDTO) {
        // Add validation for progressDTO if needed before calling service
        progressService.addProgress(progressDTO);
        ResponseMessage responseMessage = new ResponseMessage("Progress successfully added.", HttpStatus.CREATED);
        return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
    }

    // Update an existing Progress entry
    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateProgress(@PathVariable String id, @RequestBody ProgressDTO progressDTO) {
        // Check if the progress exists
        progressService.getProgressById(id).orElseThrow(() -> new ProgressNotFoundException(id));

        progressService.updateProgress(id, progressDTO);
        ResponseMessage responseMessage = new ResponseMessage("Progress with ID: " + id + " successfully updated.", HttpStatus.OK);
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    // Get all Progress entries
    @GetMapping("/getAll")
    public ResponseEntity<List<Progress>> getAllProgress() {
        List<Progress> progressList = progressService.getProgress();
        return new ResponseEntity<>(progressList, HttpStatus.OK);
    }

    // Get a single Progress entry by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Progress> getProgressById(@PathVariable String id) {
        Progress progress = progressService.getProgressById(id)
                .orElseThrow(() -> new ProgressNotFoundException(id));

        return new ResponseEntity<>(progress, HttpStatus.OK);
    }

    // Delete a Progress entry by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteProgress(@PathVariable String id) {
        // Check if progress exists before attempting deletion
        progressService.getProgressById(id).orElseThrow(() -> new ProgressNotFoundException(id));

        progressService.deleteProgress(id);
        ResponseMessage responseMessage = new ResponseMessage("Progress with ID: " + id + " successfully deleted.", HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(responseMessage, HttpStatus.NO_CONTENT);
    }
}
