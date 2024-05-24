package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InventoryDTO implements Serializable {
//    @Pattern(regexp = "^FSM-\\d{3}$", message = "Item code is not valid!")
    private String itemCode;
    @NotBlank(message = "Item description can not be null!")
    private String itemDesc;
    private String itemPicture;
    @NotBlank(message = "Category can not be null!")
    private String category;
    private Integer size_5;
    private Integer size_6;
    private Integer size_7;
    private Integer size_8;
    private Integer size_9;
    private Integer size_10;
    private Integer size_11;
    private String supplierCode;
    private String supplierName;
    private Double unitPriceSale;
    private Double unitPriceBuy;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
}
