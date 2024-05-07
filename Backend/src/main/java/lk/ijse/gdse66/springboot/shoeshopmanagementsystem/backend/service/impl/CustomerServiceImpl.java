package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.CustomerDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Customer;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.CustomerRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.CustomerService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    CustomerRepo customerRepo;
    ModelMapper modelMapper;

    public CustomerServiceImpl(CustomerRepo customerRepo, ModelMapper modelMapper) {
        this.customerRepo = customerRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepo.findAll().stream().map(customer -> modelMapper.map(customer, CustomerDTO.class)).toList();
    }

    @Override
    public CustomerDTO getCustomerDetails(String customerCode) {
        if (!customerRepo.existsById(customerCode)){
            throw new NotFoundException("Customer code: " + customerCode + " does not exist!");
        }
        return modelMapper.map(customerRepo.findById(customerCode), CustomerDTO.class);
    }

    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        if(customerRepo.existsById(customerDTO.getCustomerCode())){
            throw new DuplicateRecordException("This Customer "+customerDTO.getCustomerCode()+" already exists!...");
        }
        return modelMapper.map(customerRepo.save(modelMapper.map(customerDTO, Customer.class)),CustomerDTO.class);
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
        if (!customerRepo.existsById(customerDTO.getCustomerCode())) {
            throw new NotFoundException("Update failed: Customer code:- "+ customerDTO.getCustomerCode() + " does not exist!");
        }
        customerRepo.save(modelMapper.map(customerDTO, Customer.class));
    }

    @Override
    public void deleteCustomer(String customerCode) {
        if (!customerRepo.existsById(customerCode)) {
            throw new NotFoundException("Delete failed; Customer code:- "+ customerCode + " does not exist!");
        }
        customerRepo.deleteById(customerCode);
    }
}
