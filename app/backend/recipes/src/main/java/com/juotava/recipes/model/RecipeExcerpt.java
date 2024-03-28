package com.juotava.recipes.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Getter
public class RecipeExcerpt {
    @Id
    @GeneratedValue
    private UUID uuid;

    private String title;

    private String category;

    private boolean nonAlcoholic;

    private String description;

    @OneToMany
    private List<Ingredient> ingredients;

    @OneToOne
    private Image image;

    public RecipeExcerpt(UUID uuid, String title, String category, boolean nonAlcoholic, String description, List<Ingredient> ingredients, Image image) {
        this.uuid = uuid;
        this.title = title;
        this.category = category;
        this.nonAlcoholic = nonAlcoholic;
        this.description = description;
        this.ingredients = ingredients;
        this.image = image;
    }

    public RecipeExcerpt() {
        this.title = "";
        this.description = "";
        this.ingredients = new ArrayList<>();
    }

    public List<Ingredient> getIngredients() {
        this.ingredients.sort(Comparator.comparingInt(Ingredient::getOrder));
        return ingredients;
    }
}