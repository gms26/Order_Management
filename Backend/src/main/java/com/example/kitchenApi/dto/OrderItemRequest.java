package com.example.kitchenApi.dto;

import lombok.*;

@Getter @Setter
public class OrderItemRequest {
    private Long itemId;
    private int quantity;
}
