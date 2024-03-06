package com.juotava.users.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.UUID;

@Entity
@Table(name = "userimage")
@Getter
public class Image {
    @Id
    @GeneratedValue
    private UUID uuid;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String base64data;

    public Image(String base64data) {
        this.base64data = base64data;
    }

    public Image() {
    }
}
