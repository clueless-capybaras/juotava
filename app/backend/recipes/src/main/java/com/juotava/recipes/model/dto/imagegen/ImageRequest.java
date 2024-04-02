package com.juotava.recipes.model.dto.imagegen;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.juotava.recipes.model.Recipe;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageRequest {
    private String prompt;
    private String model;
    private int n;
    private String quality;
    private String response_format;
    private String user;

    public ImageRequest(String prompt, String model, int n, String quality, String response_format, String user) {
        this.prompt = prompt;
        this.model = model;
        this.n = n;
        this.quality = quality;
        this.response_format = response_format;
        this.user = user;
    }
}
