package com.juotava.recipes.repository.bartinderSuggestion;

import com.juotava.recipes.model.BartinderSuggestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SpringBartinderSuggestionRepository extends JpaRepository<BartinderSuggestion, UUID> {
    public List<BartinderSuggestion> findByCorrespondingUser(String auth0id);
}
