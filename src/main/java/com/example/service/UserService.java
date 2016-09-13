package com.example.service;

import com.example.model.User;

import java.util.Optional;

/**
 * Created on 08.09.2016.
 */
public interface UserService {
    User create(User user);

    Optional<User> getByEmail(String email);

    Optional<User> getByUsername(String username);
}
