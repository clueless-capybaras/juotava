package com.juotava.recipes.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
public class Recipe {
    @Id
    @GeneratedValue
    private UUID uuid;

    private String title;

    private String description;

    private String category;

    private boolean nonAlcoholic;

    @OneToMany
    private List<Ingredient> ingredients;

    @OneToMany
    private List<Step> steps;

    @OneToOne
    private Image image;

    @ManyToOne
    private UserRepresentation createdBy;

    public Recipe(String title, String description, String category, boolean nonAlcoholic) {
        this.title = title;
        this.description = description;
        this.nonAlcoholic = nonAlcoholic;
        this.ingredients = new ArrayList<>();
        this.steps = new ArrayList<>();
    }

    public Recipe() {
        this.title = "";
        this.description = "";
        this.ingredients = new ArrayList<>();
        this.steps = new ArrayList<>();
    }

    public List<Step> getSteps() {
        this.steps.sort(Comparator.comparingInt(Step::getOrder));
        return this.steps;
    }

    public List<Ingredient> getIngredients() {
        this.ingredients.sort(Comparator.comparingInt(Ingredient::getOrder));
        return ingredients;
    }

    public void addIngredient(Ingredient ingredient){
        ingredient.setOrder(this.ingredients.size());
        this.ingredients.add(ingredient);
    }

    public void addStep(Step step){
        step.setOrder(this.steps.size());
        this.steps.add(step);
    }

    public void setImage(Image image){
        this.image = image;
    }

    public void setCreatedBy(UserRepresentation createdBy) {
        this.createdBy = createdBy;
    }
}
