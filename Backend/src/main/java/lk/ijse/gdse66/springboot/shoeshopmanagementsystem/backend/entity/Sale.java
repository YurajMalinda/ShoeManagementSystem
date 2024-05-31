package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table
public class Sale {
    @Id
    private String orderNo;
    private Double totalPrice;
    private Timestamp purchaseDate;
    private String paymentMethod;
    private Integer addedPoints;
    private String cashierName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customerCode", referencedColumnName = "customerCode")
    private Customer customerCode;
    private String customerName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =  "orderNo")
    private List<SaleDetail> saleDetails = new ArrayList<>();
}
