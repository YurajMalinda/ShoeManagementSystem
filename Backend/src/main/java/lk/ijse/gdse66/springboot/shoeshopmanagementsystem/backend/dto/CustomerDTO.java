package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;


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
    private String customerCode;
    private String customerName;
    private Gender gender;
    private Date joinDate;
    private Level level;
    private Integer totalPoints;
    private Date dOB;
    private String addressLine01;
    private String addressLine02;
    private String addressLine03;
    private String addressLine04;
    private String addressLine05;
    private String contactNo;
    private String email;
    private Timestamp recentPurchase;
}
