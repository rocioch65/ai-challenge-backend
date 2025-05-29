package com.mercadolibre.demo.domain.exception;

import org.springframework.http.HttpStatus;

public interface AppDefinedException {
    String getCode();
    String getMessage();
    HttpStatus getHttpStatus();
}
