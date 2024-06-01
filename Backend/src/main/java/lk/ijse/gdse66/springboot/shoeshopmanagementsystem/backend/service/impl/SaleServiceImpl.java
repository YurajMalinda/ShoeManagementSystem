package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.CustomerDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.InventoryDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDetailsDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.embedded.SaleDetailPK;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Customer;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Inventory;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Sale;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.SaleDetail;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.CustomerRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.InventoryRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.SaleDetailsRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.SaleRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.SaleService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Level;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional

public class SaleServiceImpl implements SaleService {
    @Autowired
    SaleRepo saleRepo;
    @Autowired
    SaleDetailsRepo saleDetailsRepo;
    @Autowired
    CustomerRepo customerRepo;
    @Autowired
    InventoryRepo inventoryRepo;
    @Autowired
    ModelMapper modelMapper;

@Override
public void placeOrder(SaleDTO saleDTO) {
    Sale sale = modelMapper.map(saleDTO, Sale.class);

    // Update customer
    Customer customer = customerRepo.findByCustomerCode(saleDTO.getCustomerCode());
    sale.setCustomer_code(customer);

    Integer currentPoints = customer.getTotalPoints();
    if (currentPoints == null) {
        currentPoints = 0;
    }

    Integer addedPoints = saleDTO.getAddedPoints();
    if (addedPoints == null) {
        addedPoints = 0;
    }

    int newPoints = currentPoints + addedPoints;
    Level loyaltyLevel = null;
    if (newPoints < 10) {
        loyaltyLevel = Level.NEW;
    } else if (newPoints >= 10 && newPoints < 30) {
        loyaltyLevel = Level.BRONZE;
    } else if (newPoints >= 30 && newPoints < 100) {
        loyaltyLevel = Level.SILVER;
    } else if (newPoints >= 100) {
        loyaltyLevel = Level.GOLD;
    }
    customer.setLevel(loyaltyLevel);
    customer.setTotalPoints(newPoints);

    customer.setRecentPurchase(saleDTO.getPurchaseDate());
    customerRepo.save(customer);

    System.out.println("SaleDetails" + sale.getSaleDetails());
    sale.setSaleDetails(null);
    System.out.println("SaleDetails" + sale.getSaleDetails());
    saleRepo.save(sale);

    // Update inventory and Order details

    for (SaleDetailsDTO saleDetailsDTO : saleDTO.getSaleDetailsDTOList()) {
        System.out.println("for loop");

        SaleDetailPK saleDetailPK = new SaleDetailPK(sale.getOrderNo(), saleDetailsDTO.getItemCode(), saleDetailsDTO.getSize());
        SaleDetail saleDetail = new SaleDetail();
        saleDetail.setSaleDetailPK(saleDetailPK);
        saleDetail.setItemDesc(saleDetailsDTO.getItemName());
        saleDetail.setUnitPrice(saleDetailsDTO.getUnitPrice());
        saleDetail.setItemQty(saleDetailsDTO.getItemQty());
        saleDetail.setOrderNo(sale);

        Inventory inventory = inventoryRepo.findById(saleDetailsDTO.getItemCode()).orElseThrow(() -> new RuntimeException("Item not found"));
        saleDetail.setItemCode(inventory);

        saleDetailsRepo.save(saleDetail);

        // Update inventory
        int availableQty = inventoryRepo.findQtyByItemCodeAndSize(saleDetailsDTO.getItemCode(), saleDetailsDTO.getSize());
        int newQty = availableQty - saleDetailsDTO.getItemQty();

        String status;
        if (newQty <= 0) {
            status = "Not Available";
        } else if (newQty < (availableQty * 0.5)) {
            status = "Low";
        } else {
            status = "Available";
        }
        inventoryRepo.updateByItemCodeAndSize(newQty, status, saleDetailsDTO.getItemCode(), saleDetailsDTO.getSize());
    }
}

    @Override
    public List<String> getAllItemCodes() {
        return inventoryRepo.findAllItemCodes();
    }

    @Override
    public InventoryDTO searchByItemCode(String itemCode) {
        if (!inventoryRepo.existsById(itemCode)){
            throw new NotFoundException("Item Code does not exists!");
        }
        return modelMapper.map(inventoryRepo.findByItemCode(itemCode),InventoryDTO.class);
    }

    @Override
    public List<String> getAllCustomerCodes() {
        return customerRepo.findAllCustomerCodes();
    }

    @Override
    public CustomerDTO searchByCustomerCode(String customerCode) {
        if (!customerRepo.existsById(customerCode)){
            throw new NotFoundException("Customer Code does not exists!");
        }
        return modelMapper.map(customerRepo.findByCustomerCode(customerCode),CustomerDTO.class);
    }

    @Override
    public String generateNextOrderId() {
        String prefix = "ORD-";
        String id = "";

        Sale lastOrder = saleRepo.findTopByOrderByOrderNoDesc();
        int nextNumericPart;
        if (lastOrder != null) {
            String lastCode = lastOrder.getOrderNo();
            String numericPartString = lastCode.substring(prefix.length());
            try {
                int numericPart = Integer.parseInt(numericPartString);
                nextNumericPart = numericPart + 1;
            } catch (NumberFormatException e) {
                nextNumericPart = 1;
            }
        } else {
            nextNumericPart = 1;
        }
        id = prefix + String.format("%04d", nextNumericPart);

        System.out.println("Order next id ="+id);
        return id;
    }
}
