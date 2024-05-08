package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SupplierDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Supplier;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.SupplierRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.SupplierService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

    SupplierRepo supplierRepo;
    ModelMapper modelMapper;

    public SupplierServiceImpl(SupplierRepo supplierRepo, ModelMapper modelMapper) {
        this.supplierRepo = supplierRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return supplierRepo.findAll().stream().map(supplier -> modelMapper.map(supplier, SupplierDTO.class)).toList();
    }

    @Override
    public SupplierDTO getSupplierDetails(String supplierCode) {
        if (!supplierRepo.existsById(supplierCode)){
            throw new NotFoundException("Supplier code: " + supplierCode + " does not exist!");
        }
        return modelMapper.map(supplierRepo.findById(supplierCode), SupplierDTO.class);
    }

    @Override
    public SupplierDTO saveSupplier(SupplierDTO supplierDTO) {
        if(supplierRepo.existsById(supplierDTO.getSupplierCode())){
            throw new DuplicateRecordException("This Supplier "+supplierDTO.getSupplierCode()+" already exists!...");
        }
        return modelMapper.map(supplierRepo.save(modelMapper.map(supplierDTO, Supplier.class)),SupplierDTO.class);
    }

    @Override
    public void updateSupplier(SupplierDTO supplierDTO) {
        if (!supplierRepo.existsById(supplierDTO.getSupplierCode())) {
            throw new NotFoundException("Update failed: Supplier code:- "+ supplierDTO.getSupplierCode() + " does not exist!");
        }
        supplierRepo.save(modelMapper.map(supplierDTO, Supplier.class));
    }

    @Override
    public void deleteSupplier(String supplierCode) {
        if (!supplierRepo.existsById(supplierCode)) {
            throw new NotFoundException("Delete failed; Supplier code:- "+ supplierCode + " does not exist!");
        }
        supplierRepo.deleteById(supplierCode);
    }
}
