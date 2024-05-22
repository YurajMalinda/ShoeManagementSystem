package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SaleDTO implements Serializable {
    @Pattern(regexp = "^ORD-\\d{3}$", message = "Order no. is not valid!")
    private String orderNo;
    private Double totalPrice;
    private Timestamp purchaseDate;
    private String paymentMethod;
    private Double addedPoints;
    private String cashierName;
    private Customer customerCode;
    private String customerName;
    private List<SaleDetailsDTO> saleDetailsDTOList;
}
