package com.example.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created on 21.09.2016.
 */
public interface FileStorageService {
    public String saveFileToS3(MultipartFile multipartFile);

    public void deleteFileFromS3(String fileName);
}
