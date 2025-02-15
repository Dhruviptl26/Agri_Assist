package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.Repository.SellerRepository;
import com.example.FarmerLogin.entities.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin(origins = "http://localhost:3000")
public class SellerController {

    @Autowired
    private SellerRepository sellerRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Seller seller) {
        Optional<Seller> existingSeller = sellerRepository.findByPhoneNumber(seller.getPhoneNumber());
        if (existingSeller.isPresent()) {
            return ResponseEntity.status(400).body("Phone number already registered");
        }
        sellerRepository.save(seller);
        return ResponseEntity.ok("Registration successful for seller");
    }

    @PostMapping("/login")
    public ResponseEntity<Seller> login(@RequestBody Seller seller) {
        Optional<Seller> existingSeller = sellerRepository.findByPhoneNumber(seller.getPhoneNumber());

        if (existingSeller.isPresent() && existingSeller.get().getPassword().equals(seller.getPassword())) {
            System.out.println("Seller found");
            return ResponseEntity.ok(existingSeller.get());

        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

    @GetMapping("/getAll")
    public List<Seller> getAllSeller() {
        return sellerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) {
        Optional<Seller> seller = sellerRepository.findById(id);
        return seller.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(404).body(null));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logout successful");
    }
}
