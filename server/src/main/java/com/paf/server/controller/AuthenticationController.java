package com.paf.server.controller;



import com.paf.server.model.AuthenticationResponce;
import com.paf.server.model.User;
import com.paf.server.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponce> register(@RequestBody User request){
        System.out.println("Request: " + request);
        return ResponseEntity.ok(authenticationService.register(request));

    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponce> login(@RequestBody User request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/refresh_token")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response){
        return authenticationService.refreshToken(request,response);
    }

}
