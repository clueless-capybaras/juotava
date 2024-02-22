package com.juotava.recipes.repository.image;

import com.juotava.recipes.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SpringImageRepository extends JpaRepository<Image, UUID> {
}
