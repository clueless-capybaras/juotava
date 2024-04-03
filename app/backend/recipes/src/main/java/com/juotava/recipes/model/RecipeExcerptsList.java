package com.juotava.recipes.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class RecipeExcerptsList {
    private UUID uuid;
    private String title;
    private List<RecipeExcerpt> excerpts;
    private String createdBy;

    public RecipeExcerptsList(RecipeList recipeList, List<RecipeExcerpt> excerpts) {
        this.uuid = recipeList.getUuid();
        this.title = recipeList.getTitle();
        this.excerpts = excerpts;
        this.createdBy = recipeList.getCreatedBy();
    }

    public RecipeExcerptsList() {
    }
}