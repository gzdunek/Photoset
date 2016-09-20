package com.example.controller;

import com.example.model.Photo;
import com.example.model.User;
import com.example.service.PhotoService;
import com.example.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Created on 09.09.2016.
 */

@RestController
@RequestMapping("photo")
public class PhotoController {

    private final PhotoService photoService;
    private final UserService userService;


    public PhotoController(PhotoService photoService, UserService userService) {
        this.photoService = photoService;
        this.userService = userService;
    }

    @PostMapping("add")
    public Photo add(@RequestBody Photo photo) {
        return photoService.add(photo);
    }


    @GetMapping("getByNewest")
    public List<Photo> getByNewest(@RequestParam Long limit) {
        return photoService.getByNewest(limit);
    }

    @GetMapping("getPhotosByIdOfFirst")
    public List<Photo> getPhotosByIdOfFirst(@RequestParam Long idOfFirst, @RequestParam Long limit) {
        return photoService.getPhotosByIdOfFirst(idOfFirst, limit);
    }

    @GetMapping("getByUser/{user}")
    public List<Photo> getByUser(@PathVariable String user) {
        Optional<User> userOptional = userService.getByUsername(user);
        return photoService.getByUser(userOptional.orElse(null));
    }

}
