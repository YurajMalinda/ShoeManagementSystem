package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table
public class Inventory {
    @Id
    private String itemCode;
    private String itemDesc;
    @Column(columnDefinition = "LONGTEXT")
    private String itemPicture;
    private String category;
    private Integer size;
    private String supplierCode;
    private String supplierName;
    private Double unitPrice_sale;
    private Double unitPrice_buy;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
}
