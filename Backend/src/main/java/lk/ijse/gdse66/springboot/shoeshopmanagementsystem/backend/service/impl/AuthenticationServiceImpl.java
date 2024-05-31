//package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;
//
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.auth.request.SignInRequest;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.auth.request.SignUpRequest;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.auth.response.JwtAuthResponse;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.UserDTO;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.User;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.UserRepo;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.AuthenticationService;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.JwtService;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.IncorrectPasswordException;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Role;
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.ModelMapper;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class AuthenticationServiceImpl implements AuthenticationService {
//    private final PasswordEncoder passwordEncoder;
//    private final UserRepo userRepo;
//    private final ModelMapper mapper;
//    private final JwtService jwtService;
//    private final AuthenticationManager authenticationManager;
//
//    @Override
//    public JwtAuthResponse signIn(SignInRequest signInRequest) {
//        if (!userRepo.existsById(signInRequest.getEmail())){
//            throw new NotFoundException("User email not found");
//        }
//
//        User userByEmail = userRepo.getAllByEmail(signInRequest.getEmail());
//        if (!passwordEncoder.matches(signInRequest.getPassword(), userByEmail.getPassword())){
//            throw new IncorrectPasswordException("Incorrect password");
//        }
//
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
//        User user = userRepo.findById(signInRequest.getEmail())
//                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
//        String generatedToken = jwtService.generateToken(user);
//        return JwtAuthResponse.builder()
//                .token(generatedToken)
//                .role(user.getRole())
//                .name(user.getName())
//                .build();
//    }
//
//    @Override
//    public JwtAuthResponse signUp(SignUpRequest signUpRequest) {
//        UserDTO userDTO = UserDTO.builder()
//                .name(signUpRequest.getName())
//                .email(signUpRequest.getEmail())
//                .password(passwordEncoder.encode(signUpRequest.getPassword()))
//                .role(Role.valueOf(signUpRequest.getRole()))
//                .build();
//        User savedUser = userRepo.save(mapper.map(userDTO, User.class));
//        String generatedToken = jwtService.generateToken(savedUser);
//        return JwtAuthResponse.builder().token(generatedToken).build();
//    }
//}
