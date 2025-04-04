package com.paf.server.repository;


import com.paf.server.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token, Long> {

    @Query("""
           select t from Token t 
           where t.user.id = :userId and t.loggedOut = false
           """)
    List<Token> findAllAccessTokenByUser(@Param("userId") Long userId);

    Optional<Token> findByAccessToken(String token);

    Optional<Token> findByRefreshToken(String token);
}
