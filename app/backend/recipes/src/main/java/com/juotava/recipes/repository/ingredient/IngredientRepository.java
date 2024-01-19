package com.juotava.recipes.repository.ingredient;

import com.juotava.recipes.model.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class IngredientRepository {
    private final SpringIngredientRepository springIngredientRepository;

    @Autowired
    public IngredientRepository(SpringIngredientRepository springIngredientRepository) {
        this.springIngredientRepository = springIngredientRepository;
    }

    public Ingredient findByUuid(UUID uuid){
        return this.springIngredientRepository.findById(uuid).get();
    }

    public List<Ingredient> findAll(){
        return this.springIngredientRepository.findAll();
    }

    public void save(Ingredient ingredient){
        this.springIngredientRepository.save(ingredient);
    }
}
