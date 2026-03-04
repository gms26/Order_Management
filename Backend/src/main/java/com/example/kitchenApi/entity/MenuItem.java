package com.example.kitchenApi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private int stock;
}
