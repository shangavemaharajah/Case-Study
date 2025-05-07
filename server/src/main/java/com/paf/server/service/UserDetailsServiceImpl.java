package com.paf.server.service;

import com.paf.server.model.User;
import com.paf.server.repository.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepo userRepo;

    public UserDetailsServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Looking for user with username: " + username);
        Optional<User> user = userRepo.findByUsername(username);
        return userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User with name " + username + " not found"));


    }
}
