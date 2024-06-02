package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.UserDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.User;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.EmployeeRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.UserRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.UserService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final EmployeeRepo employeeRepo;
    private final ModelMapper mapper;

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepo.findByEmail(username)
                .orElseThrow(() -> new
                        UsernameNotFoundException(
                        "user not found"));
    }

    @Override
    public void save(UserDTO userDTO) {
        if (userRepo.existsById(userDTO.getEmail())){
            throw new DuplicateRecordException("User Email is already exists!");
        } else if (!employeeRepo.existsByEmail(userDTO.getEmail())) {
            throw new NotFoundException("No Employee can be found this email");
        } else {
            userRepo.save(mapper.map(userDTO, User.class));
        }    }
}
