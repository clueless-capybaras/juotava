package com.juotava.recipes.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class RecipeExcerptsList {
    private UUID uuid;
    private String title;
    private List<RecipeExcerpt> excerpts;
    private String createdBy;

    public RecipeExcerptsList(String title, String createdBy) {
        this.title = title;
        this.excerpts = new ArrayList<>();
        this.createdBy = createdBy;
    }

    public RecipeExcerptsList() {
    }

    public void transformToRecipeExcerptList(RecipeList recipeList) {
        this.uuid = recipeList.getUuid();
        this.title = recipeList.getTitle();
        this.createdBy = recipeList.getCreatedBy();
    }

    public void setRecipes(List<RecipeExcerpt> excerpts) {
        this.excerpts = excerpts;
    }
}