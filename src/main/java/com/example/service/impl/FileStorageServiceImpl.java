package com.example.service.impl;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.helper.ImageConverter;
import com.example.helper.PhotoIdentifierGenerator;
import com.example.service.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created on 21.09.2016.
 */

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private static final int IMAGE_WIDTH = 1000;
    private static final String IMAGE_EXTENSION = "jpg";
    private static final String S3_BUCKET_NAME = "photoset-images";
    private final AmazonS3Client amazonS3Client;

    public FileStorageServiceImpl(AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    @Override
    public String saveFileToS3(MultipartFile multipartFile) {
        File fileReceived = null;
        File fileToUpload = null;
        ImageConverter converter = new ImageConverter();
        PhotoIdentifierGenerator generator = new PhotoIdentifierGenerator();

        try {
            fileReceived = convertFromMultipartFile(multipartFile);
            fileToUpload = converter.resizeAndConvert(fileReceived, IMAGE_WIDTH, IMAGE_EXTENSION);
        } catch (IOException e) {
            e.printStackTrace();
        }

        String key = generator.nextPhotoId().concat("." + IMAGE_EXTENSION);

        amazonS3Client.putObject(new PutObjectRequest(S3_BUCKET_NAME, key, fileToUpload));
        return key;
    }

    @Override
    public void deleteFileFromS3(String fileName) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(S3_BUCKET_NAME, fileName));
    }


    private File convertFromMultipartFile(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        file.createNewFile();
        FileOutputStream outputStream = new FileOutputStream(file);
        outputStream.write(multipartFile.getBytes());
        outputStream.close();

        return file;
    }


}
