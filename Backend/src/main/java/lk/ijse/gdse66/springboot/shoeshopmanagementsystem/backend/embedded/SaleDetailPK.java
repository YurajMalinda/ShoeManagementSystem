package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.embedded;
import jakarta.persistence.Column;
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
    private String order_no;
    private String item_code;
    private String size;
}
