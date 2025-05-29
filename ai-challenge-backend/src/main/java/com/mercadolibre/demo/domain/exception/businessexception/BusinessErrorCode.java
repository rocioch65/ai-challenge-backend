package com.mercadolibre.demo.domain.exception.businessexception;

public enum BusinessErrorCode {
    ITEM_NOT_FOUND("ITEM_NOT_FOUND", "El ítem no fue encontrado"),
    INVALID_REQUEST("INVALID_REQUEST", "La solicitud no es válida");

    private final String code;
    private final String message;

    BusinessErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String code() {
        return code;
    }

    public String message() {
        return message;
    }
}
