package com.example.kitchenApi.controller;
import com.example.kitchenApi.dto.AnalyticsResponse;
import com.example.kitchenApi.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    private final OrderService orderService;
    @GetMapping("/analytics")
    public AnalyticsResponse getAnalytics() {
        return orderService.getAnalytics();
    }
}
