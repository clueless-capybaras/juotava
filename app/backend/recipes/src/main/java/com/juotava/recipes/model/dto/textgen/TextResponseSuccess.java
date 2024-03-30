package com.juotava.recipes.model.dto.textgen;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class TextResponseSuccess {
    private String id;
    private String object;
    private Timestamp created;
    private String model;
    private List<Choice> choices;
    private Usage usage;
    private String system_fingerprint;

    public TextResponseSuccess(String id, String object, Timestamp created, String model, List<Choice> choices, Usage usage, String system_fingerprint) {
        this.id = id;
        this.object = object;
        this.created = created;
        this.model = model;
        this.choices = choices;
        this.usage = usage;
        this.system_fingerprint = system_fingerprint;
    }
}
