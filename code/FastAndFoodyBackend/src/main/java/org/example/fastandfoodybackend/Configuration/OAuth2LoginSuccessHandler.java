package org.example.fastandfoodybackend.Configuration;


import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.fastandfoodybackend.Model.AdditionalEntities.UserRole;
import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Repository.PersonRepository;
import org.example.fastandfoodybackend.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private PersonRepository userRepository;

    private static final String FRONTEND_URL = "http://localhost:3000"; // Замените на свой URL
    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, java.io.IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        UserRole userRole = userRoleRepository.findByRole("ROLE_CLIENT");

        // Проверяем, есть ли пользователь в БД
        Person user = userRepository.findPersonByEmail(email)
                .orElseGet(() -> {
                    Person newUser = new Person();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setImage(picture);
                    newUser.setRole(userRole);
                    return userRepository.save(newUser);
                });

        // Формируем URL редиректа
        String redirectUrl = FRONTEND_URL + "/auth/callback?auth=true";

        // Делаем редирект на фронт
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}

