package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.InventoryDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Inventory;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.InventoryRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.InventoryService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {
    InventoryRepo inventoryRepo;
    ModelMapper modelMapper;

    public InventoryServiceImpl(InventoryRepo inventoryRepo, ModelMapper modelMapper) {
        this.inventoryRepo = inventoryRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return inventoryRepo.findAll().stream().map(inventory -> modelMapper.map(inventory, InventoryDTO.class)).toList();
    }

    @Override
    public InventoryDTO getInventoryDetails(String inventoryCode) {
        if (!inventoryRepo.existsById(inventoryCode)){
            throw new NotFoundException("Inventory code: " + inventoryCode + " does not exist!");
        }
        return modelMapper.map(inventoryRepo.findById(inventoryCode), InventoryDTO.class);
    }

    @Override
    public InventoryDTO saveInventory(InventoryDTO inventoryDTO) {
        if(inventoryRepo.existsById(inventoryDTO.getItemCode())){
            throw new DuplicateRecordException("This item "+inventoryDTO.getItemCode()+" already exists!...");
        }
        return modelMapper.map(inventoryRepo.save(modelMapper.map(inventoryDTO, Inventory.class)),InventoryDTO.class);
    }

    @Override
    public void updateInventory(InventoryDTO inventoryDTO) {
        if (!inventoryRepo.existsById(inventoryDTO.getItemCode())) {
            throw new NotFoundException("Update failed: Item code:- "+ inventoryDTO.getItemCode() + " does not exist!");
        }
        inventoryRepo.save(modelMapper.map(inventoryDTO, Inventory.class));
    }

    @Override
    public void deleteInventory(String inventoryCode) {
        if (!inventoryRepo.existsById(inventoryCode)) {
            throw new NotFoundException("Delete failed; Item code:- "+ inventoryCode + " does not exist!");
        }
        inventoryRepo.deleteById(inventoryCode);
    }
}
