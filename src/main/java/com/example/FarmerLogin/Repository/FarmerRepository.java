package com.example.FarmerLogin.Repository;

import com.example.FarmerLogin.entities.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    Optional<Farmer> findByPhoneNumber(String phoneNumber);
}
