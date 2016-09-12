package com.example.helper;

import java.math.BigInteger;
import java.security.SecureRandom;

/**
 * Created on 10.09.2016.
 */
public final class PhotoIdentifierGenerator {
    private SecureRandom random = new SecureRandom();

    public String nextPhotoId() {
//        TODO generowane są też niezdozwolone znaki
        return new BigInteger(24, random).toString(32);
    }
}
