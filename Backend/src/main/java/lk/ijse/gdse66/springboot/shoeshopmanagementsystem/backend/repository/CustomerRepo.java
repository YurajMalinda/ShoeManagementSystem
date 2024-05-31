package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer,String> {
    Customer findTopByOrderByCustomerCodeDesc();
    List<Customer> findByCustomerName(String name);
    Customer findByCustomerCode(String code);

    /*custom JPQL query*/
    @Query("SELECT c.customerCode FROM Customer c")
    List<String> findAllCustomerCodes();
}
