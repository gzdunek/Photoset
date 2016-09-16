package com.example.dao;

import com.example.model.Photo;
import com.example.model.PhotoComment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created on 15.09.2016.
 */
public interface PhotoCommentDao extends CrudRepository<PhotoComment, Long> {
    List<PhotoComment> findByPhoto(Photo photo);
}
