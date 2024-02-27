package com.juotava.users.repository.user;

import com.juotava.users.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private final SpringUserRepository springUserRepository;

    @Autowired
    public UserRepository(SpringUserRepository springUserRepository) {
        this.springUserRepository = springUserRepository;
    }

    public User findById(String auth0id){
        return this.springUserRepository.findById(auth0id).get();
    }

    public List<User> findAll(){
        return this.springUserRepository.findAll();
    }

    public void save(User user){
        this.springUserRepository.save(user);
    }

}
