package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.EmployeeDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Employee;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.EmployeeRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.EmployeeService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepo employeeRepo;
    @Autowired
    ModelMapper modelMapper;

    public EmployeeServiceImpl(EmployeeRepo employeeRepo, ModelMapper modelMapper) {
        this.employeeRepo = employeeRepo;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepo.findAll().stream().map(employee -> modelMapper.map(employee, EmployeeDTO.class)).toList();
    }

    @Override
    public EmployeeDTO getEmployeeDetails(String employeeCode) {
        if (!employeeRepo.existsById(employeeCode)){
            throw new NotFoundException("employee code: " + employeeCode + " does not exist!");
        }
        return modelMapper.map(employeeRepo.findById(employeeCode), EmployeeDTO.class);
    }

    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO EmployeeDTO) {
        if(employeeRepo.existsById(EmployeeDTO.getEmployeeCode())){
            throw new DuplicateRecordException("This employee "+EmployeeDTO.getEmployeeCode()+" already exists!...");
        }
        return modelMapper.map(employeeRepo.save(modelMapper.map(EmployeeDTO, Employee.class)),EmployeeDTO.class);
    }

    @Override
    public void updateEmployee(EmployeeDTO EmployeeDTO) {
        if (!employeeRepo.existsById(EmployeeDTO.getEmployeeCode())) {
            throw new NotFoundException("Update failed: employee code:- "+ EmployeeDTO.getEmployeeCode() + " does not exist!");
        }
        employeeRepo.save(modelMapper.map(EmployeeDTO, Employee.class));
    }

    @Override
    public void deleteEmployee(String employeeCode) {
        if (!employeeRepo.existsById(employeeCode)) {
            throw new NotFoundException("Delete failed; employee code:- "+ employeeCode + " does not exist!");
        }
        employeeRepo.deleteById(employeeCode); 
    }
}
