package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.Repository.FarmerRepository;
import com.example.FarmerLogin.entities.Farmer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//handles http requests
@RestController
@RequestMapping("/api/farmers")
public class FarmerController {

    @Autowired
    private FarmerRepository farmerRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Farmer farmer) {
        if (farmerRepository.findByPhoneNumber(farmer.getPhoneNumber()) != null) {
            return ResponseEntity.status(400).body("Phone number already registered");
        }
        farmerRepository.save(farmer);
        return ResponseEntity.ok("Registration successful");
    }

    // POST method for login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Farmer farmer) {
        Farmer existingFarmer = farmerRepository.findByPhoneNumber(farmer.getPhoneNumber());

        if (existingFarmer != null && existingFarmer.getPassword().equals(farmer.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid phone number or password");
        }
    }

    // POST method to retrieve all farmers
    @PostMapping("/getAll")
    public List<Farmer> getAllFarmers() {
        return farmerRepository.findAll();  // Returns a list of all farmers
    }

    // POST method to retrieve a specific farmer by phone number
    // POST method to retrieve a farmer by phone number
    @PostMapping("/getByPhone")
    public ResponseEntity<Farmer> getFarmerByPhoneNumber(@RequestBody Farmer farmer) {
        Farmer foundFarmer = farmerRepository.findByPhoneNumber(farmer.getPhoneNumber());
        if (foundFarmer != null) {
            return ResponseEntity.ok(foundFarmer); // Return farmer details if found
        } else {
            return ResponseEntity.status(404).body(null); // Return 404 if not found
        }
    }

}
