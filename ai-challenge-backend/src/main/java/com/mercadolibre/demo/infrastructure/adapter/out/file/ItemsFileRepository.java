package com.mercadolibre.demo.infrastructure.adapter.out.file;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mercadolibre.demo.application.usecase.SearchByQueryUseCase;
import com.mercadolibre.demo.domain.exception.technicalexception.TechnicalErrorCode;
import com.mercadolibre.demo.domain.exception.technicalexception.TechnicalException;
import com.mercadolibre.demo.domain.model.Item;
import org.springframework.core.io.ClassPathResource;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public class ItemsFileRepository implements SearchByQueryUseCase {

    private final List<Item> items;

    public ItemsFileRepository() {
        try {
            this.items = loadItems();
        } catch (IOException e) {
            throw new TechnicalException(TechnicalErrorCode.FILE_LOAD_ERROR);
        }
    }

    protected List<Item> loadItems() throws IOException {
        var file = new ClassPathResource("items.json").getInputStream();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(file, new TypeReference<>() {});
    }

    @Override
    public Flux<Item> searchByQuery(String query) {
        String lowerCaseQuery = query.toLowerCase();
        return Flux.fromStream(
                items.stream()
                        .filter(item ->
                                Optional.ofNullable(item.title()).orElse("").toLowerCase()
                                        .contains(lowerCaseQuery) ||
                                Optional.ofNullable(item.description()).orElse("").toLowerCase()
                                        .contains(lowerCaseQuery) ||
                                Optional.ofNullable(item.seller().name()).orElse("").toLowerCase()
                                        .contains(lowerCaseQuery))
        );
    }
}