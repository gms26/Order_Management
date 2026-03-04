package com.example.kitchenApi.service;

import com.example.kitchenApi.dto.AnalyticsResponse;
import com.example.kitchenApi.dto.OrderItemRequest;
import com.example.kitchenApi.dto.OrderRequest;
import com.example.kitchenApi.entity.MenuItem;
import com.example.kitchenApi.entity.Order;
import com.example.kitchenApi.entity.OrderItem;
import com.example.kitchenApi.entity.OrderStatus;
import com.example.kitchenApi.repository.MenuItemRepository;
import com.example.kitchenApi.repository.OrderItemRepository;
import com.example.kitchenApi.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final MenuItemRepository menuRepo;
    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;

    public void createOrder(OrderRequest request) {

        Order order = new Order();
        order.setStatus(OrderStatus.PLACED);
        order.setCreatedAt(LocalDateTime.now());

        double total = 0;

        for (OrderItemRequest itemReq : request.getItems()) {

            MenuItem menuItem = menuRepo.findById(itemReq.getItemId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found: " + itemReq.getItemId()));

            if (menuItem.getStock() < itemReq.getQuantity()) {
                throw new RuntimeException("Insufficient stock for: " + menuItem.getName());
            }

            double itemPrice = menuItem.getPrice() * itemReq.getQuantity();

            total += itemPrice;

            // Deduct stock
            menuItem.setStock(menuItem.getStock() - itemReq.getQuantity());
            menuRepo.save(menuItem);
        }

        order.setTotalPrice(total);

        double priority = (total * 0.5) +
                (Math.random() * 100);

        order.setPriorityScore(priority);

        orderRepo.save(order);

        for (OrderItemRequest itemReq : request.getItems()) {

            MenuItem menuItem = menuRepo.findById(itemReq.getItemId())
                    .orElseThrow();

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemReq.getQuantity());

            orderItemRepo.save(orderItem);
        }
    }

    public List<Order> getAllOrdersSorted() {
        return orderRepo.findAll(
                Sort.by(Sort.Direction.DESC, "priorityScore"));
    }

    public void updateStatus(UUID id, String status) {
        Order order = orderRepo.findById(id).orElseThrow();
        order.setStatus(OrderStatus.valueOf(status));
        orderRepo.save(order);
    }

    public AnalyticsResponse getAnalytics() {

        Long pendingPlaced = orderRepo.countByStatus(OrderStatus.PLACED);
        Long pendingCooking = orderRepo.countByStatus(OrderStatus.COOKING);

        Long totalPending = pendingPlaced + pendingCooking;

        Double revenue = orderRepo.getDeliveredRevenue();

        return new AnalyticsResponse(revenue, totalPending);
    }

}
