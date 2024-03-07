package com.juotava.users.repository.user;

import com.juotava.users.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringUserRepository extends JpaRepository<User, String> {
}
