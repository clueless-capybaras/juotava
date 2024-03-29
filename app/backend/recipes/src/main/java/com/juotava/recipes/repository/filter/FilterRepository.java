package com.juotava.recipes.repository.filter;

import com.juotava.recipes.model.Filter;
import com.juotava.recipes.repository.recipe.SpringRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class FilterRepository {
    private final SpringFilterRepository springFilterRepository;
    @Autowired
    public FilterRepository(SpringFilterRepository springFilterRepository) {
        this.springFilterRepository = springFilterRepository;
    }

    public Filter findByUuid(UUID uuid){
        return this.springFilterRepository.findById(uuid).get();
    }

    public Filter findByCorrespondingUserAuth0id(String auth0id) {
        return this.springFilterRepository.findByCorrespondingUser(auth0id);
    }

    public void save(Filter filter) {
        this.springFilterRepository.save(filter);
    }
}
