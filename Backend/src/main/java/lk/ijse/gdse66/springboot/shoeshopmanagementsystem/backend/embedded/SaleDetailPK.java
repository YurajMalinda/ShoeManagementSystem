package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.embedded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaleDetailPK implements Serializable {

    private String orderNo;
    private String itemCode;
    private String size;
}
