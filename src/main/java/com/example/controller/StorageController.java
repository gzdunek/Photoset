package com.example.controller;

import com.example.helper.PhotoIdentifierGenerator;
import net.coobird.thumbnailator.Thumbnails;
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

/**
 * Created on 20.09.2016.
 */

@RestController
@RequestMapping("storage")
public class StorageController {

    private final String path = new File("src/main/resources/public/images").getAbsolutePath();

    @PostMapping("upload")
    public String upload(HttpServletResponse response, HttpServletRequest request) {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        Iterator<String> it = multipartRequest.getFileNames();
        MultipartFile multipartFile = multipartRequest.getFile(it.next());

        String extension = multipartFile.getOriginalFilename().split("\\.")[1];

        PhotoIdentifierGenerator generator = new PhotoIdentifierGenerator();

        String fileName = generator.nextPhotoId();
        String fileNameWithExtension = fileName.concat("." + extension);

        try {
            multipartFile.transferTo(new File(path + "\\" + fileNameWithExtension));
            Thumbnails.of(path + "\\" + fileNameWithExtension)
                    .size(1000, 1000)
                    .outputFormat("jpg")
                    .toFile(path + "\\" + fileName + ".jpg");

            if (!fileNameWithExtension.equals("jpg"))
                deleteImage(fileNameWithExtension);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileName + ".jpg";
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
