package com.example.controller;

import com.example.model.Photo;
import com.example.model.PhotoComment;
import com.example.service.PhotoCommentService;
import com.example.service.PhotoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created on 15.09.2016.
 */

@RestController
@RequestMapping("comment")
public class PhotoCommentController {
    private final PhotoCommentService photoCommentService;
    private final PhotoService photoService;

    public PhotoCommentController(PhotoCommentService photoCommentService, PhotoService photoService) {
        this.photoCommentService = photoCommentService;
        this.photoService = photoService;
    }

    @PostMapping("add")
    public PhotoComment add(@RequestBody PhotoComment photoComment) {
        return photoCommentService.add(photoComment);
    }

    @GetMapping("getByPhotoId/{photoId}")
    public List<PhotoComment> getByPhotoId(@PathVariable Long photoId) {
        Photo photoById = photoService.getPhotoById(photoId);
        return photoCommentService.getByPhoto(photoById);
    }
}
