package com.juotava.users.service;

import com.juotava.users.model.Image;
import com.juotava.users.model.Settings;
import com.juotava.users.model.User;
import com.juotava.users.repository.image.ImageRepository;
import com.juotava.users.repository.settings.SettingsRepository;
import com.juotava.users.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private final UserRepository userRepository;
    private final SettingsRepository settingsRepository;
    private final ImageRepository imageRepository;

    @Autowired
    public UsersService(UserRepository userRepository, SettingsRepository settingsRepository, ImageRepository imageRepository) {
        this.userRepository = userRepository;
        this.settingsRepository = settingsRepository;
        this.imageRepository = imageRepository;
    }

    public User getUserDetails(String auth0id){
        try {
            return this.userRepository.findById(auth0id);
        } catch (Exception ex){
            User newUser = new User(auth0id, "");
            newUser.setSettings(new Settings(false));
            newUser.setImage(new Image(""));
            this.saveUserDetails(newUser);
            return newUser;
        }

    }

    public boolean saveUserDetails(User user){
        try {
            this.settingsRepository.save(user.getSettings());
            this.imageRepository.save(user.getImage());
            this.userRepository.save(user);
            return true;
        } catch (Exception ex){
            System.out.println("ERROR: could not save userdata of user "+ user.getAuth0id());
            return false;
        }
    }
}
