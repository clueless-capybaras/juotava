package com.juotava.recipes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Getter
public class UserRepresentation {
    @Id
    private String auth0id;
    private String userName;

    public UserRepresentation(String auth0id) {
        this.auth0id = auth0id;
    }

    public UserRepresentation(String auth0id, String userName) {
        this.auth0id = auth0id;
        this.userName = userName;
    }

    public UserRepresentation() {
    }
}
