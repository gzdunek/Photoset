package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * Created on 21.09.2016.
 */

@Configuration
@ImportResource("classpath:/aws-config.xml")
public class AwsResourceConfig {
}
