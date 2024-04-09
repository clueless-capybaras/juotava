package com.juotava.recipes.repository.recipeList;

import com.juotava.recipes.model.RecipeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface SpringRecipeListRepository extends JpaRepository<RecipeList, UUID> {
    public List<RecipeList> findByCreatedBy(String auth0id);
    public RecipeList findByCreatedByAndTitle(String auth0id, String title);

    @Query("SELECT rl FROM RecipeList rl JOIN rl.recipes r WHERE r.uuid = :recipeId")
    List<RecipeList> findByRecipeId(@Param("recipeId") UUID recipeId);
}
