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
    public void createOrder(@RequestBody OrderRequest request) {
        orderService.createOrder(request);
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
