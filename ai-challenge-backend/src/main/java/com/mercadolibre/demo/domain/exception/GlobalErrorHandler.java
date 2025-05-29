package com.mercadolibre.demo.domain.exception;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.boot.autoconfigure.web.reactive.error.AbstractErrorWebExceptionHandler;
import org.springframework.boot.web.reactive.error.ErrorAttributes;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.web.reactive.function.server.*;
import reactor.core.publisher.Mono;

@Slf4j
public class GlobalErrorHandler extends AbstractErrorWebExceptionHandler {

    public GlobalErrorHandler(ErrorAttributes errorAttributes,
                              WebProperties.Resources resources,
                              ApplicationContext applicationContext,
                              ObjectMapper objectMapper) {
        super(errorAttributes, resources, applicationContext);
        setMessageReaders(ServerCodecConfigurer.create().getReaders());
        setMessageWriters(ServerCodecConfigurer.create().getWriters());
    }

    Mono<ServerResponse> formatErrorResponse(ServerRequest request) {
        Throwable error = getError(request);
        log.error("Exception captured: {}", error.getMessage(), error);

        ErrorResponse response;
        HttpStatus status;

        if (error instanceof AppDefinedException ex) {
            log.warn("Handled error: {} - {}", ex.getCode(), ex.getMessage());
            response = new ErrorResponse(ex.getCode(), ex.getMessage());
            status = ex.getHttpStatus();
        } else {
            response = new ErrorResponse("UNEXPECTED_ERROR", "Ocurrió un error inesperado");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return ServerResponse.status(status)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(response);
    }

    @Override
    public RouterFunction<ServerResponse> getRoutingFunction(ErrorAttributes errorAttributes) {
        return RouterFunctions.route(RequestPredicates.all(), this::formatErrorResponse);
    }

    public record ErrorResponse(String code, String message) {}
}
