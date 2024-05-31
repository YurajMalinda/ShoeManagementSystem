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
    private String orderNo;
    private Double totalPrice;
    private Timestamp purchaseDate;
    private String paymentMethod;
    private Integer addedPoints;
    private String cashierName;
    private String customerCode;
    private String customerName;
    private List<SaleDetailsDTO> saleDetailsDTOList;
}
