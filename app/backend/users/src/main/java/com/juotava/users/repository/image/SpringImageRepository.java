package com.juotava.users.repository.image;

import com.juotava.users.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SpringImageRepository extends JpaRepository<Image, UUID> {
}
