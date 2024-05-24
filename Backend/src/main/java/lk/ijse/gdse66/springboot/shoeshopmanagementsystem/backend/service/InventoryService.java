package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.InventoryDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SupplierDTO;

import java.util.List;

public interface InventoryService {
    List<InventoryDTO> getAllInventory();
    InventoryDTO getInventoryDetails(String inventoryCode);
    InventoryDTO saveInventory(InventoryDTO inventoryDTO);
    void updateInventory(InventoryDTO inventoryDTO);
    void deleteInventory(String inventoryCode);
    List<InventoryDTO> searchItemByName(String name);
    InventoryDTO searchItemById(String id);
    List<SupplierDTO> loadSupplierCode();
    List<InventoryDTO> getAllItemsByPrice(double minPrice, double maxPrice);
    List<InventoryDTO> getAllItemsByGender(String gender);
    String generateNextId(String prefix);
}
