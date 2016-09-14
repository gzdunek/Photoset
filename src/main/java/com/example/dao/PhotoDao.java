package com.example.dao;

import com.example.model.Photo;
import com.example.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created on 09.09.2016.
 */
public interface PhotoDao extends CrudRepository<Photo, Long> {
    List<Photo> findByUser(User user);
}
