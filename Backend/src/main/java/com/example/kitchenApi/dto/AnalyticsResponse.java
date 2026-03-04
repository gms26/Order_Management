package com.example.kitchenApi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnalyticsResponse {
    private Double totalRevenue;
    private Long pendingOrders;
}
