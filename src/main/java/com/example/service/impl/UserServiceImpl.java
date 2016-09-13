package com.example.service.impl;

import com.example.dao.UserDao;
import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Created on 08.09.2016.
 */

@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User create(User user) {
        return userDao.save(user);
    }

    @Override
    public Optional<User> getByEmail(String email) {
        return userDao.findUserByEmail(email);
    }

    @Override
    public Optional<User> getByUsername(String username) {
        return userDao.findUserByUsername(username);
    }
}
