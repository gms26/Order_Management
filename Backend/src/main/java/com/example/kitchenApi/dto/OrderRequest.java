package com.example.kitchenApi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    private java.util.List<OrderItemRequest> items;
}
