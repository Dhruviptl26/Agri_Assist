package com.example.FarmerLogin.services;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private static final String API_URL = "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric";

    public String getWeather(String city) {
        String url = API_URL;
        RestTemplate restTemplate = new RestTemplate();
        String weatherResponse = restTemplate.getForObject(url, String.class, city, apiKey);
        return weatherResponse;
    }
}
