package com.mercadolibre.demo.config;

import com.mercadolibre.demo.domain.exception.businessexception.BusinessErrorCode;
import com.mercadolibre.demo.domain.exception.businessexception.BusinessException;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;


@SpringBootTest(classes = GlobalErrorHandlerTest.TestConfig.class)
@AutoConfigureWebTestClient
class GlobalErrorHandlerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    void shouldReturnBadRequestWhenBusinessExceptionIsThrown() {
        webTestClient.get().uri("/test/business-error")
                .exchange()
                .expectStatus().is4xxClientError()
                .expectBody()
                .jsonPath("$.code").isEqualTo("INVALID_REQUEST")
                .jsonPath("$.message").isEqualTo("La solicitud no es válida");
    }

    @Test
    void shouldReturnInternalServerErrorWhenInvalidRequestExceptionIsThrown() {
        webTestClient.post().uri("/test/unexpected-error")
                .exchange()
                .expectStatus().is4xxClientError()
                .expectBody()
                .jsonPath("$.code").isEqualTo("INVALID_REQUEST")
                .jsonPath("$.message").isEqualTo( "La solicitud no es válida");
    }

    @TestConfiguration
    static class TestConfig {
        @Bean
        public WebProperties.Resources resources() {
            return new WebProperties.Resources();
        }
        @Bean
        public RouterFunction<ServerResponse> testRoutes() {
            return RouterFunctions.route(GET("/test/business-error"),
                            req -> Mono.error(new BusinessException(BusinessErrorCode.ITEM_NOT_FOUND)))
                    .andRoute(POST("/test/unexpected-error"),
                            req -> Mono.error(new BusinessException(BusinessErrorCode.INVALID_REQUEST)));
        }

    }
}
