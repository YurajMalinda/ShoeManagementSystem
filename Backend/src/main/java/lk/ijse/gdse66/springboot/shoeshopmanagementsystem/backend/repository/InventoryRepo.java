package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InventoryRepo extends JpaRepository<Inventory, String> {
    Inventory findTopByOrderByItemCodeDesc();

    List<Inventory> findByItemDesc(String name);

    Inventory findByItemCode(String id);

    List<Inventory> findByUnitPriceSaleBetween(double minPrice, double maxPrice);

    List<Inventory> findByCategoryContaining(String value);

    @Query("SELECT i.itemCode FROM Inventory i")
    List<String> findAllItemCodes();

    @Transactional
    @Modifying
    @Query(value = "UPDATE Inventory " +
            "SET " +
            "status = :status, " +
            "size_5 = CASE WHEN :size = 'size_5' THEN :qty ELSE size_5 END, " +
            "size_6 = CASE WHEN :size = 'size_6' THEN :qty ELSE size_6 END, " +
            "size_7 = CASE WHEN :size = 'size_7' THEN :qty ELSE size_7 END, " +
            "size_8 = CASE WHEN :size = 'size_8' THEN :qty ELSE size_8 END, " +
            "size_9 = CASE WHEN :size = 'size_9' THEN :qty ELSE size_9 END, " +
            "size_10 = CASE WHEN :size = 'size_10' THEN :qty ELSE size_10 END, " +
            "size_11 = CASE WHEN :size = 'size_11' THEN :qty ELSE size_11 END " +
            "WHERE item_code = :itemCode", nativeQuery = true)
    void updateByItemCodeAndSize(int qty, String status, String itemCode, String size);

    @Query(value = "SELECT CASE " +
            "   WHEN :size = 'size_5' THEN i.size_5 " +
            "   WHEN :size = 'size_6' THEN i.size_6 " +
            "   WHEN :size = 'size_7' THEN i.size_7 " +
            "   WHEN :size = 'size_8' THEN i.size_8 " +
            "   WHEN :size = 'size_9' THEN i.size_9 " +
            "   WHEN :size = 'size_10' THEN i.size_10 " +
            "   WHEN :size = 'size_11' THEN i.size_11 " +
            "   ELSE 0 " +
            "END " +
            "FROM Inventory i " +
            "WHERE i.item_code = :itemCode", nativeQuery = true)
    Integer findQtyByItemCodeAndSize(String itemCode, String size);

    List<Inventory> findByItemCodeStartingWith(String prefix);
}
