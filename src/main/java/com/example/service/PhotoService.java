package com.example.service;

import com.example.model.Photo;

import java.util.List;

/**
 * Created on 09.09.2016.
 */
public interface PhotoService {
    List<Photo> getByNewest();

    Photo add(Photo photo);
}
