package com.juotava.recipes.controller;

import com.juotava.recipes.model.*;
import com.juotava.recipes.model.enums.Unit;
import com.juotava.recipes.service.RecipesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/api/recipes")
public class RecipesController {
    private final RecipesService recipesService;

    @Autowired
    public RecipesController(RecipesService recipesService) {
        this.recipesService = recipesService;
    }

    @GetMapping
    public String getDefault(){
        return "hello world";
    }

    @GetMapping(path = "/test")
    public Recipe addDemoRecipe(Authentication authentication){
        String auth0uid = authentication.getName();
        Recipe recipe = new Recipe("Demo Recipe", "This is a demo recipe!", "Dairy", true);
        this.recipesService.addIngredientToRecipe(recipe, new Ingredient(
                "Water", 100, Unit.MILLILITRES
        ));
        this.recipesService.addIngredientToRecipe(recipe, new Ingredient(
                "Milk", 50, Unit.MILLILITRES
        ));
        this.recipesService.addIngredientToRecipe(recipe, new Ingredient(
                "Sugar", 1, Unit.TEASPOONS
        ));
        this.recipesService.addStepToRecipe(recipe, new Step(
            "Fill water into a cup"
        ));
        this.recipesService.addStepToRecipe(recipe, new Step(
                "Add cute latte art with milk"
        ));
        this.recipesService.addStepToRecipe(recipe, new Step(
                "place the sugar inside a straw"
        ));
        this.recipesService.addStepToRecipe(recipe, new Step(
                "Finished, ready to drink 🍷"
        ));
        this.recipesService.setImageOfRecipe(recipe, new Image(
                "picture of a drink", "This is an image"
        ));
        this.recipesService.setCreatedByOfRecipe(recipe, auth0uid);
        this.recipesService.saveRecipe(recipe);
        System.out.println(recipe.getUuid());
        return recipe;
    }

    /*
        Endpoints /recipe/*
        Interact with recipes
     */

    @PostMapping(path = "recipe/save")
    public String saveRecipe(@RequestBody Recipe recipe, Authentication authentication){
        try {
            String auth0uid = authentication.getName();
            if (!auth0uid.equals(recipe.getCreatedBy())){
                System.out.println("ERROR: User id "+recipe.getCreatedBy()+" does not match with sending user "+auth0uid);
                return "false";
            }
            this.recipesService.setCurrentUserToRecipe(recipe, auth0uid);
            this.recipesService.saveRecipe(recipe);
            System.out.println("INFO: Saved Recipe: " + recipe.getUuid());
            return recipe.getUuid().toString();
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return "false";
        }
    }

    @GetMapping(path = "recipe/all")
    public List<Recipe> getAllRecipes(){
        return this.recipesService.getAllRecipes();
    }

    @GetMapping(path = "recipeexcerpt/all")
    public List<RecipeExcerpt> getAllRecipeExcerpts() { 
        return this.recipesService.getAllRecipeExcerpts(); 
    }

    @GetMapping(path = "recipe/my")
    public List<Recipe> getMyRecipes(Authentication authentication){
        String auth0id = authentication.getName();
        return this.recipesService.getRecipesByUser(auth0id);
    }

    @GetMapping(path = "recipe/mydrafts")
    public List<Recipe> getMyDraftedRecipes(Authentication authentication){
        String auth0id = authentication.getName();
        return this.recipesService.getDraftedRecipesByUser(auth0id);
    }

    @GetMapping(path = "recipe/mypublished")
    public List<Recipe> getMyPublishedRecipes(Authentication authentication){
        String auth0id = authentication.getName();
        return this.recipesService.getPublishedRecipesByUser(auth0id);
    }

    @GetMapping(path = "recipe/{uuid}")
    public Recipe getRecipe(@PathVariable UUID uuid){
        return this.recipesService.getRecipe(uuid);
    }


}
