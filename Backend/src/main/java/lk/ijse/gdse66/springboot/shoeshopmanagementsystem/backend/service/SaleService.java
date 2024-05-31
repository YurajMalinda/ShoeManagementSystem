package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.CustomerDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.InventoryDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDTO;

import java.util.List;

public interface SaleService {
    List<String> getAllItemCodes();
    InventoryDTO searchByItemCode(String itemCode);
    void placeOrder(SaleDTO saleDTO);
    List<String> getAllCustomerCodes();
    CustomerDTO searchByCustomerCode(String customerCode);
    String generateNextOrderId();
}
