package com.manager.Stocker.Controller;

import com.manager.Stocker.Model.Dto.UserDTO;
import com.manager.Stocker.Service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/User")
@CrossOrigin(origins = "http://localhost:5500")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<UUID> createUser(@RequestBody UserDTO userDTO) {
        log.info("Creating user");
        var id = userService.createUser(userDTO);
        return ResponseEntity.ok(UUID.randomUUID());
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UUID> getUserByUserName(@RequestBody UserDTO userDTO) {
        var user = userService.retrieveUser(userDTO.username());
        if(user != null) {
            if(userDTO.password().equals(user.getPassword())) {
                return ResponseEntity.ok(user.getUserID());
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/DeleteAll")
    public ResponseEntity<Void> deleteAllUsers() {
        userService.removeAllUsers();
        log.info("Deleting all Users");
        return ResponseEntity.noContent().build();
    }
}
