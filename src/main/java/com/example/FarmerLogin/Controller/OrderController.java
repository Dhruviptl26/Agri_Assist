package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.entities.Order;
import com.example.FarmerLogin.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins =" http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody List<Order> orders) {
        for (Order order : orders) {
            orderService.saveOrder(order);
        }
        return ResponseEntity.ok().build();
    }
}