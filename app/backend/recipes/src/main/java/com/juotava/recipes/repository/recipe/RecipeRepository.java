package com.juotava.recipes.repository.recipe;

import com.juotava.recipes.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class RecipeRepository {
    private final SpringRecipeRepository springRecipeRepository;
    @Autowired
    public RecipeRepository(SpringRecipeRepository springRecipeRepository) {
        this.springRecipeRepository = springRecipeRepository;
    }

    public Recipe findByUuid(UUID uuid){
        return this.springRecipeRepository.findById(uuid).get();
    }

    public List<Recipe> findByCreatedByAuth0id(String auth0id){
        return this.springRecipeRepository.findByCreatedByAuth0id(auth0id);
    }

    public List<Recipe> findDraftedByCreatedByAuth0id(String auth0id){
        return this.springRecipeRepository.findByCreatedByAuth0idAndDraftTrue(auth0id);
    }

    public List<Recipe> findPublishedByCreatedByAuth0id(String auth0id){
        return this.springRecipeRepository.findByCreatedByAuth0idAndDraftTrue(auth0id);
    }

    public List<Recipe> findAllPublished(){
        return this.springRecipeRepository.findByDraftFalse();
    }

    public void save(Recipe recipe){
        this.springRecipeRepository.save(recipe);
    }
}
