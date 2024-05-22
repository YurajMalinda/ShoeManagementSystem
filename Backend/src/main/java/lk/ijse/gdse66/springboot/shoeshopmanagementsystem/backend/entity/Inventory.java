package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =  "itemCode")
    private List<SaleDetail> saleDetails = new ArrayList<>();
}
