package com.example.FarmerLogin.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity // Entity class to connect to the database
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Ensures auto-increment behavior
    private Long id;

    private String phoneNumber;
    private String password;
    private double balance = 0.0; // 🆕 Added balance field

    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL) // Relationship with purchases
    private List<Purchase> purchases;

    // ✅ Constructors
    public Farmer() {}

    public Farmer(String phoneNumber, String password, double balance) {
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.balance = balance;
    }

    // ✅ Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }

    public List<Purchase> getPurchases() { return purchases; }
    public void setPurchases(List<Purchase> purchases) { this.purchases = purchases; }

    // ✅ Purchase-related methods
    public void addBalance(double amount) {
        if (amount > 0) {
            this.balance += amount;
        } else {
            throw new IllegalArgumentException("Amount must be greater than zero.");
        }
    }

    public boolean deductBalance(double amount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            return true;
        }
        return false; // Insufficient funds
    }

    public boolean purchaseCrop(Crop crop, int quantity) {
        double totalPrice = crop.getPrice() * quantity;

        if (crop.getQuantity() < quantity) {
            throw new IllegalArgumentException("Not enough crop quantity available.");
        }

        if (deductBalance(totalPrice)) {
            crop.setQuantity(crop.getQuantity() - quantity);
            return true;
        }
        return false;
    }
}
