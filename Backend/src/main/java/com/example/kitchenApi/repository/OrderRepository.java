package com.example.kitchenApi.repository;

import com.example.kitchenApi.entity.Order;
import com.example.kitchenApi.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    Long countByStatus(OrderStatus status);

    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o WHERE o.status = 'DELIVERED'")
    Double getDeliveredRevenue();
}
