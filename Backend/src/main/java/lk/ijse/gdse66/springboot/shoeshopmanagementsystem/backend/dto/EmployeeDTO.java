package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Gender;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDTO implements Serializable {
    @Pattern(regexp = "^E00-\\d{3}$", message = "Employee code is not valid!")
    private String employeeCode;
    @NotBlank(message = "Name can not be null!")
    private String employeeName;
    private String employeeProfilePic;
    private Gender gender;
    @NotBlank(message = "status can not be null!")
    private String status;
    @NotBlank(message = "designation can not be null!")
    private String designation;
    private Role accessRole;
    private Date dOb;
    private Date dateOfJoin;
    @NotBlank(message = "status can not be null!")
    private String attachedBranch;
    @NotBlank(message = "Building number or name can not be null!")
    private String addressLine01;
    @NotBlank(message = "Lane can not be null!")
    private String addressLine02;
    @NotBlank(message = "Main city can not be null!")
    private String addressLine03;
    @NotBlank(message = "Main state can not be null!")
    private String addressLine04;
    @NotBlank(message = "Postal code can not be null!")
    private String addressLine05;
    @Pattern(regexp = "^\\d{10}$", message = "Mobile number can not be more or lower than 10 digits!")
    private String contactNo;
    private String email;
    @NotBlank(message = "Emergency person name code can not be null!")
    private String emergencyInform;
    @Pattern(regexp = "^\\d{10}$", message = "Emergency contact number can not be more or lower than 10 digits!")
    private String emergencyContact;
}
