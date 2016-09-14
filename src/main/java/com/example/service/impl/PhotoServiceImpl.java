package com.example.service.impl;

import com.example.dao.PhotoDao;
import com.example.model.Photo;
import com.example.model.User;
import com.example.service.PhotoService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created on 09.09.2016.
 */

@Service
public class PhotoServiceImpl implements PhotoService {

    private final PhotoDao photoDao;

    public PhotoServiceImpl(PhotoDao photoDao) {
        this.photoDao = photoDao;
    }

    @Override
    public List<Photo> getByNewest() {
        List<Photo> allPhotos = (List<Photo>) photoDao.findAll();
        allPhotos.sort((o1, o2) -> o2.getCreationTimestamp().compareTo(o1.getCreationTimestamp()));
        return allPhotos;
    }

    @Override
    public Photo add(Photo photo) {
        return photoDao.save(photo);
    }

    @Override
    public List<Photo> getByUser(User user) {
        return photoDao.findByUser(user);
    }
}
