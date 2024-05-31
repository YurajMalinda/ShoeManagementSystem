package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.CustomDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDetailsDTO;

import java.util.List;

public interface SaleDetailService {

    List<SaleDTO> getAllRefundOrders();
    boolean refundOrder(String orderNo);
    SaleDTO getOrderByOrderId(String orderNo);
    List<SaleDetailsDTO> getOrderDetailListByOrderId(String orderNo);
    boolean refundOrderDetails(CustomDTO customDTO);
}
