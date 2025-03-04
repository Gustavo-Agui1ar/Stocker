package com.manager.Stocker.Service;

import com.manager.Stocker.Model.Dto.UserDTO;
import com.manager.Stocker.Model.Entity.User;
import com.manager.Stocker.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UUID createUser(UserDTO user) {
        var newUser = new User(
                UUID.randomUUID(),
                user.username(),
                user.email(),
                user.password(),
                Instant.now()
        );
        var userSaved = userRepository.save(newUser);
        return userSaved.getUserID();
    }

    public User retrieveUser(String username) {
        var user = userRepository.findByUsername(username);
        return user.orElse(null);
    }

    public  void removeAllUsers() {
        userRepository.deleteAll();
    }
}
