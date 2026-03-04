package com.example.kitchenApi;

import com.example.kitchenApi.entity.MenuItem;
import com.example.kitchenApi.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class KitchenApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(KitchenApiApplication.class, args);
	}

}
