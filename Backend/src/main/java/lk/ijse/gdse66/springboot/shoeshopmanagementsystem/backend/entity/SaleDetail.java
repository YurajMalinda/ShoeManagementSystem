package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.embedded.SaleDetailPK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table
public class SaleDetail {
    @EmbeddedId
    private SaleDetailPK saleDetailPK;

    private String itemDesc;
    private Double unitPrice;
    private Integer itemQty;

    @ManyToOne
    @JoinColumn(name = "orderNo",
            referencedColumnName = "orderNo",insertable = false,
            updatable = false)
    private Sale orderNo;

    @ManyToOne
    @JoinColumn(name = "itemCode",
            referencedColumnName = "itemCode",
            insertable = false,
            updatable = false)
    private Inventory itemCode;
}
