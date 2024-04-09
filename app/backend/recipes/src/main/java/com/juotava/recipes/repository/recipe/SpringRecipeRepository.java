package com.juotava.recipes.repository.recipe;

import com.juotava.recipes.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    @Query(value = "SELECT r.* FROM recipe r LEFT JOIN recipe_ingredients ri ON r.uuid = ri.recipe_uuid LEFT JOIN ingredient i ON ri.ingredients_uuid = i.uuid WHERE r.draft = false AND r.category IN (:categories) AND (:nonAlcOnly = false OR r.non_alcoholic = :nonAlcOnly) AND ( (LOWER(r.title) RLIKE :search) OR (LOWER(r.category) RLIKE :search) OR (LOWER(r.description) RLIKE :search) OR (LOWER(i.name) RLIKE :search) ) GROUP BY r.uuid",
            countQuery = "SELECT COUNT(DISTINCT r.uuid) FROM recipe r LEFT JOIN recipe_ingredients ri ON r.uuid = ri.recipe_uuid LEFT JOIN ingredient i ON ri.ingredients_uuid = i.uuid WHERE r.draft = false AND r.category IN (:categories) AND (:nonAlcOnly = false OR r.non_alcoholic = :nonAlcOnly) AND ( (LOWER(r.title) RLIKE :search) OR (LOWER(r.category) RLIKE :search) OR (LOWER(r.description) RLIKE :search) OR (LOWER(i.name) RLIKE :search) )",
            nativeQuery = true)
    public Page<Recipe> findByDraftFalseAndFilteredAndSearched(@Param("categories")List<String> categories, @Param("nonAlcOnly")boolean nonAlcOnly, @Param("search")String search, Pageable pageable);
}
