getAllRefundOrders();

function orderDetailInitialize() {
    getAllRefundOrders();
}

function getAllRefundOrders() {
    $.ajax({
        url: "http://localhost:8080/api/v1/saleDetail/getAllRefundOrders",
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            console.log(resp)
            loadRefundOrdersDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllSuppliers = "+error)
        }
    })
}
function loadRefundOrdersDataToTable(resp) {
    $("#tbody-refund-orders").empty();
    $.each(resp, function (index, sale) {

        // Format the orderDate
        let formattedDate = new Date(sale.purchaseDate).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        let row = `<tr>
                                <th>${sale.orderNo}</th>
                                <td>${sale.cashierName}</td>
                                <td>${sale.customerName}</td>
                                <td>${formattedDate}</td>
                                <td>${sale.paymentMethod}</td>
                                <td>${sale.addedPoints}</td>
                                <td>${sale.totalPrice}</td>
                                <td class="round-td">
                                    <button class="btn-refund">Refund</button>
                                </td>
                              </tr>`;
        $("#tbody-refund-orders").append(row);
    })

    $(".btn-refund").click(refundOrder);
}
function refundOrder() {
    console.log("refund");
    $(this).closest('tr').remove();

    $.ajax({
        url: "http://localhost:8080/api/v1/saleDetail/refundOrder",
        method: "DELETE",
        data: { orderNo: $(this).closest('tr').find('th').text() },
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function(resp) {
            Swal.fire({
                icon : "success",
                title : "Order has been refunded successfully!...",
                showConfirmButton: false,
                timer: 2000
            });
        },
        error: function(xhr, status, error) {
            console.log("Error refunding order: ");
            console.log(xhr)
        }
    });
}
$("#btnOrderSearch").click(function () {
    let searchOrderId = $("#txtSearchOrder").val();

    if (searchOrderId===""){
        Swal.fire({
            icon: "warning",
            title: "Please insert order ID!!!",
            timer: 2000
        });
        return;
    }
    orderSearchByOrderId(searchOrderId);
});
function orderSearchByOrderId(orderId) {
    $.ajax({
        url: "http://localhost:8080/api/v1/saleDetail/searchByOrderId/"+orderId,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            loadOrderDataToTableByOrderId(resp);
        },
        error: function (xhr, textStatus, error) {
            console.log("orderSearchById error: ", error);
            console.log("orderSearchById error: ", xhr.status);
            if (xhr.status===404){
                Swal.fire({
                    icon: "warning",
                    title: "The order ID is does not exists!!!",
                    timer: 2000
                });
            }
        }
    })
}
function loadOrderDataToTableByOrderId(sale) {
    $("#tbody-refund-orders").empty();
    let formattedDate = new Date(sale.purchaseDate).toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    let row = `<tr>
                           <th>${sale.orderNo}</th>
                           <td>${sale.cashierName}</td>
                           <td>${sale.customerName}</td>
                           <td>${formattedDate}</td>
                           <td>${sale.paymentMethod}</td>
                           <td>${sale.addedPoints}</td>
                           <td>${sale.totalPrice}</td>
                           <td class="round-td">
                               <button class="btn-refund">Refund</button>
                           </td>
                      </tr>`;
    $("#tbody-refund-orders").append(row);
    $(".btn-refund").click(refundOrder);
}

/* Order Detail Content //////////////////////////////////////////////////////*/
let orderDetailListLength;
var orderIds;
$("#order-detail-table").on('click', 'tr', function () {
    let row = $(this)
    orderIds= row.children().eq(0).text();
    $('#order-detail-list-section').css("display", "block");

    $.ajax({
        url: "http://localhost:8080/api/v1/saleDetail/getOrderDetailListByOrderId/"+orderIds,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            loadOrderDetailsDataToTableByOrderId(resp);
        },
        error: function (xhr, textStatus, error) {
            console.log("orderDetails error: ", error);
            console.log("orderDetails error: ", xhr.status);
            if (xhr.status===404){
                Swal.fire({
                    icon: "warning",
                    title: "The order ID is does not exists!!!",
                    timer: 2000
                });
            }
        }
    })
})
function loadOrderDetailsDataToTableByOrderId(resp) {
    orderDetailListLength = resp.length;
    $("#tbody-refund-order-details").empty();
    $.each(resp, function (index, detail) {

        let row = `<tr>
                                <th>${detail.itemCode}</th>
                                <td>${detail.itemName}</td>
                                <td>${detail.size}</td>
                                <td>${detail.itemQty}</td>
                                <td>${detail.unitPrice}</td>
                                <td class="round-td">
                                    <button class="btn-refund-orderDetail">Refund</button>
                                </td>
                                <td style="display: none">${detail.orderNo}</td>
                              </tr>`;
        $("#tbody-refund-order-details").append(row);
    })
    $(".btn-refund-orderDetail").click(refundOrderDetail);
}
function refundOrderDetail() {
    orderDetailListLength -= 1;

    console.log("refundOrderDetail length ="+orderDetailListLength);
    let row = $(this).closest('tr');
    let orderId = row.children().eq(6).text();
    let itemCode = row.children().eq(0).text();
    let size = row.children().eq(2).text();
    let qty = row.children().eq(3).text();
    let unitPrice = row.children().eq(4).text();

    let unitTotalPrice = parseInt(qty)* parseFloat(unitPrice);
    row.remove();
    /*console.log(orderId)
    console.log(itemCode)
    console.log(size)
    console.log(qty)
    console.log(unitTotalPrice)*/
    let arrayLength = orderDetailListLength;
    console.log(arrayLength)
     console.log(orderId+" order id")
    let customObj = {
        orderNo:orderId,
        itemCode:itemCode,
        size:size,
        qty:qty,
        unitTotalPrice:unitTotalPrice,
        arrayLength:arrayLength
    }
    console.log(customObj)
    const jsonObj = JSON.stringify(customObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/saleDetail/refundOrderDetail",
        method: "DELETE",
        data: jsonObj,
        contentType: "application/json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function(resp) {
            Swal.fire({
                icon : "success",
                title : "Order has been refunded successfully!...",
                showConfirmButton: false,
                timer: 2000
            });
            getAllRefundOrders();
        },
        error: function(xhr, status, error) {
            console.log("Error refunding orderDetail: ");
            console.log(xhr)
        }
    });
}

/* Clear Order Inputs /////////////////////////////////////////////////////// */
$("#btnOrderClear").click(function () {
    clearOrderDetailInputFields();
});
function clearOrderDetailInputFields() {
    $("#txtSearchOrder").val("");
    $('#order-detail-list-section').css("display", "none");
    getAllRefundOrders();
}
