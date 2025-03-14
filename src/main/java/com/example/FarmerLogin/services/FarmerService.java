package com.example.FarmerLogin.services;

import com.example.FarmerLogin.Repository.FarmerRepository;
import com.example.FarmerLogin.entities.Farmer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FarmerService {
    @Autowired
    private FarmerRepository farmerRepository;

    public Farmer findByPhoneNumber(String phoneNumber) {
        Optional<Farmer> farmer = farmerRepository.findByPhoneNumber(phoneNumber);
        if (farmer.isEmpty()) {
            System.out.println("Farmer not found for phone number: " + phoneNumber);
        }
        return farmer.orElse(null);
    }


    public Farmer saveFarmer(Farmer farmer) {
        farmer.setPassword(farmer.getPassword());
        return farmerRepository.save(farmer);
    }

    public List<Farmer> getAllFarmers() {
        return farmerRepository.findAll();
    }
}