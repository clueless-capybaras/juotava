package com.juotava.recipes.model.dto.imagegen;

import lombok.Getter;
import lombok.Setter;

import java.net.URL;

@Getter
@Setter
public class Data {
    private String revised_prompt;
    private String b64_json;

    public Data(String revised_prompt, String b64_json) {
        this.revised_prompt = revised_prompt;
        this.b64_json = b64_json;
    }
}
