package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO getEmployeeDetails(String employeeCode);
    EmployeeDTO saveEmployee(EmployeeDTO EmployeeDTO);
    void updateEmployee(EmployeeDTO EmployeeDTO);
    void deleteEmployee(String employeeCode);
}
