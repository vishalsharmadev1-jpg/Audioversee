
package com.audioverse.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.audioverse.backend.dto.LoginRequest;
import com.audioverse.backend.dto.RegisterRequest;
import com.audioverse.backend.entity.User;
import com.audioverse.backend.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(
            UserService userService,
            PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // SIGNUP: POST /api/users
    @PostMapping
    public ResponseEntity<String> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail().trim().toLowerCase());

        String hashedPassword =
                passwordEncoder.encode(request.getPassword());

        user.setPassword(hashedPassword);

        User savedUser = userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered successfully with ID: "
                        + savedUser.getId());
    }

    // LOGIN: POST /api/users/login
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request) {

        return userService.authenticate(
                request.getEmail(),
                request.getPassword()
        )
        .<ResponseEntity<?>>map(user ->
                ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail()
                )))
        .orElseGet(() ->
                ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(
                                "message",
                                "Invalid email or password"
                        )));
    }
}
