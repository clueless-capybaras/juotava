package com.juotava.recipes.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.juotava.recipes.model.enums.Category;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class BartinderFilter {
    @Id
    @GeneratedValue
    private UUID uuid;
    @Column(unique = true)
    private String correspondingUser;
    private boolean showNonAlcOnly;
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Category> categories;

    public BartinderFilter(boolean nonAlcoholic, List<Category> categories) {
        this.showNonAlcOnly = nonAlcoholic;
        this.categories = categories;
    }

    public BartinderFilter() {
        this.categories = new ArrayList<>();
        this.showNonAlcOnly = false;
        this.categories.add(Category.COCKTAIL);
        this.categories.add(Category.COFFEE);
        this.categories.add(Category.JUICE);
        this.categories.add(Category.LEMONADE);
        this.categories.add(Category.MILKSHAKE);
        this.categories.add(Category.SMOOTHIE);
        this.categories.add(Category.TEA);
    }

    public boolean compareToCategories(String category) {
        return this.categories.stream().anyMatch(c -> c.toString().equals(category));
    }
}
