package com.example.kitchenApi.controller;

import com.example.kitchenApi.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Value("${auth.admin.password}")
    private String adminPassword;

    @Value("${auth.kitchen.password}")
    private String kitchenPassword;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String role = request.getRole();
        String password = request.getPassword();

        if ("customer".equalsIgnoreCase(role)) {
            return ResponseEntity.ok(Map.of("message", "Login successful", "role", "customer"));
        }

        if ("admin".equalsIgnoreCase(role)) {
            if (adminPassword.equals(password)) {
                return ResponseEntity.ok(Map.of("message", "Login successful", "role", "admin"));
            }
        } else if ("kitchen".equalsIgnoreCase(role)) {
            if (kitchenPassword.equals(password)) {
                return ResponseEntity.ok(Map.of("message", "Login successful", "role", "kitchen"));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid password"));
    }
}
