package com.mercadolibre.demo.domain.exception.technicalexception;

import com.mercadolibre.demo.domain.exception.AppDefinedException;
import org.springframework.http.HttpStatus;

public class TechnicalException extends RuntimeException implements AppDefinedException {
    private final TechnicalErrorCode errorCode;

    public TechnicalException(TechnicalErrorCode errorCode) {
        super(errorCode.message());
        this.errorCode = errorCode;
    }

    @Override
    public String getCode() {
        return errorCode.code();
    }

    @Override
    public String getMessage() {
        return errorCode.message();
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
