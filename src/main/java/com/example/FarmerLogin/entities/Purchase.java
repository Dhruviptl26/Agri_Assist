package com.example.FarmerLogin.entities;

import jakarta.persistence.*;

@Entity
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @ManyToOne
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    private int quantity;
    private double totalPrice; // ✅ Store total price of the purchase

    // Constructors
    public Purchase() {}

    public Purchase(Farmer farmer, Crop crop, int quantity, double totalPrice) {
        this.farmer = farmer;
        this.crop = crop;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public Farmer getFarmer() { return farmer; }
    public Crop getCrop() { return crop; }
    public int getQuantity() { return quantity; }
    public double getTotalPrice() { return totalPrice; }

    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
    public void setCrop(Crop crop) { this.crop = crop; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
}
