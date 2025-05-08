package com.paf_assignment.paf_assignment.Exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle ProgressNotFoundException
    @ExceptionHandler(ProgressNotFoundException.class)  // Use the imported class here
    public ResponseEntity<String> handleProgressNotFoundException(ProgressNotFoundException ex) {
        // Return a 404 Not Found status with the exception message
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Handle general exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGlobalException(Exception ex) {
        // Return a 500 Internal Server Error with the exception message
        return new ResponseEntity<>("Internal server error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
