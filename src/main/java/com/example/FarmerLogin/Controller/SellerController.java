package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.Repository.SellerRepository;
import com.example.FarmerLogin.entities.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//rest api -> to use another server
//handles httprequest -> gat post delete put

@RestController//create bean componetnt
@RequestMapping("/api/seller")//end points use as methods.->maps whole class
@CrossOrigin(origins = "http://localhost:3000")
public class SellerController {

    @Autowired//to use another class withot creating it
    private SellerRepository sellerRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Seller seller) {
        if (sellerRepository.findByPhoneNumber(seller.getPhoneNumber()) != null) {
            return ResponseEntity.status(400).body("Phone number already registered");
        }
      sellerRepository.save(seller);
        return ResponseEntity.ok("Registration successful for seller ");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Seller seller) {
        Seller existingFarmer = sellerRepository.findByPhoneNumber(seller.getPhoneNumber());

        if (existingFarmer != null && existingFarmer.getPassword().equals(seller.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid phone number or password");
        }
    }
    @PostMapping("/getAll")
    public List<Seller> getAllSeller() {
        return sellerRepository.findAll();  // Returns a list of all seller
    }

}
