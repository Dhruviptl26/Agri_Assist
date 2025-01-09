package com.example.FarmerLogin.Repository;


import com.example.FarmerLogin.entities.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

//responsible for interacting with the MySQL database using Spring Data JPA.
//JpaRepository, which gives you built-in methods so we dont need to write sql queries
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    Farmer findByPhoneNumber(String phoneNumber);//unique identifier
}
