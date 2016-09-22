/**
 * Created on 22.09.2016.
 */
package com.example.helper;

import net.coobird.thumbnailator.Thumbnails;

import java.io.File;
import java.io.IOException;

public class ImageConverter {

    public File resizeAndConvert(File file, int width, String format) throws IOException {
        File output;
        Thumbnails.of(file)
                .size(width, width)
                .outputFormat(format)
                .outputQuality(0.8)
                .toFile(output = new File(file.getName()));
        return output;
    }
}
