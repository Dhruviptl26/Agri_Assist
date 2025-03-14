package com.example.FarmerLogin.services;

import com.example.FarmerLogin.Repository.UserRepository;
import com.example.FarmerLogin.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}