package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.InventoryDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryAPI {
    private final InventoryService inventoryService;
    
    public InventoryAPI(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<InventoryDTO> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public InventoryDTO saveCustomer(@Valid @RequestBody InventoryDTO inventoryDTO) {
        return inventoryService.saveInventory(inventoryDTO);
    }

    @GetMapping(value = "/{itemCode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public InventoryDTO getInventoryDetails(@PathVariable("itemCode") String itemCode) {
        return inventoryService.getInventoryDetails(itemCode);
    }

    @PatchMapping(value = "/{itemCode}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCustomer(@PathVariable("itemCode") String itemCode,
                               @Valid @RequestBody InventoryDTO inventoryDTO){
        inventoryDTO.setItemCode(itemCode);
        inventoryService.updateInventory(inventoryDTO);
    }

    @DeleteMapping(value = "/{itemCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable("itemCode") String itemCode) {
        inventoryService.deleteInventory(itemCode);
    }
}
