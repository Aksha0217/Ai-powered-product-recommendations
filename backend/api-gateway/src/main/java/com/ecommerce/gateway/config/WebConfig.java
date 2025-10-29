package com.ecommerce.gateway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.reactive.config.ResourceHandlerRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.resource.PathResourceResolver;
import reactor.core.publisher.Mono;

@Configuration
public class WebConfig implements WebFluxConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve React build as static resources
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Mono<Resource> getResource(String resourcePath, Resource location) {
                        try {
                            Resource requestedResource = location.createRelative(resourcePath);

                            // If the requested resource exists, return it
                            if (requestedResource.exists() && requestedResource.isReadable()) {
                                return Mono.just(requestedResource);
                            }

                            // Otherwise, serve index.html for client-side routing
                            Resource indexResource = new ClassPathResource("/static/index.html");
                            if (indexResource.exists() && indexResource.isReadable()) {
                                return Mono.just(indexResource);
                            }
                        } catch (Exception e) {
                            // Log error if needed
                        }

                        return Mono.empty();
                    }
                });
    }
}
