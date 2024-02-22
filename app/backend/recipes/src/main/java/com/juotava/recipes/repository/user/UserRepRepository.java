package com.juotava.recipes.repository.user;

import com.juotava.recipes.model.UserRepresentation;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class UserRepRepository {
    private final SpringUserRepRepository springUserRepRepository;

    public UserRepRepository(SpringUserRepRepository springUserRepRepository) {
        this.springUserRepRepository = springUserRepRepository;
    }

    public UserRepresentation findByAuth0Id(String auth0id){
        return this.springUserRepRepository.findById(auth0id).get();
    }

    public void save(UserRepresentation userRepresentation){
        this.springUserRepRepository.save(userRepresentation);
    }
}
