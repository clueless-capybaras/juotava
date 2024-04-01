package com.juotava.recipes.model.dto.weather;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
public class ForecastDay {
    private String date;
    private Day day;
}
