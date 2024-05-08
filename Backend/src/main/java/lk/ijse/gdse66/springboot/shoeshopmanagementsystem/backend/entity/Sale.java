package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table
public class Sale {
    private String itemCode;
    @Id
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
