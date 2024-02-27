package com.juotava.users.service;

import com.juotava.users.repository.settings.SettingsRepository;
import com.juotava.users.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private final UserRepository userRepository;
    private final SettingsRepository settingsRepository;

    @Autowired
    public UsersService(UserRepository userRepository, SettingsRepository settingsRepository) {
        this.userRepository = userRepository;
        this.settingsRepository = settingsRepository;
    }
}
