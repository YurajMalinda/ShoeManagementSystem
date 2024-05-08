package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SaleDTO implements Serializable {
    private String itemCode;
    @Pattern(regexp = "^ORD-\\d{3}$", message = "Order no. is not valid!")
    private String orderNo;
    private String customerName;
    private String itemDesc;
    private Integer size;
    private Double unitPrice;
    private Integer itemQty;
    private Double totalPrice;
    private Timestamp purchaseDate;
    private String paymentMethod;
    private Double addedPoints;
    private String cashierName;
}
