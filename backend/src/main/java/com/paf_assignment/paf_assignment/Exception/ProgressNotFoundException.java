package com.paf_assignment.paf_assignment.Exception;

public class ProgressNotFoundException extends RuntimeException {
    public ProgressNotFoundException(String id) {
        super("Progress not found with ID: " + id);
    }
}
