package com.juotava.users.service;

import com.juotava.users.model.Settings;
import com.juotava.users.model.User;
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

    public User getUserDetails(String auth0id){
        try {
            return this.userRepository.findById(auth0id);
        } catch (Exception ex){
            User newUser = new User(auth0id, "");
            newUser.setSettings(new Settings(false));
            this.saveUserDetails(newUser);
            return newUser;
        }

    }

    public boolean saveUserDetails(User user){
        try {
            this.settingsRepository.save(user.getSettings());
            this.userRepository.save(user);
            return true;
        } catch (Exception ex){
            System.out.println("ERROR: could not save userdata of user "+ user.getAuth0id());
            return false;
        }
    }
}
