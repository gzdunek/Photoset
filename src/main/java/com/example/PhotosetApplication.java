package com.example;

import com.example.config.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PhotosetApplication {

    @Bean
    public FilterRegistrationBean jwtFilter() {
        final FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new JwtFilter());
        registration.addUrlPatterns("/photo/add/");
        registration.addUrlPatterns("/photo/upload/");
        return registration;
    }

    public static void main(String[] args) {
        SpringApplication.run(PhotosetApplication.class, args);
    }
}
