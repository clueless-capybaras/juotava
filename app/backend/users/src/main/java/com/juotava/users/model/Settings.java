package com.juotava.users.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

import java.util.UUID;

@Entity
@Getter
public class Settings {
    @Id
    @GeneratedValue
    private UUID uuid;
    private boolean showUserNameInRecipe;

    public Settings(boolean showUserNameInRecipe) {
        this.showUserNameInRecipe = showUserNameInRecipe;
    }

    public Settings() {
    }
}
