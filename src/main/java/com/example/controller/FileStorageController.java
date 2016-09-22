package com.example.controller;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.example.service.FileStorageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Iterator;

/**
 * Created on 20.09.2016.
 */

@RestController
@RequestMapping("storage")
public class FileStorageController {

//    private final String path = new File("src/main/resources/public/images").getAbsolutePath();

    private final FileStorageService storageService;


    public FileStorageController(FileStorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("upload")
    public String upload(HttpServletResponse response, HttpServletRequest request) {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        Iterator<String> it = multipartRequest.getFileNames();
        MultipartFile multipartFile = multipartRequest.getFile(it.next());

        return storageService.saveFileToS3(multipartFile);
    }


    @DeleteMapping("delete/{fileName:.+}")
    public String deleteImage(@PathVariable String fileName) {
        storageService.deleteFileFromS3(fileName);

        return "deleted " + fileName;
    }
}
