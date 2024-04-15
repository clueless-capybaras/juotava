package com.juotava.recipes.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
public class BartinderSuggestion {
    @Id
    @GeneratedValue
    private UUID uuid;
    @Setter
    private String correspondingUser;
    private UUID recipeUuid;
    private boolean liked;

    public BartinderSuggestion(String correspondingUser, UUID recipeUuid) {
        this.correspondingUser = correspondingUser;
        this.recipeUuid = recipeUuid;
        this.liked = false;
    }

    public BartinderSuggestion() {
    }

}
