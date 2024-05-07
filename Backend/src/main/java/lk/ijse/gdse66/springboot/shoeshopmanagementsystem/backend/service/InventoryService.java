package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.InventoryDTO;

import java.util.List;

public interface InventoryService {
    List<InventoryDTO> getAllInventory();
    InventoryDTO getInventoryDetails(String inventoryCode);
    InventoryDTO saveInventory(InventoryDTO inventoryDTO);
    void updateInventory(InventoryDTO inventoryDTO);
    void deleteInventory(String inventoryCode);
}
