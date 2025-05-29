package com.mercadolibre.demo.infrastructure.adapter.in.web;

import com.mercadolibre.demo.domain.exception.businessexception.BusinessErrorCode;
import com.mercadolibre.demo.domain.exception.businessexception.BusinessException;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

public class FallbackHandler {

    public Mono<ServerResponse> handle(ServerRequest request) {
        return Mono.error(new BusinessException(BusinessErrorCode.INVALID_REQUEST));
    }
}
