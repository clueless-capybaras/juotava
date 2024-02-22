package com.juotava.recipes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Getter;

import java.util.UUID;

@Entity
@Getter
public class Image {
    @Id
    @GeneratedValue
    private UUID uuid;

    private String name;
    private String prompt;
    @Lob
    private byte[] data;

    public Image(String name, String prompt, byte[] data) {
        this.name = name;
        this.prompt = prompt;
        this.data = data;
    }

    public Image(String name, byte[] data) {
        this.name = name;
        this.data = data;
    }

    public Image() {}
}
