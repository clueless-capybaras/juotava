package com.juotava.recipes.repository.bartinderFilter;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.juotava.recipes.model.BartinderFilter;

@Repository
public class BartinderFilterRepository {
    private final SpringBartinderFilterRepository springBartinderFilterRepository;

    @Autowired
    public BartinderFilterRepository(SpringBartinderFilterRepository springBartinderFilterRepository) {
        this.springBartinderFilterRepository = springBartinderFilterRepository;
    }

    public BartinderFilter findByUuid(UUID uuid) {
        return this.springBartinderFilterRepository.findById(uuid).get();
    }

    public BartinderFilter findByCorrespondingUserAuth0id(String auth0id) {
        return this.springBartinderFilterRepository.findByCorrespondingUser(auth0id);
    }

    public void save(BartinderFilter filter) {
        this.springBartinderFilterRepository.save(filter);
    }
}
