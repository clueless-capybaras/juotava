package com.juotava.recipes.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Entity
@Getter
public class Image {
    @Id
    @GeneratedValue
    private UUID uuid;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String prompt;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "LONGBLOB")
    private byte[] base64data;

    public Image(String prompt, String base64data) {
        this.prompt = prompt;
        this.setBase64data(base64data);
    }

    public Image(String base64data) {
        this.setBase64data(base64data);
    }

    public Image() {}

    public void setBase64data(String base64data) {
        this.base64data = base64data.getBytes(StandardCharsets.UTF_8);
    }

    public String getBase64data() {
        return new String(this.base64data);
    }
}
