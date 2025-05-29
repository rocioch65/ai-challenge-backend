package com.mercadolibre.demo.domain.exception.technicalexception;

public enum TechnicalErrorCode {
    FILE_LOAD_ERROR("FILE_LOAD_ERROR", "Error al cargar el archivo"),
    INTERNAL_ERROR("INTERNAL_ERROR", "Error interno inesperado");

    private final String code;
    private final String message;

    TechnicalErrorCode(String code, String message) {
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
