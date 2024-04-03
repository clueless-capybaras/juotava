package com.juotava.recipes.repository.recipe;

import com.juotava.recipes.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface SpringRecipeRepository extends JpaRepository<Recipe, UUID> {
    public List<Recipe> findByCreatedBy(String auth0id);
    public List<Recipe> findByCreatedByAndDraftTrue(String auth0id);
    public List<Recipe> findByCreatedByAndDraftFalse(String auth0id);

    public List<Recipe> findByDraftFalse();
}
