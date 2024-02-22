package com.juotava.recipes.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

import java.util.UUID;

@Entity
@Getter
public class Step {
    @Id
    @GeneratedValue
    private UUID uuid;
    @Column(name = "steporder")
    private int order;
    private String description;

    public Step(String description) {
        this.description = description;
    }

    public Step() {}

    public void setOrder(int order) {
        this.order = order;
    }
}
