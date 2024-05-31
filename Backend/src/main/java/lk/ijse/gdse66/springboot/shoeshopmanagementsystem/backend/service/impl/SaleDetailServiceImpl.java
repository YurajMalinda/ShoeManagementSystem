package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.impl;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.CustomDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDetailsDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.embedded.SaleDetailPK;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Customer;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.Sale;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.entity.SaleDetail;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.CustomerRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.InventoryRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.SaleDetailsRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.repository.SaleRepo;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.SaleDetailService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.util.Level;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SaleDetailServiceImpl implements SaleDetailService {
    SaleRepo saleRepo;
    SaleDetailsRepo saleDetailsRepo;
    CustomerRepo customerRepo;
    InventoryRepo inventoryRepo;
    ModelMapper modelMapper;

    public SaleDetailServiceImpl(SaleRepo saleRepo, SaleDetailsRepo saleDetailsRepo, CustomerRepo customerRepo, InventoryRepo inventoryRepo, ModelMapper modelMapper) {
        this.saleRepo = saleRepo;
        this.saleDetailsRepo = saleDetailsRepo;
        this.customerRepo = customerRepo;
        this.inventoryRepo = inventoryRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<SaleDTO> getAllRefundOrders() {
        return saleRepo.getAllRefundOrders().stream().map(sale -> modelMapper.map(sale,SaleDTO.class)).toList();
    }

    @Override
    public boolean refundOrder(String orderNo) {
        if (saleRepo.existsById(orderNo)) {
            System.out.println("Refund Order");

//            ----------------remove customer added points--------------

            Sale refundOrder = saleRepo.findByOrderNo(orderNo);
            System.out.println(refundOrder.getCustomerCode().getCustomerCode());
            //System.out.println(refundOrder.getCustomer_id().getCode());
            Customer customer = customerRepo.findByCustomerCode(refundOrder.getCustomerCode().getCustomerCode());
            //System.out.println(customer);

            int currentPoints = customer.getTotalPoints();
            int reducePoints = refundOrder.getAddedPoints();
            int newPoints = currentPoints-reducePoints;

            Level loyaltyLevel = null;
            if (newPoints < 10){
                loyaltyLevel = Level.NEW;
            }else if (newPoints >= 10 && newPoints<30){
                loyaltyLevel = Level.BRONZE;
            } else if (newPoints >= 30 && newPoints<100) {
                loyaltyLevel = Level.SILVER;
            } else if (newPoints >= 100) {
                loyaltyLevel = Level.GOLD;
            }
            customer.setLevel(loyaltyLevel);
            customer.setTotalPoints(newPoints);
            System.out.println("loyaltyLevel = "+customer.getLevel());
            System.out.println("loyaltyPoints = "+customer.getTotalPoints());
            customerRepo.save(customer);


//            ----------------------------Reduce item qty------------------------

            List<SaleDetail> saleDetailsByOrderNo = saleDetailsRepo.findSaleDetailByOrderNo(orderNo);
            for (SaleDetail saleDetail : saleDetailsByOrderNo) {
                String itemCode = saleDetail.getSaleDetailPK().getItem_code();
                String size = saleDetail.getSaleDetailPK().getSize();
                int availableQty = inventoryRepo.findQtyByItemCodeAndSize(itemCode, size);
                int newQty = availableQty + saleDetail.getItemQty();

                /*System.out.println("itemCode = "+itemCode);
                System.out.println("size ="+newQty);*/

                String status;
                if (newQty<=0){
                    status="Not Available";
                } else if (newQty<(availableQty*0.5)) {
                    status="Low";
                } else {
                    status="Available";
                }
                inventoryRepo.updateByItemCodeAndSize(newQty, status, itemCode,size);
            }

            saleRepo.deleteById(orderNo);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public SaleDTO getOrderByOrderId(String orderNo) {
        if (!saleRepo.existsById(orderNo)){
            throw new NotFoundException("Order Id does not exists!");
        }
        Sale sale = saleRepo.findSaleByOrderNo(orderNo);
        return modelMapper.map(sale, SaleDTO.class);
    }

    @Override
    public List<SaleDetailsDTO> getOrderDetailListByOrderId(String orderNo) {
        List<SaleDetail> saleDetails = saleDetailsRepo.findSaleDetailByOrderNo(orderNo);
        List<SaleDetailsDTO> saleDetailsDTOS = new ArrayList<>();
        for (SaleDetail saleDetail : saleDetails) {
            SaleDetailsDTO saleDetailsDTO = new SaleDetailsDTO(
                    saleDetail.getSaleDetailPK().getOrder_no(),
                    saleDetail.getSaleDetailPK().getItem_code(),
                    saleDetail.getItemDesc(),
                    saleDetail.getSaleDetailPK().getSize(),
                    saleDetail.getUnitPrice(),
                    saleDetail.getItemQty()
            );
            saleDetailsDTOS.add(saleDetailsDTO);
        }
        return saleDetailsDTOS;
    }

    @Override
    public boolean refundOrderDetails(CustomDTO customDTO) {
        SaleDetailPK saleDetailPK = new SaleDetailPK(customDTO.getOrderNo(),customDTO.getItemCode(),customDTO.getSize());
        if (saleDetailsRepo.existsById(saleDetailPK)){

//            ----------------Update order total-----------
            Sale sale = saleRepo.findSaleByOrderNo(customDTO.getOrderNo());
            if (sale != null){
                double newTotalPrice = sale.getTotalPrice() - customDTO.getUnitTotalPrice();
                sale.setTotalPrice(newTotalPrice);
                saleRepo.save(sale);
            }

//            ---------------------Update Item qty--------------------
            String itemCode = customDTO.getItemCode();
            String size = customDTO.getSize();
            int availableQty = inventoryRepo.findQtyByItemCodeAndSize(itemCode, size);
            int newQty = availableQty + customDTO.getQty();

            String status;
            if (newQty<=0){
                status="Not Available";
            } else if (newQty<(availableQty*0.5)) {
                status="Low";
            } else {
                status="Available";
            }
            inventoryRepo.updateByItemCodeAndSize(newQty, status, itemCode,size);


//            ------------------Delete order detail---------------
            saleDetailsRepo.deleteById(saleDetailPK);

//            ----------------------Delete order----------------
            if (customDTO.getArrayLength() == 0){
                saleRepo.deleteById(customDTO.getOrderNo());
                //System.out.println("Delete Order");
            }
            //System.out.println("exists");
            return true;
        } else {
            return false;
        }
    }
}
