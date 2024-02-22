package com.juotava.recipes.service;

import com.juotava.recipes.model.*;
import com.juotava.recipes.repository.user.UserRepRepository;
import com.juotava.recipes.repository.image.ImageRepository;
import com.juotava.recipes.repository.ingredient.IngredientRepository;
import com.juotava.recipes.repository.recipe.RecipeRepository;
import com.juotava.recipes.repository.step.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RecipesService {
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final StepRepository stepRepository;
    private final ImageRepository imageRepository;
    private final UserRepRepository userRepRepository;

    @Autowired
    public RecipesService(RecipeRepository recipeRepository, IngredientRepository ingredientRepository, StepRepository stepRepository, ImageRepository imageRepository, UserRepRepository userRepRepository) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.stepRepository = stepRepository;
        this.imageRepository = imageRepository;
        this.userRepRepository = userRepRepository;
    }

    public Recipe getRecipe(UUID uuid){
        return  this.recipeRepository.findByUuid(uuid);
    }

    public List<Recipe> getAllRecipes(){
        return this.recipeRepository.findAll();
    }

    public List<Recipe> getRecipesByUser(String auth0id){
        return this.recipeRepository.findByCreatedByAuth0id(auth0id);
    }

    public void saveRecipe(Recipe recipe){
        recipe.getIngredients().forEach(this.ingredientRepository::save);
        recipe.getSteps().forEach(this.stepRepository::save);
        this.imageRepository.save(recipe.getImage());
        this.userRepRepository.save(recipe.getCreatedBy());
        this.recipeRepository.save(recipe);
    }

    public void addIngredientToRecipe(Recipe recipe, Ingredient ingredient){
        this.ingredientRepository.save(ingredient);
        recipe.addIngredient(ingredient);
        this.recipeRepository.save(recipe);
    }

    public void addStepToRecipe(Recipe recipe, Step step){
        this.stepRepository.save(step);
        recipe.addStep(step);
        this.recipeRepository.save(recipe);
    }

    public void setImageOfRecipe(Recipe recipe, Image image){
        this.imageRepository.save(image);
        recipe.setImage(image);
        this.recipeRepository.save(recipe);
    }

    public void setCreatedByOfRecipe(Recipe recipe, UserRepresentation userRep){
        this.userRepRepository.save(userRep);
        recipe.setCreatedBy(userRep);
        this.recipeRepository.save(recipe);
    }

    public void setCurrentUserToRecipe(Recipe recipe, String auth0name){
        try {
            UserRepresentation userRep = this.userRepRepository.findByAuth0Id(auth0name);
            System.out.println("Found existing user: "+userRep.getAuth0id());
            recipe.setCreatedBy(userRep);
        } catch (Exception e){
            recipe.setCreatedBy(new UserRepresentation(
                auth0name
            ));
        }
    }
}
