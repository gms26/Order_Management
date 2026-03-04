package com.example.kitchenApi.controller;

import com.example.kitchenApi.entity.MenuItem;
import com.example.kitchenApi.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class MenuController {

    private final MenuItemRepository menuRepo;

    @GetMapping("/menu")
    public List<MenuItem> getMenu() {
        return menuRepo.findAll();
    }
}
