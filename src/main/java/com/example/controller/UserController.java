package com.example.controller;

import com.example.model.User;
import com.example.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import java.util.Date;
import java.util.Map;

/**
 * Created on 08.09.2016.
 */

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("getByEmail/{email}")
    public User getByEmail(@PathVariable String email) {
        return userService.getByEmail(email).orElse(null);
    }

    @PostMapping("getByUsername")
    public User getByUsername(@RequestBody String username) {
        return userService.getByUsername(username).orElse(null);
    }

    @PostMapping("isEmailExisting")
    public boolean isEmailExisting(@RequestBody String email) {
        return userService.getByEmail(email).isPresent();
    }

    @PostMapping("isUsernameExisting")
    public boolean isUsernameExisting(@RequestBody String username) {
        return userService.getByUsername(username).isPresent();
    }

    @PostMapping("register")
    public User register(@RequestBody User user) {
        return userService.create(user);
    }

    @PostMapping("login")
    public String login(@RequestBody Map<String, String> json) throws ServletException {
        String username = json.get("username");
        String password = json.get("password");

        if (username == null || password == null)
            throw new ServletException("Please fill in username and password fields");

        User user;

        if (userService.getByUsername(username).isPresent())
            user = userService.getByUsername(username).get();
//        else if(userService.getByEmail(username).isPresent())
//            user = userService.getByEmail(username).get();
        else
            throw new ServletException("User not exists");

        String pwd = user.getPassword();

        if (!pwd.equals(password))
            throw new ServletException("Invalid password");

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "mykey")
                .compact();
    }

}
