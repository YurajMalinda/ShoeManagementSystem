package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    @NotBlank(message = "Email can not be null!")
    private String Email;
    @NotBlank(message = "Password can not be null!")
    private String Password;
    private Role role;
}
