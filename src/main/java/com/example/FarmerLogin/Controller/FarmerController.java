package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.entities.Farmer;
import com.example.FarmerLogin.services.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/farmers")
public class FarmerController {
    @Autowired
    private FarmerService farmerService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Farmer loginRequest) {
        Farmer farmer = farmerService.findByPhoneNumber(loginRequest.getPhoneNumber());
        if (farmer == null) {
            return ResponseEntity.status(401).body("Invalid phone number or password");
        }
        if (!farmer.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid phone number or password");
        }
        System.out.println("Received phone: " + loginRequest.getPhoneNumber());
        System.out.println("Received password: " + loginRequest.getPassword());

        return ResponseEntity.ok(farmer);
    }



    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Farmer farmer) {
        Farmer savedFarmer = farmerService.saveFarmer(farmer);
        return ResponseEntity.ok(savedFarmer);
    }

}