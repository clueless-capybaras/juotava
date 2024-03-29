package com.juotava.recipes.repository.filter;

import com.juotava.recipes.model.Filter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SpringFilterRepository extends JpaRepository<Filter, UUID> {
    public Filter findByCorrespondingUser(String auth0id);
}
