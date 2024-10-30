package com.publicissapient.authentication.controller;

import com.publicissapient.authentication.config.JavaConstant;
import com.publicissapient.authentication.config.ResourceBO;
import com.publicissapient.authentication.dto.PasswordDTO;
import com.publicissapient.authentication.dto.ProfileDTO;
import com.publicissapient.authentication.entity.AuthRequest;
import com.publicissapient.authentication.entity.AuthResponse;
import com.publicissapient.authentication.entity.User;
import com.publicissapient.authentication.repository.UserRepository;
import com.publicissapient.authentication.service.JwtService;
import com.publicissapient.authentication.service.UserInfoService;
import com.publicissapient.authentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class UserController {
//    @Autowired
    private UserInfoService service;

    public UserController(UserInfoService service, JwtService jwtService, UserService userService, AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.service = service;
        this.jwtService = jwtService;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

//    @Autowired
    private final JwtService jwtService;
//    @Autowired
    private final UserService userService;
//    @Autowired
    private final AuthenticationManager authenticationManager;
//    @Autowired
    private final UserRepository userRepository;
    @GetMapping("/welcome")
    public static String welcome() {
        return ResourceBO.getKey(JavaConstant.WELCOME);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @PostMapping("/generateToken")
    public AuthResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        AuthResponse authResponse = new AuthResponse();

        if (authentication.isAuthenticated()) {
            authResponse.setToken(jwtService.generateToken(authRequest.getEmail()));

            Optional<User> userOptional = userRepository.findByEmail(authRequest.getEmail());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                authResponse.setId(user.getId());
            } else {
                throw new UsernameNotFoundException("User not found: "+authRequest.getEmail());
            }
        } else {
            throw new UsernameNotFoundException("Invalid credentials for user: "+authRequest.getEmail());
        }

        return authResponse;
    }
    @PutMapping("/update-profile")
    public ResponseEntity<Map<String,String>> updateUserProfile(@RequestBody ProfileDTO profileDto){
        userService.updateUserProfile(profileDto);
        Map<String,String> response=new HashMap<>();
        response.put("message","User profile updated successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/change-password")
    public ResponseEntity<Map<String, String>> changeUserPassword(@RequestBody PasswordDTO passwordDto) {
        userService.changeUserPassword(passwordDto);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User password changed successfully");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/my-profile/{userId}")
    public ResponseEntity<ProfileDTO> getUserProfile(@PathVariable String userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            ProfileDTO profileDTO = new ProfileDTO();
            profileDTO.setFullName(user.getFullName());
            profileDTO.setEmail(user.getEmail());
            profileDTO.setAddress(user.getAddress());
            profileDTO.setMobileNumber(user.getMobileNumber());
            return ResponseEntity.ok(profileDTO);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
