package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SupplierDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.SupplierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier")
public class SupplierAPI {
    private final SupplierService supplierService;

    public SupplierAPI(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SupplierDTO> getAllCustomers() {
        return supplierService.getAllSuppliers();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public SupplierDTO saveCustomer(@Valid @RequestBody SupplierDTO supplierDTO) {
        return supplierService.saveSupplier(supplierDTO);
    }

    @GetMapping(value = "/{supplierCode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SupplierDTO getCustomerDetails(@PathVariable("supplierCode") String supplierCode) {
        return supplierService.getSupplierDetails(supplierCode);
    }

    @PatchMapping(value = "/{supplierCode}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCustomer(@PathVariable("supplierCode") String supplierCode,
                               @Valid @RequestBody SupplierDTO supplierDTO){
        supplierDTO.setSupplierCode(supplierCode);
        supplierService.updateSupplier(supplierDTO);
    }

    @DeleteMapping(value = "/{supplierCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable("supplierCode") String supplierCode) {
        supplierService.deleteSupplier(supplierCode);
    }

    @GetMapping("/searchByName")
    public List<SupplierDTO> searchByName(@PathVariable("supplierName") String supplierName){
        return supplierService.searchSupplier(supplierName);
    }

    @GetMapping("/searchById")
    public SupplierDTO searchByID(@PathVariable("supplierCode") String supplierCode){
        return supplierService.searchSupplierById(supplierCode);
    }

    @GetMapping("/nextId")
    public String nextId(){
        return supplierService.generateNextId();
    }
}
