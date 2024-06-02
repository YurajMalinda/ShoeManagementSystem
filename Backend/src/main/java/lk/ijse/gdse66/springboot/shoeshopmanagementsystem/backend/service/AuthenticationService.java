package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service;


import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.auth.request.SignInRequest;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.auth.request.SignUpRequest;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.auth.response.JwtAuthResponse;

import java.util.List;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);

    List<String> sendWishes();
}
