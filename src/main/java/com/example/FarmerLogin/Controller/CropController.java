package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.Repository.CropRepository;
import com.example.FarmerLogin.entities.Crop;
import com.example.FarmerLogin.entities.Farmer;
import com.example.FarmerLogin.services.CropService;
import com.example.FarmerLogin.services.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/crops")
public class CropController {
    @Autowired
    private CropService cropService;
    @Autowired
    private CropRepository cropRepository;
    @Autowired
    private FarmerService farmerService;
    @Value("${image.upload.dir}")
    private String uploadDir;

    // ✅ Fetch crops filtered by farmerId
    // In your Spring Boot API
    @GetMapping("/farmers")
    public ResponseEntity<List<Farmer>> getAllFarmers() {
        List<Farmer> farmers = farmerService.getAllFarmers();
        return ResponseEntity.ok(farmers);
    }

    @GetMapping
    public ResponseEntity<List<Crop>> getAllCrops(@RequestParam(required = false) String name) {
        List<Crop> crops = cropRepository.findAll();
        return ResponseEntity.ok(crops);
    }

    // ✅ Fetch a single crop by ID
    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Crop>> getCropsByFarmerId(@PathVariable Long farmerId) {
        List<Crop> crops = cropRepository.findByFarmerId(farmerId);
        return ResponseEntity.ok(crops);
    }


    // ✅ Save a new crop with optional image
    @PostMapping
    public ResponseEntity<Crop> createCrop(
            @RequestParam("name") String name,
            @RequestParam("productType") String productType,
            @RequestParam("variety") String variety,
            @RequestParam("genetics") String genetics,
            @RequestParam("price") Double price,
            @RequestParam("totalWeight") Double totalWeight,
            @RequestParam("region") String region,
            @RequestParam("shellType") String shellType,
            @RequestParam("almondForm") String almondForm,
            @RequestParam("peanutForm") String peanutForm,
            @RequestParam("size") String size,
            @RequestParam("productStatus") String productStatus,
            @RequestParam("kernalPerKg") String kernalPerKg,
            @RequestParam("farmerId") Long farmerId,  // ✅ Ensure crop is linked to a farmer
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        String imageUrl = (image != null) ? saveImage(image) : null;

        Crop crop = new Crop();
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
        crop.setFarmerId(farmerId);  // ✅ Ensure crop belongs to a farmer
        crop.setImageUrl(imageUrl);

        return ResponseEntity.ok(cropService.saveCrop(crop));
    }

    // ✅ Update an existing crop with optional image
    @PutMapping("/{id}")
    public ResponseEntity<Crop> updateCrop(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("productType") String productType,
            @RequestParam("variety") String variety,
            @RequestParam("genetics") String genetics,
            @RequestParam("price") Double price,
            @RequestParam("totalWeight") Double totalWeight,
            @RequestParam("region") String region,
            @RequestParam("shellType") String shellType,
            @RequestParam("almondForm") String almondForm,
            @RequestParam("peanutForm") String peanutForm,
            @RequestParam("size") String size,
            @RequestParam("productStatus") String productStatus,
            @RequestParam("kernalPerKg") String kernalPerKg,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        Crop crop = cropService.getCropById(id);
        if (crop == null) {
            return ResponseEntity.notFound().build();
        }

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

        if (image != null) {
            String imageUrl = saveImage(image);
            crop.setImageUrl(imageUrl);
        }

        return ResponseEntity.ok(cropService.saveCrop(crop));
    }

    // ✅ Delete a crop
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable Long id) {
        cropService.deleteCrop(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Buy a crop
    @PostMapping("/buy")
    public ResponseEntity<Crop> buyCrop(@RequestParam Long id, @RequestParam Double weight) {
        return ResponseEntity.ok(cropService.buyCrop(id, weight));
    }

    // ✅ Save an image
    private String saveImage(MultipartFile image) throws IOException {
        if (image.isEmpty()) {
            return null;
        }
        Path path = Paths.get(uploadDir, image.getOriginalFilename());
        Files.write(path, image.getBytes());
        return "/api/crops/images/" + image.getOriginalFilename();
    }

    // ✅ Serve an image
    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path file = Paths.get(uploadDir).resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                String contentType = Files.probeContentType(file);
                contentType = (contentType != null) ? contentType : "application/octet-stream";
                return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            throw new RuntimeException("Error retrieving image: " + e.getMessage());
        }
    }
}
