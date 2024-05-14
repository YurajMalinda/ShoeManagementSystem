package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierDTO implements Serializable {
    @Pattern(regexp = "^S00-\\d{3}$", message = "Supplier code is not valid!")
    private String supplierCode;
    @NotBlank(message = "Name can not be null!")
    private String supplierName;
    private Category category;
    @NotBlank(message = "Building number or name can not be null!")
    private String addressLine01;
    @NotBlank(message = "Lane can not be null!")
    private String addressLine02;
    @NotBlank(message = "Main city can not be null!")
    private String addressLine03;
    @NotBlank(message = "Main state can not be null!")
    private String addressLine04;
    @NotBlank(message = "Postal code can not be null!")
    private String addressLine05;
    @NotBlank(message = "Origin country can not be null!")
    private String addressLine06;
    @Pattern(regexp = "^\\d{10}$", message = "Mobile number can not be more or lower than 10 digits!")
    private String contactNo1;
    @Pattern(regexp = "^\\d{10}$", message = "Landline number can not be more or lower than 10 digits!")
    private String contactNo2;
    @NotBlank(message = "Origin country can not be null!")
    private String email;
}
