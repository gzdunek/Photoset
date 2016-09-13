package com.example.dao;

import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created on 08.09.2016.
 */
public interface UserDao extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByUsername(String username);
}
