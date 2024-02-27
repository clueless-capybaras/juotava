package com.juotava.users.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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

    public User(String auth0id, String userName) {
        this.auth0id = auth0id;
        this.userName = userName;
    }

    public User() {
    }
}
