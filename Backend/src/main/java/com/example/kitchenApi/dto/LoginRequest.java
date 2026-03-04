package com.example.kitchenApi.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String role;
    private String password;
}
