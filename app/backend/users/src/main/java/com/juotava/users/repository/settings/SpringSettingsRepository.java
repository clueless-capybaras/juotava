package com.juotava.users.repository.settings;

import com.juotava.users.model.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SpringSettingsRepository extends JpaRepository<Settings, UUID> {
}
