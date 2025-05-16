package com.paf.server.configuration;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dgwapjtbp",
                "api_key", "976424464932446",
                "api_secret", "_Wr7ONrD2FVXTFp8P5WlWPXj6h4"
        ));
    }

}

