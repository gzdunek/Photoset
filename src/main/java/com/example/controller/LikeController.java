package com.example.controller;

import com.example.model.Photo;
import com.example.model.User;
import com.example.service.PhotoService;
import com.example.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created on 15.09.2016.
 */

@RestController
@RequestMapping("like")
public class LikeController {

    private final PhotoService photoService;
    private final UserService userService;

    public LikeController(PhotoService photoService, UserService userService) {
        this.photoService = photoService;
        this.userService = userService;
    }

    /**
     * Method to give or take like to the photo
     *
     * @param photo it is the photo which we give/take like
     * @param user  who gave like
     * @param give  if true we give the like else we take like from the photo
     */
    private void likePhoto(Photo photo, User user, boolean give) {
        List<User> likedByUsers = photo.getLikedByUsers();

        if (give)
            likedByUsers.add(user);
        else
            likedByUsers.remove(user);

        photo.setLikedByUsers(likedByUsers);

        photo.setLikesCount((long) likedByUsers.size());
        photoService.add(photo);
    }

    @PostMapping("give/{photoId}")
    public String give(@PathVariable Long photoId, @RequestBody User user) {
        Photo photoById = photoService.getPhotoById(photoId);
        likePhoto(photoById, user, true);

        return "Like given to " + photoId;
    }

    @PostMapping("take/{photoId}")
    public String take(@PathVariable Long photoId, @RequestBody User user) {
        Photo photoById = photoService.getPhotoById(photoId);
        likePhoto(photoById, user, false);

        return "Like taken from" + photoId;
    }

}
