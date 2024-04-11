package com.juotava.recipes.repository.bartinderFilter;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.juotava.recipes.model.BartinderFilter;

public interface SpringBartinderFilterRepository extends JpaRepository<BartinderFilter, UUID>{
    public BartinderFilter findByCorrespondingUser(String auth0id);
}
