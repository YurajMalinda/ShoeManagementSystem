package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Sale;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.SaleRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.SaleService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {
    SaleRepo saleRepo;
    ModelMapper modelMapper;

    public SaleServiceImpl(SaleRepo saleRepo, ModelMapper modelMapper) {
        this.saleRepo = saleRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<SaleDTO> getAllSales() {
        return saleRepo.findAll().stream().map(sale -> modelMapper.map(sale, SaleDTO.class)).toList();
    }

    @Override
    public SaleDTO getSaleDetails(String orderNo) {
        if (!saleRepo.existsById(orderNo)){
            throw new NotFoundException("Order no: " + orderNo + " does not exist!");
        }
        return modelMapper.map(saleRepo.findById(orderNo), SaleDTO.class);    }

    @Override
    public SaleDTO saveSale(SaleDTO saleDTO) {
        if(saleRepo.existsById(saleDTO.getOrderNo())){
            throw new DuplicateRecordException("This Order "+saleDTO.getOrderNo()+" already exists!...");
        }
        return modelMapper.map(saleRepo.save(modelMapper.map(saleDTO, Sale.class)),SaleDTO.class);
    }

    @Override
    public void updateSale(SaleDTO saleDTO) {
        if (!saleRepo.existsById(saleDTO.getOrderNo())) {
            throw new NotFoundException("Update failed: Order no:- "+ saleDTO.getOrderNo() + " does not exist!");
        }
        saleRepo.save(modelMapper.map(saleDTO, Sale.class));
    }

    @Override
    public void deleteSale(String orderNo) {
        if (!saleRepo.existsById(orderNo)) {
            throw new NotFoundException("Delete failed; Order no:- "+ orderNo + " does not exist!");
        }
        saleRepo.deleteById(orderNo);
    }
}
