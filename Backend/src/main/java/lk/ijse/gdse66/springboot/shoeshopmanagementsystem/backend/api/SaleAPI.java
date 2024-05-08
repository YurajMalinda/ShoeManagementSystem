package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/sales")
public class SaleAPI {
    private final SaleService saleService;

    public SaleAPI(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SaleDTO> getAllSales() {
        return saleService.getAllSales();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public SaleDTO saveSale(@Valid @RequestBody SaleDTO saleDTO) {
        return saleService.saveSale(saleDTO);
    }

    @GetMapping(value = "/{orderNo}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SaleDTO getSaleDetails(@PathVariable("orderNo") String orderNo) {
        return saleService.getSaleDetails(orderNo);
    }

    @PatchMapping(value = "/{orderNo}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateSale(@PathVariable("orderNo") String orderNo,
                               @Valid @RequestBody SaleDTO saleDTO){
        saleDTO.setOrderNo(orderNo);
        saleService.updateSale(saleDTO);
    }

    @DeleteMapping(value = "/{orderNo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSale(@PathVariable("orderNo") String orderNo) {
        saleService.deleteSale(orderNo);
    }
}
