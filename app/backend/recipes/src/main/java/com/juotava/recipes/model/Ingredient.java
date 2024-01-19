package com.juotava.recipes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

import java.util.UUID;

@Getter
@Entity
public class Ingredient {

    @Id
    @GeneratedValue
    private UUID uuid;

    private String Name;

    private String Unit;

    private boolean isAlcoholic;

    private boolean isVegetarian;

    private boolean isVegan;

    public Ingredient(String name, String unit, boolean isAlcoholic, boolean isVegetarian, boolean isVegan) {
        Name = name;
        Unit = unit;
        this.isAlcoholic = isAlcoholic;
        this.isVegetarian = isVegetarian;
        this.isVegan = isVegan;
    }

    public Ingredient() {
    }
}
