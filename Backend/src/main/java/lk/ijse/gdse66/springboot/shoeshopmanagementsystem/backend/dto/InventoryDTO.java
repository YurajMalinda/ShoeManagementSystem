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
    @Pattern(regexp = "^I00-\\d{3}$", message = "Item code is not valid!")
    private String itemCode;
    @NotBlank(message = "Item description can not be null!")
    private String itemDesc;
    private String itemPicture;
    @NotBlank(message = "Category can not be null!")
    private String category;
    @NotBlank(message = "Size can not be null!")
    private Integer size;
    private String supplierCode;
    private String supplierName;
    @NotBlank(message = "Sale price can not be null!")
    private Double unitPrice_sale;
    @NotBlank(message = "Buy price can not be null!")
    private Double unitPrice_buy;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
}
