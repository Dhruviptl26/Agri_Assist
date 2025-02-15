package com.example.FarmerLogin.Repository;

import com.example.FarmerLogin.entities.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface CropRepository extends JpaRepository<Crop, Long> {}
