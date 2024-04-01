package com.juotava.recipes.model.dto.weather;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class Forecast {
    private List<ForecastDay> forecastday;
}
