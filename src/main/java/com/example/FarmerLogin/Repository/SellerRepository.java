package com.example.FarmerLogin.Repository;

import com.example.FarmerLogin.entities.Farmer;
import com.example.FarmerLogin.entities.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    Seller findByPhoneNumber(String phoneNumber);
}
