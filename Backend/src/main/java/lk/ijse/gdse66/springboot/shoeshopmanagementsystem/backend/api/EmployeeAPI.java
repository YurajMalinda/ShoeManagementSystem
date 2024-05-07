package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.EmployeeDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeAPI {
    private final EmployeeService employeeService;

    public EmployeeAPI(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeDTO saveEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        return employeeService.saveEmployee(employeeDTO);
    }

    @GetMapping(value = "/{employeeCode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public EmployeeDTO getEmployeeDetails(@PathVariable("employeeCode") String employeeCode) {
        return employeeService.getEmployeeDetails(employeeCode);
    }

    @PatchMapping(value = "/{employeeCode}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateEmployee(@PathVariable("employeeCode") String employeeCode,
                               @Valid @RequestBody EmployeeDTO employeeDTO){
        employeeDTO.setEmployeeCode(employeeCode);
        employeeService.updateEmployee(employeeDTO);
    }

    @DeleteMapping(value = "/{employeeCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable("employeeCode") String employeeCode) {
        employeeService.deleteEmployee(employeeCode);
    }

}
