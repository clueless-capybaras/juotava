package com.juotava.recipes.repository.recipe;

import com.juotava.recipes.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface SpringRecipeRepository extends JpaRepository<Recipe, UUID> {
    public List<Recipe> findByCreatedByAuth0id(String auth0id);
}
