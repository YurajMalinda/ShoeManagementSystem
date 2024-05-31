package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.api;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.CustomDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.dto.SaleDetailsDTO;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.SaleDetailService;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/saleDetail")
@CrossOrigin
public class SaleDetailsAPI {
    private final SaleDetailService saleDetailService;

    public SaleDetailsAPI(SaleDetailService saleDetailService) {
        this.saleDetailService = saleDetailService;
    }

    @GetMapping("/getAllRefundOrders")
    public List<SaleDTO> getAllRefundOrders(){
        return saleDetailService.getAllRefundOrders();
    }

    @DeleteMapping("/refundOrder/{orderNo}")
    public ResponseEntity<String> refundOrder(@PathVariable("orderNo") String orderNo) {
        System.out.println("refundOrder = "+orderNo);
        try {
            boolean isRefunded = saleDetailService.refundOrder(orderNo);
            if (isRefunded) {
                return ResponseEntity.ok("Order refunded successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while refunding the order");
        }
    }
    @GetMapping("/searchByOrderId/{orderNo}")
    public SaleDTO getOrderByOrderId(@PathVariable("orderNo")String orderNo){
        return saleDetailService.getOrderByOrderId(orderNo);
    }

    @GetMapping("/getOrderDetailListByOrderId/{orderNo}")
    public List<SaleDetailsDTO> getOrderDetailListByOrderId(@PathVariable("orderNo")String orderNo){
        return saleDetailService.getOrderDetailListByOrderId(orderNo);
    }

    @DeleteMapping("/refundOrderDetail")
    public ResponseEntity<String> refundOrderDetail(@RequestBody CustomDTO customDTO){
        System.out.println(customDTO);
        try {
            boolean isRefunded = saleDetailService.refundOrderDetails(customDTO);
            if (isRefunded) {
                return ResponseEntity.ok("Order Item refunded successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order Item not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while refunding the order item");
        }
    }
}
