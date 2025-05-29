package com.mercadolibre.demo.infrastucture.adapter;

import com.mercadolibre.demo.application.usecase.SearchByQueryUseCase;
import com.mercadolibre.demo.domain.exception.businessexception.BusinessErrorCode;
import com.mercadolibre.demo.domain.exception.businessexception.BusinessException;
import com.mercadolibre.demo.infrastructure.adapter.in.web.ItemHandler;
import com.mercadolibre.demo.domain.model.Item;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.reactive.function.server.MockServerRequest;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.server.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class ItemHandlerTest {

    private SearchByQueryUseCase searchByQueryUseCase;
    private ItemHandler itemHandler;

    @BeforeEach
    void setUp() {
        searchByQueryUseCase = mock(SearchByQueryUseCase.class);
        itemHandler = new ItemHandler(searchByQueryUseCase);
    }

    @Test
    void shouldReturnItemWhenFound() {
        String query = "title";
        Item item = new Item(query, "Title", "Description", 1000L,
                List.of("PSE"), new Item.Seller("Seller", 4.5), 10,
                List.of("url1", "url2"));

        when(searchByQueryUseCase.searchByQuery(query)).thenReturn(Flux.just(item));

        ServerRequest request = MockServerRequest.builder()
                .queryParam("query", query)
                .build();

        Mono<ServerResponse> response = itemHandler.searchItemByQuery(request);

        StepVerifier.create(response)
                .expectNextMatches(serverResponse ->
                        serverResponse.statusCode().is2xxSuccessful())
                .verifyComplete();
    }

    @Test
    void shouldReturnInternalErrorWhenRepositoryFails() {
        String itemId = "error_case";
        when(searchByQueryUseCase.searchByQuery(itemId))
                .thenReturn(Flux.error(new RuntimeException("Unexpected error")));

        ServerRequest request = MockServerRequest.builder()
                .queryParam("query", itemId)
                .build();

        Mono<ServerResponse> response = itemHandler.searchItemByQuery(request);

        StepVerifier.create(response)
                .expectErrorMatches(error ->
                        error instanceof RuntimeException &&
                                error.getMessage().equals("Unexpected error"))
                .verify();
    }

    @Test
    void shouldRouteToHandlerWhenQueryIsPresent() {
        String query = "laptop";
        Item item = new Item(query, "Laptop", "Powerful laptop", 1500L,
                List.of("PSE"), new Item.Seller("Seller", 4.8), 5,
                List.of("image1"));

        when(searchByQueryUseCase.searchByQuery(query)).thenReturn(Flux.just(item));

        RouterFunction<ServerResponse> router = RouterFunctions.route()
                .GET("/items", RequestPredicates.queryParam("query", value -> !value.isBlank()), itemHandler::searchItemByQuery)
                .build();

        WebTestClient client = WebTestClient.bindToRouterFunction(router).build();

        client.get()
                .uri("/items?query=" + query)
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$[0].title").isEqualTo("Laptop");
    }
    @Test
    void shouldReturnErrorWhenNoItemsFound() {
        String query = "nonexistent-item";

        when(searchByQueryUseCase.searchByQuery(query)).thenReturn(Flux.empty());

        ServerRequest request = MockServerRequest.builder()
                .queryParam("query", query)
                .build();

        Mono<ServerResponse> response = itemHandler.searchItemByQuery(request);

        StepVerifier.create(response)
                .expectErrorSatisfies(error -> {
                    assertTrue(error instanceof BusinessException);
                    BusinessException businessException = (BusinessException) error;
                    assertEquals(BusinessErrorCode.ITEM_NOT_FOUND.code(), businessException.getCode());
                })
                .verify();
    }
}

