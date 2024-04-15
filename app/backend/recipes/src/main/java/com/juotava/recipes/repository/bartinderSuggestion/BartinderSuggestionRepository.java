package com.juotava.recipes.repository.bartinderSuggestion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.juotava.recipes.model.BartinderSuggestion;

@Repository
public class BartinderSuggestionRepository {
    private final SpringBartinderSuggestionRepository springBartinderSuggestionRepository;

    @Autowired
    public BartinderSuggestionRepository(SpringBartinderSuggestionRepository springBartinderSuggestionRepository) {
        this.springBartinderSuggestionRepository = springBartinderSuggestionRepository;
    }

    public List<BartinderSuggestion> findByCorrespondingUser(String auth0id) {
        return this.springBartinderSuggestionRepository.findByCorrespondingUser(auth0id);
    }

    public void save(BartinderSuggestion suggestion) {
        this.springBartinderSuggestionRepository.save(suggestion);
    }
}
