package com.example.service.impl;

import com.example.dao.PhotoCommentDao;
import com.example.model.Photo;
import com.example.model.PhotoComment;
import com.example.service.PhotoCommentService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created on 15.09.2016.
 */

@Service
public class PhotoCommentServiceImpl implements PhotoCommentService {

    private final PhotoCommentDao photoCommentDao;

    public PhotoCommentServiceImpl(PhotoCommentDao photoCommentDao) {
        this.photoCommentDao = photoCommentDao;
    }

    @Override
    public PhotoComment add(PhotoComment photoComment) {
        return photoCommentDao.save(photoComment);
    }

    @Override
    public List<PhotoComment> getByPhoto(Photo photo) {
        return photoCommentDao.findByPhoto(photo);
    }
}
