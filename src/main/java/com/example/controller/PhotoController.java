package com.example.controller;

import com.example.model.Photo;
import com.example.service.PhotoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created on 09.09.2016.
 */

@RestController
@RequestMapping("photo")
public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping("add")
    public Photo add(@RequestBody Photo photo) {
        return photoService.add(photo);
    }

    @GetMapping("getByNewest")
    public List<Photo> getByNewest() {
        return photoService.getByNewest();
    }
}
