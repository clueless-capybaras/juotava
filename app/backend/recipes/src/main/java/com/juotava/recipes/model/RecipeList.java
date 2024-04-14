package com.juotava.recipes.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
public class RecipeList {

    @Id
    @GeneratedValue
    private UUID uuid;

    @Column(length = 30)
    private String title;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Recipe> recipes;

    private String createdBy;

    public RecipeList(String title, String createdBy) {
        this.title = title;
        this.recipes = new ArrayList<>();
        this.createdBy = createdBy;
    }

    public RecipeList() {
    }

    public void addRecipeToList(Recipe recipe) {
        this.recipes.add(recipe);
    }

    public void setTitle(String newTitle) {
        this.title = newTitle;
    }

    public void removeRecipeFromList(Recipe recipeId) {
        this.recipes.remove(recipeId);
    }
}
