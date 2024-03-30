package com.juotava.recipes.model.dto.weather;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Day {

    private double maxtemp_c;
    private double mintemp_c;
    private double avgtemp_c;
    private double totalprecip_mm;
    private double maxwind_kph;
    private int avghumidity;
    private int daily_chance_of_rain;
    private int daily_chance_of_snow;
    private Condition condition;

    @Override
    public String toString() {
        return "The weather is "+condition.getText() +" with a maximum temperature of "+ maxtemp_c+ " Celsius, minimum temperature of "+mintemp_c+ " Celsius an average temperature of "+ avgtemp_c+" Celcius. "+
                "The wind has a maximum speed of "+ maxwind_kph+" kph. The average humidity is "+avghumidity+"%. "+
                "The chance of rain is "+ daily_chance_of_rain+"% and the chance of snow is "+daily_chance_of_snow+"% resulting in a total percipation of "+totalprecip_mm+"mm.";
    }
}
