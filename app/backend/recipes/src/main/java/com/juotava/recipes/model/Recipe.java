package com.juotava.recipes.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
public class Recipe {
    @Id
    @GeneratedValue
    private UUID uuid;

    private String title;

    private String text;

    @OneToMany
    private List<Ingredient> ingredients;

    public Recipe(String title, String text) {
        this.title = title;
        this.text = text;
        this.ingredients = new ArrayList<>();
    }

    public Recipe() {
        this.title = "";
        this.text = "";
        this.ingredients = new ArrayList<>();
    }

    public void addIngredient(Ingredient ingredient){
        this.ingredients.add(ingredient);
    }
}
