package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.CustomerDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.InventoryDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/sales")
@CrossOrigin
public class SaleAPI {
    private final SaleService saleService;

    public SaleAPI(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void placeOrder(@RequestBody SaleDTO saleDTO) {
        saleService.placeOrder(saleDTO);
    }

    @GetMapping(value = "/searchByItemCode/{itemCode}")
    public InventoryDTO searchByItemCode(@PathVariable("itemCode") String itemCode) {
        return saleService.searchByItemCode(itemCode);
    }

    @GetMapping("/loadItemCodes")
    public List<String> loadAllItemCodes() {
        return saleService.getAllItemCodes();
    }

    @GetMapping(value = "/searchByCustomerCode/{customerCode}")
    public CustomerDTO searchByCustomerCode(@PathVariable("customerCode") String customerCode) {
        return saleService.searchByCustomerCode(customerCode);
    }

    @GetMapping("/loadCustomerCodes")
    public List<String> loadAllCustomerCodes() {
        return saleService.getAllCustomerCodes();
    }

    @GetMapping("/nextOrderId")
    public String nextOrderId(){
        return saleService.generateNextOrderId();
    }
}
