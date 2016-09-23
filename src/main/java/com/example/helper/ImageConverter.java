/**
 * Created on 22.09.2016.
 */
package com.example.helper;

import net.coobird.thumbnailator.Thumbnails;

import java.awt.image.BufferedImage;
import java.io.IOException;

public class ImageConverter {

    public BufferedImage resizeAndConvert(BufferedImage image, int width, String format) throws IOException {

        return Thumbnails.of(image)
                .size(width, width)
                .outputFormat(format)
                .outputQuality(0.8)
                .allowOverwrite(true)
                .asBufferedImage();
    }
}
