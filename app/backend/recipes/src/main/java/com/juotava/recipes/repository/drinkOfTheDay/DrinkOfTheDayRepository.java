package com.juotava.recipes.repository.drinkOfTheDay;

import com.juotava.recipes.model.DrinkOfTheDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Repository
public class DrinkOfTheDayRepository {
    private SpringDrinkOfTheDayRepository springDrinkOfTheDayRepository;

    @Autowired
    public DrinkOfTheDayRepository(SpringDrinkOfTheDayRepository springDrinkOfTheDayRepository) {
        this.springDrinkOfTheDayRepository = springDrinkOfTheDayRepository;
    }

    public DrinkOfTheDay findByUuid(UUID uuid){
        return this.springDrinkOfTheDayRepository.findById(uuid).get();
    }

    public DrinkOfTheDay findByDate(LocalDate date){
        return this.springDrinkOfTheDayRepository.findByDate(date);
    }

    public DrinkOfTheDay findByDateToday(){
        return this.springDrinkOfTheDayRepository.findByDate(LocalDate.now());
    }

    public void save(DrinkOfTheDay drinkOfTheDay){
        this.springDrinkOfTheDayRepository.save(drinkOfTheDay);
    }
}
