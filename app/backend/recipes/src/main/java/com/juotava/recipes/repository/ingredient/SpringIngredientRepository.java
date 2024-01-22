package com.juotava.recipes.repository.ingredient;

import com.juotava.recipes.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SpringIngredientRepository extends JpaRepository<Ingredient, UUID> {

}
