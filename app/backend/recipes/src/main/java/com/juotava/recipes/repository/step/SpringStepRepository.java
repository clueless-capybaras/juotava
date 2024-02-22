package com.juotava.recipes.repository.step;

import com.juotava.recipes.model.Step;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SpringStepRepository extends JpaRepository<Step, UUID> {
}
