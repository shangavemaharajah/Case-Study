package com.paf.server.filter;


import com.paf.server.service.JwtService;
import com.paf.server.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;


    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        System.out.println("AuthHeader: " + authHeader);

        if(authHeader == null || !authHeader.startsWith("Bearer")) {
            System.out.println("No token found in Authenticated header");
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        System.out.println("Filter page token : "+token);

        String username = jwtService.extractUsername(token);
        System.out.println("Username in auth filtering: " + username);


        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            System.out.println("User Details: " + userDetails);
            System.out.println("Is token valid: " + jwtService.isValid(token, userDetails));

            if (jwtService.isValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
