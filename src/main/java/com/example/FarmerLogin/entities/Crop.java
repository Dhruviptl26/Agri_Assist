package com.example.FarmerLogin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



@Entity
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    private Long userId;
    private String name;
    private String productType;
    private String variety;
    private String genetics;
    private Double price;
    private Double totalWeight;
    private String region;
    private String imageUrl;
    private String shellType;
    private String almondForm;
    private String peanutForm;
    private String size;
    private String productStatus;
    private String kernalPerKg;
    private Long farmerId;

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }

    public String getGenetics() {
        return genetics;
    }

    public void setGenetics(String genetics) {
        this.genetics = genetics;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(Double totalWeight) {
        this.totalWeight = totalWeight;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getShellType() {
        return shellType;
    }

    public void setShellType(String shellType) {
        this.shellType = shellType;
    }

    public String getAlmondForm() {
        return almondForm;
    }

    public void setAlmondForm(String almondForm) {
        this.almondForm = almondForm;
    }

    public String getPeanutForm() {
        return peanutForm;
    }

    public void setPeanutForm(String peanutForm) {
        this.peanutForm = peanutForm;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(String productStatus) {
        this.productStatus = productStatus;
    }

    public String getKernalPerKg() {
        return kernalPerKg;
    }

    public void setKernalPerKg(String kernalPerKg) {
        this.kernalPerKg = kernalPerKg;
    }
}