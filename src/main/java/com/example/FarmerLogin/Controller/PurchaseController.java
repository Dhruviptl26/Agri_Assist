package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.Repository.FarmerRepository;
import com.example.FarmerLogin.Repository.CropRepository;
import com.example.FarmerLogin.Repository.PurchaseRepository;
import com.example.FarmerLogin.entities.Farmer;
import com.example.FarmerLogin.entities.Crop;
import com.example.FarmerLogin.entities.Purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/purchases")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class PurchaseController {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private CropRepository cropRepository;

    @PostMapping("/buy")
    public ResponseEntity<?> buyCrop(@RequestParam Long farmerId,
                                     @RequestParam Long cropId,
                                     @RequestParam int quantity) {
        Optional<Farmer> farmerOpt = farmerRepository.findById(farmerId);
        Optional<Crop> cropOpt = cropRepository.findById(cropId);

        if (farmerOpt.isEmpty() || cropOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Farmer or Crop not found");
        }

        Farmer farmer = farmerOpt.get();
        Crop crop = cropOpt.get();

        if (crop.getQuantity() < quantity) {
            return ResponseEntity.status(400).body("Not enough crop quantity available");
        }

        double totalPrice = quantity * crop.getPrice();

        if (farmer.getBalance() < totalPrice) {
            return ResponseEntity.status(400).body("Insufficient balance");
        }

        // Deduct balance
        farmer.setBalance(farmer.getBalance() - totalPrice);
        farmerRepository.save(farmer);

        // Reduce crop stock
        crop.setQuantity(crop.getQuantity() - quantity);
        cropRepository.save(crop);

        // Save the purchase
        Purchase purchase = new Purchase(farmer, crop, quantity, totalPrice);
        purchaseRepository.save(purchase);

        return ResponseEntity.ok("Purchase successful! Total cost: " + totalPrice);
    }


    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<?> getPurchasesByFarmer(@PathVariable Long farmerId) {
        return ResponseEntity.ok(purchaseRepository.findByFarmerId(farmerId));
    }
}
