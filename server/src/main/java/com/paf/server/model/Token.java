package com.paf.server.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Token")
@Data  // Generates getters, setters, equals, hashCode, and toString
@Setter
@Getter
@NoArgsConstructor  // Generates a no-args constructor
@AllArgsConstructor  // Generates an all-args constructor
@Builder  // Enables the builder pattern
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "Access_token")
    private String accessToken;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "is_Logged_out")
    private boolean loggedOut;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public boolean isLoggedOut() {
        return loggedOut;
    }

    public void setLoggedOut(boolean loggedOut) {
        this.loggedOut = loggedOut;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
