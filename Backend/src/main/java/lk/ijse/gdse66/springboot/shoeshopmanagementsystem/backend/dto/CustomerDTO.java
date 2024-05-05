package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Gender;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Level;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CustomerDTO implements Serializable {
    @Pattern(regexp = "^C00-\\d{3}$", message = "Customer code is not valid!")
    private String customerCode;
    @NotBlank(message = "Name can not be null!")
    private String customerName;
    private Gender gender;
//    @NotBlank(message = "Join Date can not be null!")
    private Date joinDate;
    private Level level;
//    @NotBlank(message = "Total points can not be null!")
    private Integer totalPoints;
//    @NotBlank(message = "DOB can not be null!")
    private Date dOB;
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
//    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$", message = "Email is not valid!.")
    private String email;
//    @NotBlank(message = "Recent purchase date can not be null!.")
    private Timestamp recentPurchase;
}
