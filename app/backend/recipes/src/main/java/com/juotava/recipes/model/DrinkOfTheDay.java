package com.juotava.recipes.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Entity
@Getter
public class DrinkOfTheDay {
    @Id
    @GeneratedValue
    private UUID uuid;

    private LocalDate date;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    @Setter
    private String reasoning;

    private UUID parsedRecipeUuid;

    @ManyToOne//(fetch = FetchType.LAZY)
    @Setter
    private Recipe recipe;

    public DrinkOfTheDay(Date date) {
        this.date = LocalDate.now();
        this.reasoning = null;
        this.recipe = null;
        this.parsedRecipeUuid = null;
    }

    public DrinkOfTheDay(LocalDate date, String fromString){
        this.date = date;
        Pattern pattern = Pattern.compile("<ID: (.*?), REASON: (.*?)>");
        Matcher matcher = pattern.matcher(fromString);
        if (matcher.find()){
            this.parsedRecipeUuid = UUID.fromString(matcher.group(1));
            this.reasoning = matcher.group(2);
        } else {
            throw new IllegalArgumentException(fromString+" can't be parsed");
        }
    }

    public DrinkOfTheDay() {
        this.date = LocalDate.now();
        this.reasoning = null;
        this.recipe = null;
        this.parsedRecipeUuid = null;
    }
}
