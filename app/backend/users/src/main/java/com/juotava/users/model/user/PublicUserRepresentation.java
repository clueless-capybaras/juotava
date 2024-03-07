package com.juotava.users.model.user;

import com.juotava.users.model.Image;
import lombok.Getter;

@Getter
public class PublicUserRepresentation {
    private String auth0id;
    private String userName;
    private Image image;

    public PublicUserRepresentation(User user) {
        this.auth0id = user.getAuth0id();
        this.userName = (user.getSettings().isShowUserNameInRecipe())?user.getUserName():"Anonym";
        this.image = (user.getSettings().isShowUserNameInRecipe())?user.getImage():new Image();
    }

    public PublicUserRepresentation(String auth0id) {
        this.userName = "Anonym";
        this.image = new Image();
    }
}
