package com.example.kitchenApi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private java.util.UUID id;

    private double totalPrice;

    private double priorityScore;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private java.time.LocalDateTime createdAt;
}

