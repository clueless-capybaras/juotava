package com.juotava.recipes.controller;

import com.juotava.recipes.model.Ingredient;
import com.juotava.recipes.model.Recipe;
import com.juotava.recipes.service.RecipesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public Recipe addDemoRecipe(){
        Recipe recipe = new Recipe("Demo Recipe", "This is a demo recipe!");
        this.recipesService.addIngredientToRecipe(recipe, new Ingredient());
        this.recipesService.saveRecipe(recipe);
        return recipe;
    }

    @GetMapping(path = "recipe/{uuid}")
    public Recipe getRecipe(@PathVariable UUID uuid){
        return this.recipesService.getRecipe(uuid);
    }
}
