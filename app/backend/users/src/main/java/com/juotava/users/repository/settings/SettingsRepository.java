package com.juotava.users.repository.settings;

import com.juotava.users.model.Settings;
import com.juotava.users.repository.user.SpringUserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class SettingsRepository {
    private final SpringSettingsRepository springSettingsRepository;

    public SettingsRepository(SpringSettingsRepository springSettingsRepository) {
        this.springSettingsRepository = springSettingsRepository;
    }

    public Settings findById(UUID uuid){
         return this.springSettingsRepository.findById(uuid).get();
    }

    public List<Settings> findAll(){
        return this.springSettingsRepository.findAll();
    }

    public void save(Settings settings){
        this.springSettingsRepository.save(settings);
    }
}
