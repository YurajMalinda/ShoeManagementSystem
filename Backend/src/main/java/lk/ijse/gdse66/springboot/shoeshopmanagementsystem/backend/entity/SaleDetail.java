package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.embedded.SaleDetailPK;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "sale_detail")
public class SaleDetail {

    @EmbeddedId
    private SaleDetailPK saleDetailPK;

    @Column(name = "itemDesc")
    private String itemDesc;

    @Column(name = "unitPrice")
    private Double unitPrice;

    @Column(name = "itemQty")
    private Integer itemQty;

    @ManyToOne
    @JoinColumn(name = "order_no",  insertable = false, updatable = false)
    private Sale orderNo;

    @ManyToOne
    @JoinColumn(name = "item_code", insertable = false, updatable = false)
    private Inventory itemCode;

    // Getters and setters
}


