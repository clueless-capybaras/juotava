package com.juotava.recipes.service;

import com.juotava.recipes.model.Ingredient;
import com.juotava.recipes.model.Recipe;
import com.juotava.recipes.repository.ingredient.IngredientRepository;
import com.juotava.recipes.repository.recipe.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RecipesService {
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    @Autowired
    public RecipesService(RecipeRepository recipeRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public Recipe getRecipe(UUID uuid){
        return  this.recipeRepository.findByUuid(uuid);
    }

    public List<Recipe> getAllRecipes(){
        return this.recipeRepository.findAll();
    }

    public void saveRecipe(Recipe recipe){
        this.recipeRepository.save(recipe);
    }

    public void addIngredientToRecipe(Recipe recipe, Ingredient ingredient){
        this.ingredientRepository.save(ingredient);
        recipe.addIngredient(ingredient);
        this.recipeRepository.save(recipe);
    }
}
