package com.juotava.recipes.model;

import com.juotava.recipes.model.enums.Category;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
public class Filter {

    @Setter
    @Column(unique = true)
    private String correspondingUser;
    @Id
    @GeneratedValue
    private UUID uuid;
    private boolean showNonAlcOnly;
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Category> categories;

    public Filter(boolean nonAlcoholic, List<Category> categories) {
        this.showNonAlcOnly = nonAlcoholic;
        this.categories = categories;
    }

    public Filter() {
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
