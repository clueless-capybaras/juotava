package com.juotava.recipes.controller;

import com.juotava.recipes.model.*;
import com.juotava.recipes.service.RecipesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    /*
        Endpoints /recipe/*
        Interact with recipes
     */

    @PostMapping(path = "recipe/save")
    public String saveRecipe(@RequestBody Recipe recipe, Authentication authentication){
        try {
            String auth0id = authentication.getName();
            if (!auth0id.equals(recipe.getCreatedBy())){
                System.out.println("ERROR: User id "+recipe.getCreatedBy()+" does not match with sending user "+auth0id);
                return "false";
            }
            this.recipesService.setCurrentUserToRecipe(recipe, auth0id);
            boolean success = this.recipesService.saveRecipe(recipe);
            if (success){
                return recipe.getUuid().toString();
            } else {
                throw new Exception("ERROR: Recipe not saved!");
            }

        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return "false";
        }
    }

    @PostMapping(path = "recipe/genimage")
    public Image generateRecipeImage(@RequestBody Recipe recipe, Authentication authentication){
        try {
            String auth0uid = authentication.getName();
            System.out.println("INFO: Generating image with prompt: "+recipe.toPrompt());
            return this.recipesService.generateImage(recipe.toPrompt(), auth0uid);
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return null;
        }
    }

    @GetMapping(path = "recipe/all")
    public List<Recipe> getAllRecipes(){
        return this.recipesService.getAllRecipes();
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
    public Recipe getRecipe(@PathVariable UUID uuid, Authentication authentication){
        String auth0id = authentication.getName();
        return this.recipesService.getRecipe(uuid, auth0id);
    }

    /*
        Endpoints /recipeexcerpt/*
        Interact with recipe excerpts
     */

    @GetMapping(path = "recipeexcerpt/all")
    public List<RecipeExcerpt> getAllRecipeExcerpts(Authentication authentication, @RequestParam(required = false) String search) {
        String auth0id = authentication.getName();
        List<RecipeExcerpt> excerpts = this.recipesService.getAllRecipeExcerpts(auth0id, search);
        return excerpts;
    }

    @GetMapping(path = "recipeexcerpt/mydrafted")
    public List<RecipeExcerpt> getMyDraftedRecipeExcerpts(Authentication authentication){
        String auth0id = authentication.getName();
        return this.recipesService.getDraftedRecipeExcerptsByUser(auth0id);
    }

    @GetMapping(path = "recipeexcerpt/mypublished")
    public List<RecipeExcerpt> getMyPublishedRecipeExcerpts(Authentication authentication){
        String auth0id = authentication.getName();
        return this.recipesService.getPublishedRecipeExcerptsByUser(auth0id);
    }

    /*
        Endpoints /list/*
        Interact with lists
     */

    @GetMapping(path = "list/my")
    public List<RecipeListExcerpt> getMyRecipeLists(Authentication authentication){
        String auth0id = authentication.getName();
        List<RecipeListExcerpt> recipeListExcerpts = this.recipesService.getRecipeListsByUser(auth0id);
        return recipeListExcerpts;
    }

    @PostMapping(path = "list/new")
    public String addRecipeList(@RequestBody String title, Authentication authentication){
        String auth0id = authentication.getName();
        return this.recipesService.createRecipeList(title, auth0id);
    }

    @PostMapping(path = "list/save/{listId}")
    public boolean saveRecipeChanges(@PathVariable UUID listId, @RequestBody String newTitle, Authentication authentication) {
        String auth0Id = authentication.getName();
        return this.recipesService.changeRecipeList(listId, newTitle, auth0Id);
    }

    @PostMapping(path = "list/addrecipe/{listId}")
    public boolean addRecipeToList(@PathVariable UUID listId, @RequestBody String recipeId, Authentication authentication){
        UUID recipeUuid = UUID.fromString(recipeId);
        String auth0id = authentication.getName();
        return this.recipesService.addRecipeToList(listId, recipeUuid, auth0id);
    }

    @PostMapping(path = "list/favorite")
    public boolean addRecipeToList(@RequestBody String recipeId, Authentication authentication){
        UUID recipeUuid = UUID.fromString(recipeId);
        String auth0id = authentication.getName();
        return this.recipesService.addRecipeToFavorite(recipeUuid, auth0id);
    }

    @GetMapping(path = "list/{listId}")
    public RecipeList getRecipeList(@PathVariable UUID listId, Authentication authentication){
        String auth0id = authentication.getName();
        return this.recipesService.getRecipeList(listId, auth0id);
    }

    // Draft
    @PostMapping(path = "list/{listId}/remove")
    public boolean removeRecipeFromList(@PathVariable UUID listId, @RequestBody String recipeId, Authentication authentication){
        UUID recipeUuid = UUID.fromString(recipeId);
        String auth0id = authentication.getName();
        return this.recipesService.removeRecipeFromList(listId, recipeUuid, auth0id);
    }

    @DeleteMapping(path = "list/favorite")
    public boolean removeRecipeFromFavorites(@RequestBody String recipeId, Authentication authentication){
        UUID recipeUuid = UUID.fromString(recipeId);
        String auth0id = authentication.getName();
        return this.recipesService.removeRecipeFromFavorites(recipeUuid, auth0id);
    }

    /*
        Endpoints /filter/*
        Interact with filters
     */

    @PostMapping(path = "filter/save")
    public String saveFilter(@RequestBody Filter filter, Authentication authentication) {
        String auth0id = authentication.getName();
        boolean success = this.recipesService.saveFilter(filter, auth0id);
        return success? filter.getUuid().toString():"false";
    }

    @GetMapping(path = "filter/my")
    public Filter getMyFilter(Authentication authentication){
        String auth0id = authentication.getName();
        return this.recipesService.getFilterByUser(auth0id, true);
    }

    //
    // Drink of the day
    //

    @GetMapping(path = "drinkoftheday")
    public DrinkOfTheDay getDrinkOfTheDay(){
        return this.recipesService.getDrinkOfTheDay();
    }

}
