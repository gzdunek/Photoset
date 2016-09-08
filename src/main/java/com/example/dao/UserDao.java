package com.example.dao;

import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created on 08.09.2016.
 */
public interface UserDao extends JpaRepository<User, Long> {
}
