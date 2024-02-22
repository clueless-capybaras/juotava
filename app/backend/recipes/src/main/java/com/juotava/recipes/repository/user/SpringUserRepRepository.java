package com.juotava.recipes.repository.user;

import com.juotava.recipes.model.UserRepresentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface SpringUserRepRepository extends JpaRepository<UserRepresentation, String> {

}
