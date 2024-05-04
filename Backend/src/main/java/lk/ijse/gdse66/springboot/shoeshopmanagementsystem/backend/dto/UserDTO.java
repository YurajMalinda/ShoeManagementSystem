package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;

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
    private String Email;
    private String Password;
    private Role role;
}
