package com.example.FarmerLogin.Repository;

import com.example.FarmerLogin.entities.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByFarmerId(Long farmerId);
}
