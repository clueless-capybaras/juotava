package com.juotava.recipes.repository.recipeList;

import com.juotava.recipes.model.RecipeList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SpringRecipeListRepository extends JpaRepository<RecipeList, UUID> {
    public List<RecipeList> findByCreatedBy(String auth0id);
}
