package com.mercadolibre.demo.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mercadolibre.demo.domain.exception.GlobalErrorHandler;
import com.mercadolibre.demo.infrastructure.adapter.in.web.FallbackHandler;
import com.mercadolibre.demo.infrastructure.adapter.in.web.ItemHandler;
import com.mercadolibre.demo.infrastructure.adapter.out.file.ItemsFileRepository;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.boot.web.reactive.error.ErrorAttributes;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;

import java.io.IOException;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.queryParam;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class RouterConfig {

    @Bean
    public RouterFunction<?> itemRoutes() throws IOException {
        var repo = new ItemsFileRepository();
        var handler = new ItemHandler(repo);
        var fallbackHandler = new FallbackHandler();

        return route(GET("/api/items")
                .and(queryParam("query", value -> !value.isBlank())), handler::searchItemByQuery)
                .andRoute(RequestPredicates.all(), fallbackHandler::handle);
    }

    @Bean
    public GlobalErrorHandler globalErrorHandler(ErrorAttributes errorAttributes,
                                                 WebProperties webProperties,
                                                 ApplicationContext context,
                                                 ObjectMapper objectMapper) {
        return new GlobalErrorHandler(errorAttributes, webProperties.getResources(), context, objectMapper);
    }
}