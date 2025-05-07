package com.paf.server.configuration;



import com.paf.server.model.Token;
import com.paf.server.repository.TokenRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
public class CustomerLogoutHandler implements LogoutHandler {
    private final TokenRepo tokenRepo ;

    public CustomerLogoutHandler(TokenRepo tokenRepo) {
        this.tokenRepo = tokenRepo;
    }


    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        String token = authHeader.substring(7);
//        Token storeToken = tokenRepo.findByAccessToken(token).orElse(null);
        Token storeToken = tokenRepo.findByAccessToken(token).orElse(null);

//        if(storeToken != null) {
//           storeToken.setLoggedOut(true);
//           tokenRepo.save(storeToken);
//        }
    }
}
