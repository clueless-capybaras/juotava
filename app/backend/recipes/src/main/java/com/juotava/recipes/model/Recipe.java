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

    @Column(length = 500)
    private String description;

    private String category;

    private boolean nonAlcoholic;

    private boolean draft;

    private String createdBy;

    @OneToMany
    private List<Ingredient> ingredients;

    @OneToMany
    private List<Step> steps;

    @OneToOne
    private Image image;
    
    public Recipe(String title, String description, String category, boolean nonAlcoholic) {
        this.title = title;
        this.description = description;
        this.nonAlcoholic = nonAlcoholic;
        this.draft = false;
        this.ingredients = new ArrayList<>();
        this.steps = new ArrayList<>();
    }

    public Recipe() {
        this.title = "";
        this.description = "";
        this.draft = false;
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

    public void setCreatedBy(String auth0id) {
        this.createdBy = auth0id;
    }

    public String toPrompt(){
        String prompt = "Create an image of the following drink recipe in front of a dark gray studio background. Some of the ingredients should be displayed decoratively around the drink. Never write text. ";
        prompt += "Title: " + this.title;
        prompt += " Description: " + this.description;
        prompt += " Ingredients: ";
        for (int i = 0; i < this.ingredients.size(); i++) {
            prompt += this.ingredients.get(i).getName()+", ";
        }
        return prompt;
    }

    public String toRecipeOfTheDayString(){
        return "<ID: "+ this.uuid +
                ", Title: " + this.title +
                ", Description: " + this.description + ">";
    }
}
