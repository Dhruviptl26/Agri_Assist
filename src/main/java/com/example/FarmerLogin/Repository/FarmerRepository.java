package com.example.FarmerLogin.Repository;


import com.example.FarmerLogin.entities.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    Optional<Farmer> findByPhoneNumber(String phoneNumber);
}

