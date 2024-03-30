package com.juotava.users.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Entity
@Table(name = "userimage")
@Getter
public class Image {
    @Id
    @GeneratedValue
    private UUID uuid;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "LONGBLOB")
    private byte[] base64data;

    public Image(String base64data) {
        this.setBase64data(base64data);
    }

    public Image() {
    }

    public String getBase64data() {
        try {
            return new String(this.base64data);
        } catch (Exception e) {
            return null;
        }
    }

    public void setBase64data(String base64data) {
        this.base64data = base64data.getBytes(StandardCharsets.UTF_8);
    }
}
