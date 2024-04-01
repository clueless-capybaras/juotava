package com.juotava.recipes.model.dto.textgen;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Usage {
    private int completion_tokens;
    private int prompt_tokens;
    private int total_tokens;

    public Usage(int completion_tokens, int prompt_tokens, int total_tokens) {
        this.completion_tokens = completion_tokens;
        this.prompt_tokens = prompt_tokens;
        this.total_tokens = total_tokens;
    }
}
