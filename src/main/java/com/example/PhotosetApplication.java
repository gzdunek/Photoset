package com.example;

import com.example.config.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PhotosetApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(PhotosetApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean jwtFilter() {
        final FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new JwtFilter());
        registration.addUrlPatterns("/photo/add");
        registration.addUrlPatterns("/like/*");
        registration.addUrlPatterns("/comment/add");
        return registration;
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(PhotosetApplication.class);
    }
}
