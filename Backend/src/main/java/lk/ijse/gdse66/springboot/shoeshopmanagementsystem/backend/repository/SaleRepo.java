package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleRepo extends JpaRepository<Sale, String> {
    Sale findTopByOrderByOrderNoDesc();

    @Query(value = "SELECT * FROM sale WHERE purchase_date >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 3 DAY)", nativeQuery = true)
    List<Sale> getAllRefundOrders();

    @Query(value = "SELECT * FROM sale WHERE order_no =:orderNo", nativeQuery = true)
    Sale findByOrderNo(String orderNo);

    Sale findSaleByOrderNo(String orderNo);
}
