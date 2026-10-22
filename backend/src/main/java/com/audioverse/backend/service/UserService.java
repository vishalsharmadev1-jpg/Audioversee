
package com.audioverse.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.audioverse.backend.entity.User;
import com.audioverse.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException(
                    "Email is already registered");
        }

        return userRepository.save(user);
    }

    public Optional<User> authenticate(
            String email, String password) {

        return userRepository.findByEmail(
                email.trim().toLowerCase())
                .filter(user ->
                        passwordEncoder.matches(
                                password, user.getPassword()));
    }
}
