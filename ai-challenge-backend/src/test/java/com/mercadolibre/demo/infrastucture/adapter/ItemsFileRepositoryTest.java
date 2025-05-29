package com.mercadolibre.demo.infrastucture.adapter;

import com.mercadolibre.demo.domain.exception.technicalexception.TechnicalException;
import com.mercadolibre.demo.domain.model.Item;
import com.mercadolibre.demo.infrastructure.adapter.out.file.ItemsFileRepository;
import org.junit.jupiter.api.Test;
import reactor.test.StepVerifier;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

class ItemsFileRepositoryTest {

    @Test
    void shouldReturnEmptyIfItemNotFound() throws IOException {
        ItemsFileRepository repo = new ItemsFileRepository();
        StepVerifier.create(repo.searchByQuery("NO_EXISTE"))
                .expectComplete()
                .verify();
    }

    @Test
    void shouldThrowTechnicalExceptionWhenJsonFailsToLoad() {
        assertThrows(TechnicalException.class, () -> {
            new ItemsFileRepository() {
                public List<Item> loadItems() throws IOException {
                    throw new IOException("Simulated file error");
                }
            };
        });
    }
}
