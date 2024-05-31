package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomDTO {
    private String orderNo;
    private String itemCode;
    private String size;
    private Integer qty;
    private Double unitTotalPrice;
    private Integer arrayLength;
}
