package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Gender;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Employee {
    @Id
    private String employeeCode;
    private String employeeName;
    private String employeeProfilePic;
    private Gender gender;
    private String Status;
    private String Designation;
    private Role accessRole;
    private Date dateOfJoin;
    private String attachedBranch;
    private String addressLine01;
    private String addressLine02;
    private String addressLine03;
    private String addressLine04;
    private String addressLine05;
    private String contactNo;
    private String email;
    private String emergencyInform;
    private String emergencyContact;
}