package com.mercadolibre.demo.domain.exception.businessexception;

import com.mercadolibre.demo.domain.exception.AppDefinedException;
import com.mercadolibre.demo.domain.exception.businessexception.BusinessErrorCode;
import org.springframework.http.HttpStatus;

public class BusinessException extends RuntimeException implements AppDefinedException {
    private final BusinessErrorCode errorCode;

    public BusinessException(BusinessErrorCode errorCode) {
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
        return HttpStatus.BAD_REQUEST;
    }
}
