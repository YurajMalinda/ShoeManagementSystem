package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.api;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.auth.request.SignInRequest;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.auth.request.SignUpRequest;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserAPI {

    private final AuthenticationService authenticationService;

    @PostMapping("/signIn")
    public ResponseEntity<JwtAuthResponse> signIn(@RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }

    @PostMapping("/signUp")
    public ResponseEntity<JwtAuthResponse> signUp(@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }

    @GetMapping("/sendBirthDayWishes")
    public List<String> sendWishes(){
        return authenticationService.sendWishes();
    }
}
