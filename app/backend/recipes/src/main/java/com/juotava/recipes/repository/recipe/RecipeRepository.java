package com.juotava.recipes.repository.recipe;

import com.juotava.recipes.model.BartinderFilter;
import com.juotava.recipes.model.BartinderSuggestion;
import com.juotava.recipes.model.Filter;
import com.juotava.recipes.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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

    public Page<Recipe> findAllPublishedSearchedAndFiltered(Filter filter, String search, Pageable pageable) {
        List<String> categories = filter.getCategories().stream().map(Enum::toString).toList();
        return this.springRecipeRepository.findByDraftFalseAndFilteredAndSearched(categories, filter.isShowNonAlcOnly(), search, pageable);
    }

    public void save(Recipe recipe){
        this.springRecipeRepository.save(recipe);
    }

    public void delete(Recipe recipe) {
        this.springRecipeRepository.delete(recipe);
    }

    public Recipe findRandomByBartinderFilter(BartinderFilter filter, List<BartinderSuggestion> suggestions) {
        List<UUID> alreadySuggested = suggestions.stream().map(BartinderSuggestion::getRecipeUuid).toList();
        List<String> categories = filter.getCategories().stream().map(Enum::toString).toList();
        return this.springRecipeRepository.findByBartinderFilter(categories, filter.isShowNonAlcOnly(), alreadySuggested);
    }
}
