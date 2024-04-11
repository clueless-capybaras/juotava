package com.juotava.recipes.repository.recipe;

import com.juotava.recipes.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;


public interface SpringRecipeRepository extends JpaRepository<Recipe, UUID> {
    public List<Recipe> findByCreatedBy(String auth0id);
    public List<Recipe> findByCreatedByAndDraftTrue(String auth0id);
    public List<Recipe> findByCreatedByAndDraftFalse(String auth0id);
    public List<Recipe> findByDraftFalse();

    @Query(value = "SELECT * FROM recipe r WHERE r.draft = false AND r.category IN :categories AND (:showNonAlcOnly = false OR r.non_alcoholic = :showNonAlcOnly) AND (COALESCE(:alreadySuggested) IS NULL OR r.uuid NOT IN (:alreadySuggested)) ORDER BY RAND() LIMIT 1", nativeQuery = true)
    public Recipe findByBartinderFilter(@Param("categories") List<String> categories, @Param("showNonAlcOnly") boolean showNonAlcOnly, @Param("alreadySuggested") List<UUID> alreadySuggested);
}
