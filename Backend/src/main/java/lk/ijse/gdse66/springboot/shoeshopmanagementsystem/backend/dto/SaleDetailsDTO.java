package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class SaleDetailsDTO {
    private String orderNo;
    private String itemCode;
    private String itemName;
    private String size;
    private Double unitPrice;
    private Integer itemQty;
}
