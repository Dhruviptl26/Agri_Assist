package com.example.FarmerLogin.Repository;

import com.example.FarmerLogin.entities.Farmer;
import com.example.FarmerLogin.entities.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SellerRepository extends JpaRepository<Seller, Long> {
    Optional<Seller> findByPhoneNumber(String phoneNumber);
}