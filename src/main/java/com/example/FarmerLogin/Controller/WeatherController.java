package com.example.FarmerLogin.Controller;

import com.example.FarmerLogin.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class WeatherController {

        @Autowired
        private WeatherService weatherService;

        @GetMapping("/weather")
        public String getWeather(@RequestParam String city) {
            try {
                return weatherService.getWeather(city);
            } catch (Exception e) {
                return "{\"error\":\"Unable to fetch weather data. Please check the city name.\"}";
            }
        }
    }


