package com.mercadolibre.demo.infrastructure.adapter.in.web;

import com.mercadolibre.demo.application.usecase.SearchByQueryUseCase;
import com.mercadolibre.demo.domain.exception.businessexception.BusinessErrorCode;
import com.mercadolibre.demo.domain.exception.businessexception.BusinessException;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.http.MediaType.APPLICATION_JSON;

public class ItemHandler {

    private final SearchByQueryUseCase searchByQueryUseCase;

    public ItemHandler(SearchByQueryUseCase searchByQueryUseCase) {
        this.searchByQueryUseCase = searchByQueryUseCase;
    }

    public Mono<ServerResponse> searchItemByQuery(ServerRequest request) {
        String query = request.queryParam("query").orElse("");
        return searchByQueryUseCase.searchByQuery(query)
                .collectList()
                .flatMap(items -> {
                    if (items.isEmpty()) {
                        return Mono.error(new BusinessException(BusinessErrorCode.ITEM_NOT_FOUND));
                    }
                    return ServerResponse.ok().contentType(APPLICATION_JSON).bodyValue(items);
                });
    }
}
