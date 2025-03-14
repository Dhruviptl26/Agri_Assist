package com.example.FarmerLogin.services;

import com.example.FarmerLogin.Repository.CropRepository;
import com.example.FarmerLogin.entities.Crop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.List;

@Service
public class CropService {
    @Autowired
    private CropRepository cropRepository;

    public List<Crop> getCropsByFarmerId(Long farmerId) {
        return cropRepository.findByFarmerId(farmerId);
    }


    public Crop getCropById(Long id) {
        return cropRepository.findById(id).orElse(null);
    }

    public Crop saveCrop(Crop crop) {
        return cropRepository.save(crop);
    }


    public void deleteCrop(Long id) {
        if (cropRepository.existsById(id)) {
            cropRepository.deleteById(id);
        } else {
            throw new RuntimeException("Crop with ID " + id + " not found");
        }
    }

    public Crop updateCrop(Long id, String name, String productType, String variety, String genetics,
                           double price, double totalWeight, String region, String imageUrl,
                           String shellType, String almondForm, String peanutForm, String size,
                           String productStatus, String kernalPerKg) {
        Optional<Crop> optionalCrop = cropRepository.findById(id);

        if (optionalCrop.isPresent()) {
            Crop crop = optionalCrop.get();
            crop.setName(name);
            crop.setProductType(productType);
            crop.setVariety(variety);
            crop.setGenetics(genetics);
            crop.setPrice(price);
            crop.setTotalWeight(totalWeight);
            crop.setRegion(region);
            crop.setShellType(shellType);
            crop.setAlmondForm(almondForm);
            crop.setPeanutForm(peanutForm);
            crop.setSize(size);
            crop.setProductStatus(productStatus);
            crop.setKernalPerKg(kernalPerKg);

            if (imageUrl != null && !imageUrl.isEmpty()) {
                crop.setImageUrl(imageUrl); // Update image if a new one is provided
            }

            return cropRepository.save(crop);
        } else {
            throw new RuntimeException("Crop not found with ID: " + id);
        }
    }

//    public Crop getCropById(Long id) {
//        return cropRepository.findById(id).orElseThrow(() ->
//                new RuntimeException("Crop with ID " + id + " not found"));
//    }

    public Crop buyCrop(Long id, Double weight) {
        Crop crop = getCropById(id);

        if (crop.getTotalWeight() < weight) {
            throw new IllegalArgumentException("Insufficient weight available for crop ID: " + id);
        }
        if (weight <= 0) {
            throw new IllegalArgumentException("Invalid weight amount: " + weight);
        }

        crop.setTotalWeight(crop.getTotalWeight() - weight);
        return saveCrop(crop);
    }




}
