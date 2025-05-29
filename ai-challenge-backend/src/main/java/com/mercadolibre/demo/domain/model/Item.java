package com.mercadolibre.demo.domain.model;

import java.util.List;

public record Item(
        String id,
        String title,
        String description,
        long price,
        List<String> paymentMethods,
        Seller seller,
        int stock,
        List<String> images
) {
    public record Seller(String name, double rating) {}
}
