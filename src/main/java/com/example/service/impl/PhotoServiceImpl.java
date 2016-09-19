package com.example.service.impl;

import com.example.dao.PhotoDao;
import com.example.model.Photo;
import com.example.model.User;
import com.example.service.PhotoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<Photo> getByNewest(Long limit) {
        List<Photo> allPhotos = (List<Photo>) photoDao.findAll();
        return allPhotos
                .stream()
                .sorted((o1, o2) -> o2.getCreationTimestamp().compareTo(o1.getCreationTimestamp()))
                .limit(limit)
                .collect(Collectors.toList());
//        allPhotos.sort((o1, o2) -> o2.getCreationTimestamp().compareTo(o1.getCreationTimestamp()));
//        return allPhotos;
    }

    @Override
    public Photo add(Photo photo) {
        return photoDao.save(photo);
    }

    @Override
    public List<Photo> getByUser(User user) {
        return photoDao.findByUser(user);
    }

    @Override
    public Photo getPhotoById(Long photoId) {
        return photoDao.findOne(photoId);
    }

    @Override
    public List<Photo> getPhotosByIdOfFirst(Long idOfFirst, Long limit) {
        Photo first = photoDao.findOne(idOfFirst);

        List<Photo> all = (List<Photo>) photoDao.findAll();

        return all
                .stream()
                .filter(photo -> photo.getCreationTimestamp().compareTo(first.getCreationTimestamp()) < 0)
                .sorted((o1, o2) -> o2.getCreationTimestamp().compareTo(o1.getCreationTimestamp()))
                .limit(limit)
                .collect(Collectors.toList());
    }
}
