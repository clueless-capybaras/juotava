package com.juotava.users.model.user;

import com.juotava.users.model.Image;
import com.juotava.users.model.Settings;
import jakarta.persistence.*;
import lombok.Getter;


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
