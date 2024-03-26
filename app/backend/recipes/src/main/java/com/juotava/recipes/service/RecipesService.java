package com.juotava.recipes.service;

import com.juotava.recipes.model.*;
import com.juotava.recipes.model.dto.ImageRequest;
import com.juotava.recipes.model.dto.ImageResposeSuccess;
import com.juotava.recipes.repository.filter.FilterRepository;
import com.juotava.recipes.repository.image.ImageRepository;
import com.juotava.recipes.repository.ingredient.IngredientRepository;
import com.juotava.recipes.repository.recipe.RecipeRepository;
import com.juotava.recipes.repository.step.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RecipesService {

    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate openaiRestTemplate;
    @Value("${openai.model}")
    private String model;
    @Value("${openai.api.url}")
    private String apiUrl;


    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final StepRepository stepRepository;
    private final ImageRepository imageRepository;
    private final FilterRepository filterRepository;

    @Autowired
    public RecipesService(RecipeRepository recipeRepository, IngredientRepository ingredientRepository, StepRepository stepRepository, ImageRepository imageRepository, FilterRepository filterRepository) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.stepRepository = stepRepository;
        this.imageRepository = imageRepository;
        this.filterRepository = filterRepository;
    }

    //
    //  GETTERS
    //

    public Recipe getRecipe(UUID uuid){
        return  this.recipeRepository.findByUuid(uuid);
    }

    public List<Recipe> getAllRecipes(){
        return this.recipeRepository.findAllPublished();
    }

    public List<Recipe> getRecipesByUser(String auth0id){
        return this.recipeRepository.findByCreatedByAuth0id(auth0id);
    }

    public List<Recipe> getDraftedRecipesByUser(String auth0id){
        return this.recipeRepository.findDraftedByCreatedByAuth0id(auth0id);
    }

    public List<Recipe> getPublishedRecipesByUser(String auth0id){
        return this.recipeRepository.findPublishedByCreatedByAuth0id(auth0id);
    }

    public List<RecipeExcerpt> getAllRecipeExcerpts(String auth0id) {
        Filter filter = getFilterByUser(auth0id);
        List<RecipeExcerpt> tempList = new ArrayList<>();

        //Filter
        getAllRecipes().stream()
            .filter(recipe -> (filter.isNonAlcoholic() == recipe.isNonAlcoholic())
                && (filter.compareToCategories(recipe.getCategory()))
            )
            .map(recipe -> tempList.add(parseToExcerpt(recipe)))
            .collect(Collectors.toList());

        return(tempList);
    }

    //
    // SETTERS
    //

    public void saveRecipe(Recipe recipe){
        recipe.getIngredients().forEach(this.ingredientRepository::save);
        recipe.getSteps().forEach(this.stepRepository::save);
        this.imageRepository.save(recipe.getImage());
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

    public void setCreatedByOfRecipe(Recipe recipe, String auth0id){
        recipe.setCreatedBy(auth0id);
        this.recipeRepository.save(recipe);
    }

    public void setCurrentUserToRecipe(Recipe recipe, String auth0id){
        recipe.setCreatedBy(auth0id);
    }

    //
    //  GENERATION
    //

    public Image generateImage(String prompt, String user){
        ImageRequest request = new ImageRequest(prompt, model, 1, "hd", "b64_json", user);
        ImageResposeSuccess response = openaiRestTemplate.postForObject(apiUrl, request, ImageResposeSuccess.class);

        if (response == null || response.getData() == null || response.getData().isEmpty()) {
            return null;
        }
        return new Image(
                response.getData().get(0).getRevised_prompt(),
                "data:image/png;base64,"+response.getData().get(0).getB64_json()
        );
    }

    //
    //  FILTERS
    //

    public void saveFilter(Filter filter) { this.filterRepository.save(filter); }

    public void setCurrentUserToFilter(Filter filter, String auth0id){
        filter.setCorrespondingUser(auth0id);
    }

    public Filter getFilterByUser(String auth0id) { return filterRepository.findByCorrespondingUserAuth0id(auth0id); }

    /*public List<RecipeExcerpt> filterByAlc(Filter filter) {
        List<RecipeExcerpt> tempList = new ArrayList<>();
        return getAllRecipeExcerpts().stream()
            .filter(excerpt -> excerpt.isNonAlcoholic() == filter.isNonAlcoholic())
            .collect(Collectors.toList());
    }

    public List<RecipeExcerpt> filterByCategory(Filter filter) {
        return getAllRecipeExcerpts().stream()
            .filter(excerpt -> filter.compareToCategories(excerpt.getCategory()))
            .collect(Collectors.toList());
    }

    public List<RecipeExcerpt> filterByAlcAndCategory(Filter filter) {
        return getAllRecipeExcerpts().stream()
            .filter(excerpt -> filter.compareToCategories(excerpt.getCategory())
                && ( excerpt.isNonAlcoholic() == filter.isNonAlcoholic() ))
            .collect(Collectors.toList());
    }*/

    public RecipeExcerpt parseToExcerpt(Recipe recipe) {
        return new RecipeExcerpt(recipe.getUuid(), recipe.getTitle(), recipe.getCategory(), recipe.isNonAlcoholic(), recipe.getDescription(), recipe.getIngredients(), recipe.getImage());
    }
}
