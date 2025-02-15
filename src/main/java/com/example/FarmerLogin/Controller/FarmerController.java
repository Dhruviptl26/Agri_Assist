package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.Repository.FarmerRepository;
import com.example.FarmerLogin.entities.Farmer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/farmers")
@CrossOrigin(origins = "http://localhost:3000")
public class FarmerController {

    @Autowired
    private FarmerRepository farmerRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Farmer farmer) {
        Optional<Farmer> existingFarmer = farmerRepository.findByPhoneNumber(farmer.getPhoneNumber());
        if (existingFarmer.isPresent()) {
            return ResponseEntity.status(400).body("Phone number already registered");
        }
        farmerRepository.save(farmer);
        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<Farmer> login(@RequestBody Farmer farmer) {
        Optional<Farmer> existingFarmer = farmerRepository.findByPhoneNumber(farmer.getPhoneNumber());

        if (existingFarmer.isPresent() && existingFarmer.get().getPassword().equals(farmer.getPassword())) {
            return ResponseEntity.ok(existingFarmer.get());
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

    @GetMapping("/getAll")
    public List<Farmer> getAllFarmers() {
        return farmerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Farmer> getFarmerById(@PathVariable Long id) {
        Optional<Farmer> farmer = farmerRepository.findById(id);
        return farmer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(404).body(null));
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }
    @PutMapping("/farmer/{id}/recharge")
    public ResponseEntity<?> rechargeFarmerBalance(@PathVariable Long id, @RequestParam double amount) {
        Optional<Farmer> farmerOpt = farmerRepository.findById(id);
        if (farmerOpt.isPresent()) {
            Farmer farmer = farmerOpt.get();
            if (amount <= 0) {
                return ResponseEntity.badRequest().body("Invalid amount!");
            }
            farmer.setBalance(farmer.getBalance() + amount);
            farmerRepository.save(farmer);
            return ResponseEntity.ok("Balance updated! New balance: " + farmer.getBalance());
        } else {
            return ResponseEntity.status(404).body("Farmer not found!");
        }
    }

}
