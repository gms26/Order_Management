package com.example.kitchenApi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;



public enum OrderStatus {
    PLACED,
    COOKING,
    READY,
    DELIVERED
}


