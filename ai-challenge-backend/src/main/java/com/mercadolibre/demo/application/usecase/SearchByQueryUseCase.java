package com.mercadolibre.demo.application.usecase;

import com.mercadolibre.demo.domain.model.Item;
import reactor.core.publisher.Flux;

public interface SearchByQueryUseCase {
    Flux<Item> searchByQuery(String query);
}
