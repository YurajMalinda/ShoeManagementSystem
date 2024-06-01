package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.embedded.SaleDetailPK;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.SaleDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleDetailsRepo extends JpaRepository<SaleDetail, SaleDetailPK> {
    @Query(value = "SELECT * FROM sale_detail WHERE order_no = :orderId", nativeQuery = true)
    List<SaleDetail> findSaleDetailByOrderNo(String orderId);
}
