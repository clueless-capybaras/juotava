package com.juotava.recipes.repository.recipe;

import com.juotava.recipes.model.BartinderFilter;
import com.juotava.recipes.model.BartinderSuggestion;
import com.juotava.recipes.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class RecipeRepository {
    private final SpringRecipeRepository springRecipeRepository;
    @Autowired
    public RecipeRepository(SpringRecipeRepository springRecipeRepository) {
        this.springRecipeRepository = springRecipeRepository;
    }

    public Recipe findByUuid(UUID uuid){
        return this.springRecipeRepository.findById(uuid).get();
    }

    public List<Recipe> findByCreatedByAuth0id(String auth0id){
        return this.springRecipeRepository.findByCreatedBy(auth0id);
    }

    public List<Recipe> findDraftedByCreatedByAuth0id(String auth0id){
        return this.springRecipeRepository.findByCreatedByAndDraftTrue(auth0id);
    }

    public List<Recipe> findPublishedByCreatedByAuth0id(String auth0id){
        return this.springRecipeRepository.findByCreatedByAndDraftFalse(auth0id);
    }

    public List<Recipe> findAllPublished(){
        return this.springRecipeRepository.findByDraftFalse();
    }

    public void save(Recipe recipe){
        this.springRecipeRepository.save(recipe);
    }

    public Recipe findRandomByBartinderFilter(BartinderFilter filter, List<BartinderSuggestion> suggestions) {
        List<UUID> alreadySuggested = suggestions.stream().map(BartinderSuggestion::getRecipeUuid).toList();
        List<String> categories = filter.getCategories().stream().map(Enum::toString).toList();
        return this.springRecipeRepository.findByBartinderFilter(categories, filter.isShowNonAlcOnly(), alreadySuggested);
    }
}
