package com.example.controller;

import com.example.model.User;
import com.example.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created on 16.09.2016.
 */

@RestController
@RequestMapping("search")
public class SearchController {
    private final UserService userService;

    public SearchController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("user/{term}")
    public List<User> search(@PathVariable String term) {
        return userService.search(term);
    }
}
