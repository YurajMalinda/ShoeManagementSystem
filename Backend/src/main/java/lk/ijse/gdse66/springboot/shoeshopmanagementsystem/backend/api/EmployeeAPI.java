package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.EmployeeDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.EmployeeService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Gender;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin
public class EmployeeAPI {
    private final EmployeeService employeeService;

    public EmployeeAPI(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeDTO saveEmployee(@Valid @RequestParam("employeeCode") String code,
                                    @RequestParam("employeeName") String name,
                                    @RequestParam("employeeProfilePic") MultipartFile proPic,
                                    @RequestParam("gender") Gender gender,
                                    @RequestParam("status") String civilStatus,
                                    @RequestParam("designation") String designation,
                                    @RequestParam("accessRole") Role role,
                                    @RequestParam("dob") Date dob,
                                    @RequestParam("dateOfJoin") Date joinDate,
                                    @RequestParam("attachedBranch") String branch,
                                    @RequestParam("addressLine01") String addressLine1,
                                    @RequestParam("addressLine02") String addressLine2,
                                    @RequestParam("addressLine03") String addressLine3,
                                    @RequestParam("addressLine04") String addressLine4,
                                    @RequestParam("addressLine05") String addressLine5,
                                    @RequestParam("contactNo") String contact,
                                    @RequestParam("email") String email,
                                    @RequestParam("emergencyInform") String emergencyInform,
                                    @RequestParam("emergencyContact") String emergencyContact) throws ParseException, IOException {

//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//        Date newDob = dateFormat.parse(dob);
//        Date newJoinDate = dateFormat.parse(joinDate);
        String image = Base64.getEncoder().encodeToString(proPic.getBytes());

        EmployeeDTO employeeDTO = new EmployeeDTO(code, name, image, gender, civilStatus, designation, role, dob, joinDate, branch, addressLine1, addressLine2, addressLine3, addressLine4, addressLine5, contact, email, emergencyInform, emergencyContact);

        //System.out.println(employeeDTO);
        return employeeService.saveEmployee(employeeDTO);
    }

    @GetMapping(value = "/{employeeCode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeDTO getEmployeeDetails(@PathVariable("employeeCode") String employeeCode) {
        return employeeService.getEmployeeDetails(employeeCode);
    }

    @PatchMapping(value = "/{employeeCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateEmployee(@PathVariable("employeeCode") String employeeCode,
                               @Valid @RequestParam("employeeCode") String code,
                               @RequestParam("employeeName") String name,
                               @RequestParam("employeeProfilePic") MultipartFile proPic,
                               @RequestParam("gender") Gender gender,
                               @RequestParam("status") String civilStatus,
                               @RequestParam("designation") String designation,
                               @RequestParam("accessRole") Role role,
                               @RequestParam("dob") Date dob,
                               @RequestParam("dateOfJoin") Date joinDate,
                               @RequestParam("attachedBranch") String branch,
                               @RequestParam("addressLine01") String addressLine1,
                               @RequestParam("addressLine02") String addressLine2,
                               @RequestParam("addressLine03") String addressLine3,
                               @RequestParam("addressLine04") String addressLine4,
                               @RequestParam("addressLine05") String addressLine5,
                               @RequestParam("contactNo") String contact,
                               @RequestParam("email") String email,
                               @RequestParam("emergencyInform") String emergencyInform,
                               @RequestParam("emergencyContact") String emergencyContact) throws ParseException, IOException{

        String image = Base64.getEncoder().encodeToString(proPic.getBytes());

        EmployeeDTO employeeDTO = new EmployeeDTO(code, name, image, gender, civilStatus, designation, role, dob, joinDate, branch, addressLine1, addressLine2, addressLine3, addressLine4, addressLine5, contact, email, emergencyInform, emergencyContact);

        employeeDTO.setEmployeeCode(employeeCode);
        employeeService.updateEmployee(employeeDTO);
    }

    @DeleteMapping(value = "/{employeeCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable("employeeCode") String employeeCode) {
        employeeService.deleteEmployee(employeeCode);
    }

}
