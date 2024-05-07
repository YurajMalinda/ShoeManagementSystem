package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepo extends JpaRepository<Inventory, String> {
}
