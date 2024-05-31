//package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;
//
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.UserDTO;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.User;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.UserRepo;
//import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.UserService;
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.ModelMapper;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class UserServiceImpl implements UserService {
//    private final UserRepo userRepo;
//    private final ModelMapper mapper;
//
//    @Override
//    public UserDetailsService userDetailService() {
//        return username -> userRepo.findById(username)
//                .orElseThrow(() -> new
//                        UsernameNotFoundException(
//                        "user not found"));
//    }
//
//    @Override
//    public void saveUser(UserDTO userDTO) {
//        userRepo.save(mapper.map(userDTO, User.class));
//    }
//}
