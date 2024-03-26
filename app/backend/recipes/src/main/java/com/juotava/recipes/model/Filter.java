package com.juotava.recipes.model;

import com.juotava.recipes.model.enums.Category;
import lombok.Getter;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
public class Filter {

    private String correspondingUser;
    private UUID uuid;
    private boolean nonAlcoholic;
    private List<Category> categories;

    public Filter(boolean nonAlcoholic, List<Category> categories) {
        this.nonAlcoholic = nonAlcoholic;
        this.categories = categories;
    }

    public Filter() {
        this.nonAlcoholic = false;
        this.categories.add(Category.COCKTAIL);
        this.categories.add(Category.COFFEE);
        this.categories.add(Category.JUICE);
        this.categories.add(Category.LEMONADE);
        this.categories.add(Category.MILKSHAKE);
        this.categories.add(Category.SMOOTHIE);
        this.categories.add(Category.TEA);
    }

    public boolean compareToCategories(String category) {
        boolean match = this.categories.stream().anyMatch(c -> c.toString() == category);

        if(match) return true;
        else return false;
    }

    public void setCorrespondingUser(String auth0id) {
        this.correspondingUser = auth0id;
    }

}
