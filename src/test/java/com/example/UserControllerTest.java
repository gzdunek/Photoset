package com.example;

import com.example.model.User;
import com.example.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Created on 08.09.2016.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    @Autowired
    private UserService userService;


    @Test
    public void testCreate() {
        User user = new User();
        user.setUsername("tomek");
        user.setPassword("haslo");

        User createdUser = userService.create(user);

        Assert.assertNotNull(createdUser.getId());
        Assert.assertNotNull(createdUser.getCreationTimestamp());
        Assert.assertEquals(createdUser.getUsername(), "tomek");
        Assert.assertEquals(createdUser.getPassword(), "haslo");

    }
}
