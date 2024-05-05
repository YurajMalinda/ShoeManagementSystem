package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.CustomerDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Customer;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customers")
public class CustomerAPI {
    private final CustomerService customerService;

    public CustomerAPI(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDTO saveCustomer(@Valid @RequestBody CustomerDTO customerDTO) {
        return customerService.saveCustomer(customerDTO);
    }

    @GetMapping(value = "/{customerCode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CustomerDTO getCustomerDetails(@PathVariable("customerCode") String customerCode) {
        return customerService.getCustomerDetails(customerCode);
    }

    @PatchMapping(value = "/{customerCode}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCustomer(@PathVariable("customerCode") String customerCode,
                               @Valid @RequestBody CustomerDTO customerDTO){
        customerDTO.setCustomerCode(customerCode);
        customerService.updateCustomer(customerDTO);
    }

    @DeleteMapping(value = "/{customerCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable("customerCode") String customerCode) {
        customerService.deleteCustomer(customerCode);
    }

}
