package com.juotava.users.controller;

import com.juotava.users.model.user.PublicUserRepresentation;
import com.juotava.users.model.user.User;
import com.juotava.users.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/api/users")
public class UsersController {
    private UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public String getDefault(){
        return "hello world, this is users backend";
    }

    @GetMapping(path = "user/my")
    public User getMyUserDetails(Authentication authentication){
        return this.usersService.getMyUserDetails(authentication.getName());
    }

    @GetMapping(path = "user/{auth0id}")
    public PublicUserRepresentation getUserDetails(@PathVariable String auth0id, Authentication authentication){
        return this.usersService.getUserDetails(auth0id);
    }

    @PostMapping(path = "user/save")
    public boolean saveUserDetails(@RequestBody User user, Authentication authentication){
        if(!authentication.getName().equals(user.getAuth0id())){
            System.out.println("WARNING: User "+ authentication.getName()+" tried to change user details of "+ user.getAuth0id());
            return false;
        }
        return this.usersService.saveUserDetails(user);
    }
}
