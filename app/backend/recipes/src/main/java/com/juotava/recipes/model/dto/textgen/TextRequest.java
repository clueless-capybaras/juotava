package com.juotava.recipes.model.dto.textgen;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class TextRequest {
    private String model;
    private List<Message> messages;

    public TextRequest(String model, List<Message> messages) {
        this.model = model;
        this.messages = messages;
    }

    public TextRequest(String model) {
        this.model = model;
        this.messages = new ArrayList<>();
    }

    public void addMessage(Message message){
        this.messages.add(message);
    }
}
