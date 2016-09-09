package com.example.dao;

import com.example.model.Photo;
import org.springframework.data.repository.CrudRepository;

/**
 * Created on 09.09.2016.
 */
public interface PhotoDao extends CrudRepository<Photo, Long> {
}
