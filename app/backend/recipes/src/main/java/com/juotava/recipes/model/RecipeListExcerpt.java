package com.juotava.recipes.model;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
public class RecipeListExcerpt {
    private UUID uuid;
    private String title;
    private List<Image> thumbnails;
    private String createdBy;

    public RecipeListExcerpt(RecipeList recipeList){
        this.uuid = recipeList.getUuid();
        this.title = recipeList.getTitle();
        this.setThumbnails(recipeList);
        this.createdBy = recipeList.getCreatedBy();
    }

    private void setThumbnails(RecipeList recipeList) {
        List<Recipe> recipes = recipeList.getRecipes();
        List<Image> images = new ArrayList<>(3);
        for (int i = 0; i < 3; i++) {
            try {
                images.add(recipes.get(i).getImage());
            } catch (Exception e){
                images.add(new Image());
            }
        }
        this.thumbnails = images;
    }
}
