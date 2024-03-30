package com.juotava.recipes.model.dto.textgen;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Choice {
    private int index;
    private Message message;
    private String finish_reason;

    public Choice(int index, Message message, String finish_reason) {
        this.index = index;
        this.message = message;
        this.finish_reason = finish_reason;
    }
}
