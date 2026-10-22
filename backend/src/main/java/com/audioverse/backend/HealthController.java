package com.audioverse.backend;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of(
            "app", "AudioVerse",
            "status", "UP",
            "message", "AudioVerse backend is running"
        );
    }
}
