package com.example.service;

import com.example.model.Photo;
import com.example.model.PhotoComment;

import java.util.List;

/**
 * Created on 15.09.2016.
 */
public interface PhotoCommentService {
    PhotoComment add(PhotoComment photoComment);

    List<PhotoComment> getByPhoto(Photo photo);
}
