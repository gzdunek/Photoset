package com.example.controller;

import com.example.helper.PhotoIdentifierGenerator;
import com.example.model.Photo;
import com.example.model.User;
import com.example.service.PhotoService;
import com.example.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

/**
 * Created on 09.09.2016.
 */

@RestController
@RequestMapping("photo")
public class PhotoController {

    private final PhotoService photoService;
    private final UserService userService;

    private final String path = new File("src/main/resources/public/images").getAbsolutePath();


    public PhotoController(PhotoService photoService, UserService userService) {
        this.photoService = photoService;
        this.userService = userService;
    }

    @PostMapping("add")
    public Photo add(@RequestBody Photo photo) {
        return photoService.add(photo);
    }

    @PostMapping("upload")
    public String upload(HttpServletResponse response, HttpServletRequest request) {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        Iterator<String> it = multipartRequest.getFileNames();
        MultipartFile multipartFile = multipartRequest.getFile(it.next());


//        String path = new File("src/main/resources/public/images").getAbsolutePath();
        String extension = multipartFile.getOriginalFilename().split("\\.")[1];

        PhotoIdentifierGenerator generator = new PhotoIdentifierGenerator();

        String fileName = generator.nextPhotoId().concat("." + extension);

        try {
            multipartFile.transferTo(new File(path + "\\" + fileName));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return fileName;
    }

    @GetMapping("getByNewest")
    public List<Photo> getByNewest() {
        return photoService.getByNewest();
    }

    @GetMapping("getByUser/{user}")
    public List<Photo> getByUser(@PathVariable String user) {
        Optional<User> userOptional = userService.getByUsername(user);
        return photoService.getByUser(userOptional.orElse(null));
    }

    @DeleteMapping("delete/{fileName:.+}")
    public String deleteImage(@PathVariable String fileName) {
        Path filePath = FileSystems.getDefault().getPath(path + "\\" + fileName);
        try {
            Files.delete(filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "deleted " + fileName;
    }
}
