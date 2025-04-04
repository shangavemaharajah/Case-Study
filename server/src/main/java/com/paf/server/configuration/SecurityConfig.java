package com.paf.server.configuration;


import com.paf.server.filter.JwtAuthenticationFilter;
import com.paf.server.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomerLogoutHandler customerLogoutHandler;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService, JwtAuthenticationFilter jwtAuthenticationFilter,CustomerLogoutHandler customerLogoutHandler) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.customerLogoutHandler = customerLogoutHandler;
    }
    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception{
        return http
                .cors(cors->cors.configurationSource(request -> {
                    var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:5173"));
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfig.setAllowedHeaders(List.of("*"));
                    corsConfig.setAllowCredentials(true);
                    return corsConfig;
                }))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req.requestMatchers(
                                        "/login/**",
                                        "/register/**",
                                        "/refresh_token/**",
                                        "/products/**",
                                        "/OrderPlace/**"
                                )
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                ).userDetailsService(userDetailsService)
                .sessionManagement(
                        session ->session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(e -> e.authenticationEntryPoint((request, response, authException) -> {
                    System.out.println("Auth error: " + authException.getMessage());
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                }))
                .build();

//                        .logout(l->l
//                        .logoutUrl("/logout")
//                        .addLogoutHandler(customerLogoutHandler)
//                        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
//                ).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return  new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws  Exception{
        return configuration.getAuthenticationManager();
    }
}
