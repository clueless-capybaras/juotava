package com.juotava.recipes.repository.drinkOfTheDay;

import com.juotava.recipes.model.DrinkOfTheDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.UUID;

public interface SpringDrinkOfTheDayRepository extends JpaRepository<DrinkOfTheDay, UUID> {
    public DrinkOfTheDay findByDate(LocalDate date);
}
