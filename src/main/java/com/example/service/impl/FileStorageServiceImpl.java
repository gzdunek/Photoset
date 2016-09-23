package com.example.service.impl;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.helper.ImageConverter;
import com.example.helper.PhotoIdentifierGenerator;
import com.example.service.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;

/**
 * Created on 21.09.2016.
 */

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private static final int IMAGE_WIDTH = 1000;
    private static final String IMAGE_EXTENSION = "jpg";
    private static final String S3_BUCKET_NAME = "photoset-image";
    private final AmazonS3Client amazonS3Client;

    public FileStorageServiceImpl(AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    @Override
    public String saveFileToS3(MultipartFile multipartFile) {
        ImageConverter converter = new ImageConverter();
        PhotoIdentifierGenerator generator = new PhotoIdentifierGenerator();

        File fileToUpload = new File(multipartFile.getOriginalFilename() + "." + IMAGE_EXTENSION);

        try {
            BufferedImage imageReceived = convertFromMultipartFile(multipartFile);
            BufferedImage convertedImage = converter.resizeAndConvert(imageReceived, IMAGE_WIDTH, IMAGE_EXTENSION);
            ImageIO.write(convertedImage, IMAGE_EXTENSION, fileToUpload);
        } catch (IOException e) {
            e.printStackTrace();
        }

        String key = generator.nextPhotoId().concat("." + IMAGE_EXTENSION);

        amazonS3Client.setEndpoint("s3-eu-west-1.amazonaws.com");
        amazonS3Client.putObject(new PutObjectRequest(S3_BUCKET_NAME, key, fileToUpload));
        deleteTempFile(fileToUpload);
        return key;
    }

    @Override
    public void deleteFileFromS3(String fileName) {
        amazonS3Client.setEndpoint("s3-eu-west-1.amazonaws.com");
        amazonS3Client.deleteObject(new DeleteObjectRequest(S3_BUCKET_NAME, fileName));
    }


    private BufferedImage convertFromMultipartFile(MultipartFile multipartFile) throws IOException {
//        File file = new File(multipartFile.getOriginalFilename());
//        file.createNewFile();
//        FileOutputStream outputStream = new FileOutputStream(file);
//        outputStream.write(multipartFile.getBytes());
//        outputStream.close();


        return ImageIO.read(multipartFile.getInputStream());
    }

    private void deleteTempFile(File file) {
        try {
            Files.delete(FileSystems.getDefault().getPath(file.getName()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
