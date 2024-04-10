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
        List<RecipeList> recipeLists = this.springRecipeListRepository.findByCreatedBy(auth0id);
        recipeLists.sort((l1, l2) ->
            l1.getTitle().equals("Favoriten")?-1:
                    l2.getTitle().equals("Favoriten")?1:
                            0
        );
        return recipeLists;
    }

    public void save(RecipeList recipeList){
        this.springRecipeListRepository.save(recipeList);
    }

    public RecipeList getFavoritesList(String auth0id){
        return this.springRecipeListRepository.findByCreatedByAndTitle(auth0id, "Favoriten");
    }

    public List<RecipeList> findByRecipeId(UUID recipeId){
        return this.springRecipeListRepository.findByRecipeId(recipeId);
    }
}
