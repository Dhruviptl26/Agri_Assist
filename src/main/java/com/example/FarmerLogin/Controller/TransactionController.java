package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.Repository.CropRepository;
import com.example.FarmerLogin.Repository.FarmerRepository;
import com.example.FarmerLogin.entities.Crop;
import com.example.FarmerLogin.entities.Farmer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @PostMapping("/buy")
    public String buyCrop(@RequestBody TransactionRequest request) {
        Optional<Crop> cropOptional = cropRepository.findById(request.getCropId());
        if (!cropOptional.isPresent()) {
            return "Crop not found";
        }

        Crop crop = cropOptional.get();
        Optional<Farmer> farmerOptional = farmerRepository.findById(crop.getFarmerId());
        if (!farmerOptional.isPresent()) {
            return "Farmer not found";
        }

        Farmer farmer = farmerOptional.get();
        double totalAmount = request.getTotalWeight() * crop.getPrice();
        farmer.setBalance(farmer.getBalance() + totalAmount);
        farmerRepository.save(farmer);

        return "Transaction successful";
    }
}

class TransactionRequest {
    private Long cropId;
    private double totalWeight;

    // Getters and Setters
    public Long getCropId() {
        return cropId;
    }

    public void setCropId(Long cropId) {
        this.cropId = cropId;
    }

    public double getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(double totalWeight) {
        this.totalWeight = totalWeight;
    }
}