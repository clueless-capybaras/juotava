package com.juotava.users.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.UUID;

@Entity
@Getter
public class User {
    @Id
    private String auth0id;
    private String userName;
    @OneToOne
    private Settings settings;
    @OneToOne
    private Image image;

    public User(String auth0id, String userName) {
        this.auth0id = auth0id;
        this.userName = userName;
    }

    public User() {
    }

    public void setSettings(Settings settings) {
        this.settings = settings;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
