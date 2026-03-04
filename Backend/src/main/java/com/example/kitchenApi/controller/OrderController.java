package com.example.kitchenApi.controller;

import com.example.kitchenApi.dto.OrderRequest;
import com.example.kitchenApi.entity.Order;
import com.example.kitchenApi.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/orders")
    public org.springframework.http.ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        try {
            orderService.createOrder(request);
            return org.springframework.http.ResponseEntity.ok().build();
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.badRequest()
                    .body(java.util.Collections.singletonMap("message", e.getMessage()));
        }
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderService.getAllOrdersSorted();
    }

    @PutMapping("/orders/{id}/status")
    public void updateStatus(@PathVariable UUID id,
            @RequestBody Map<String, String> body) {
        orderService.updateStatus(id, body.get("status"));
    }
}
