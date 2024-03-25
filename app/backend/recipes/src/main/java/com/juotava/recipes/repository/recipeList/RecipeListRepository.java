package com.juotava.recipes.repository.recipeList;

import com.juotava.recipes.model.RecipeList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class RecipeListRepository {

    private final SpringRecipeListRepository springRecipeListRepository;

    @Autowired
    public RecipeListRepository(SpringRecipeListRepository springRecipeListRepository) {
        this.springRecipeListRepository = springRecipeListRepository;
    }

    public RecipeList findByUuid(UUID uuid){
        return this.springRecipeListRepository.findById(uuid).get();
    }

    public List<RecipeList> findByCreatedByAuth0id(String auth0id){
        return this.springRecipeListRepository.findByCreatedBy(auth0id);
    }

    public void save(RecipeList recipeList){
        this.springRecipeListRepository.save(recipeList);
    }

    public RecipeList getFavoritesList(String auth0id){
        return this.springRecipeListRepository.findByCreatedByAndTitle(auth0id, "Favoriten");
    }
}
