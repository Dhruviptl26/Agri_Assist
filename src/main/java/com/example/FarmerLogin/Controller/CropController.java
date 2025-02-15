package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.Repository.CropRepository;
import com.example.FarmerLogin.entities.Crop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
@RestController
@RequestMapping("/api/crops")
public class CropController {

    @Autowired
    private CropRepository cropRepository;


    @GetMapping
    public ResponseEntity<List<Crop>> getAllCrops() {
        return ResponseEntity.ok(cropRepository.findAll());
    }


    @PostMapping("/add")
    public ResponseEntity<?> addCrop(@RequestBody Crop crop) {
        if (crop.getName() == null || crop.getPrice() <= 0 || crop.getQuantity() <= 0) {
            return ResponseEntity.badRequest().body("Invalid crop details!");
        }
        Crop savedCrop = cropRepository.save(crop);
        return ResponseEntity.ok(savedCrop);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCrop(@PathVariable Long id) {
        Optional<Crop> crop = cropRepository.findById(id);
        if (crop.isPresent()) {
            cropRepository.deleteById(id);
            return ResponseEntity.ok("Crop deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Crop not found!");
        }
    }


    @PutMapping("/{id}/updatePrice")
    public ResponseEntity<?> updateCropPrice(@PathVariable Long id, @RequestParam double price) {
        Optional<Crop> cropOpt = cropRepository.findById(id);
        if (cropOpt.isPresent()) {
            Crop crop = cropOpt.get();
            if (price <= 0) {
                return ResponseEntity.badRequest().body("Invalid price value!");
            }
            crop.setPrice(price);
            cropRepository.save(crop);
            return ResponseEntity.ok("Crop price updated successfully.");
        } else {
            return ResponseEntity.status(404).body("Crop not found!");
        }
    }
}
