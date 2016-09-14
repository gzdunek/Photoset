package com.example.service;

import com.example.model.Photo;
import com.example.model.User;

import java.util.List;

/**
 * Created on 09.09.2016.
 */
public interface PhotoService {
    List<Photo> getByNewest();

    Photo add(Photo photo);

    List<Photo> getByUser(User user);
}
