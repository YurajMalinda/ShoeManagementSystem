package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.InventoryDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SupplierDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Inventory;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.InventoryRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.SupplierRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.InventoryService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    InventoryRepo inventoryRepo;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    SupplierRepo supplierRepo;

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

    @Override
    public List<InventoryDTO> searchItemByName(String name) {
        return inventoryRepo.findByItemDesc(name).stream().map(inventory -> modelMapper.map(inventory,InventoryDTO.class)).toList();
    }

    @Override
    public InventoryDTO searchItemById(String id) {
        if (!inventoryRepo.existsById(id)){
            throw new NotFoundException("Item Code does not exists!");
        }
        Inventory inventory = inventoryRepo.findByItemCode(id);
        //System.out.println(employee.getCode());
        return modelMapper.map(inventory,InventoryDTO.class);
    }

    @Override
    public List<SupplierDTO> loadSupplierCode() {
        return supplierRepo.findAll().stream().map(supplier -> modelMapper.map(supplier,SupplierDTO.class)).toList();
    }

    @Override
    public List<InventoryDTO> getAllItemsByPrice(double minPrice, double maxPrice) {
        return inventoryRepo.findByUnitPriceSaleBetween(minPrice, maxPrice).stream().map(inventory -> modelMapper.map(inventory,InventoryDTO.class)).toList();
    }

    @Override
    public List<InventoryDTO> getAllItemsByGender(String gender) {
        return inventoryRepo.findByCategoryContaining(gender).stream().map(inventory -> modelMapper.map(inventory,InventoryDTO.class)).toList();
    }
}
