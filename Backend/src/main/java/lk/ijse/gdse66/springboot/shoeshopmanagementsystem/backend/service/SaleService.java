package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDTO;

import java.util.List;

public interface SaleService {
    List<SaleDTO> getAllSales();
    SaleDTO getSaleDetails(String orderNo);
    SaleDTO saveSale(SaleDTO saleDTO);
    void updateSale(SaleDTO saleDTO);
    void deleteSale(String orderNo);
}
