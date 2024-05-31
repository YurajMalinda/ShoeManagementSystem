
loadNextOrderId();
setDataToOrderDate();
loadCustomerCodes();
loadItemCodes();
$('#cashierName').val("Yuraj");

let itemObj;

$("#btnAddToCart").click(function () {
    let qtyOnHand = parseInt($('#qtyOnHand').val());
    let orderQty = parseInt($('#orderQty').val());

    if (qtyOnHand >= orderQty) {
        setDataToCartTable();
        clearItemDetailsInputFields();
        $("#btnAddToCart").prop("disabled", true);
    } else {
        Swal.fire({
            icon: "warning",
            title: "Out of stock!...",
            text: "This Item is out of stock!..."
        });
    }
});

function setDataToCartTable() {
    let itemCode = $("#orderItemCode").val();
    let itemName = $("#orderItemName").val();
    let itemSize = $("#selectOrderItemSize").val();
    let unitPrice = $("#orderUnitPrice").val();
    let buyingQty = $("#orderQty").val();
    let total = parseInt(unitPrice) * parseInt(buyingQty);


    let availableQty = $("#qtyOnHand").val();
    let tableCheck = "notFound";

    $("#tblOrderCart tr").each(function () {
        let tableItemCode = $(this).find("td:eq(0)").text();
        let tableSize = $(this).find("td:eq(2)").text();

        if (itemCode===tableItemCode && itemSize===tableSize){
            tableCheck = "found";
            let currentQty = $(this).find("td:eq(4)").text();
            console.log(currentQty);
            let newQty = parseInt(currentQty) + parseInt(buyingQty);

            if (newQty > parseInt(availableQty)){
                Swal.fire({
                    icon: "warning",
                    title: "Out of stock!...",
                    text: "This Item is out of stock!..."
                });
            } else {
                $(this).find("td:eq(4)").text(newQty);
                let newTotal = unitPrice * newQty;
                $(this).find("td:eq(5)").text(newTotal);
                calculateTotal();
            }
        }
    })

    if (tableCheck === "notFound"){
        let row = `<tr>
                            <td>${itemCode}</td>
                            <td>${itemName}</td>
                            <td>${itemSize}</td>
                            <td>${unitPrice}</td>
                            <td>${buyingQty}</td>
                            <td>${total}</td>
                        </tr>`
        $("#tblOrderCart").append(row);
        bindOrderCartTblDblClickEvent();
        calculateTotal();
    }
}

function bindOrderCartTblDblClickEvent() {
    $('#tblOrderCart>tr').on("dblclick",function () {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this order.?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $(this).remove();
                    calculateTotal();
                    Swal.fire({
                        position: "center",
                        icon : "success",
                        title : "Order has been deleted successfully!...",
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    swal("This data is safe!");
                }
            });
    });
}

function calculateTotal() {
    let finalTotal = 0;
    $("#tblOrderCart>tr").each(function () {
        let rowTotal = parseFloat($(this).find("td:eq(5)").text())
        finalTotal = finalTotal+rowTotal;
    })
    $("#txtTotal").text(finalTotal.toFixed(2));
    $("#txtOrderTotal").text(finalTotal.toFixed(2));
    $('#txtSubTotal').text(finalTotal.toFixed(2));
}

$("#btnPayment").click(function () {
    let orderId = $("#orderId").val();
    let orderDate = $('#orderDate').val();
    console.log(orderDate);
    let totalPrice = $("#txtSubTotal").text();
    let joinDateAsLoyalty = $("#joinDate").val();

    // Initialize addedPoints
    let addedPoints = 0;

    // Check if joinDateAsLoyalty is not null and totalPrice is greater than 800
    if (joinDateAsLoyalty !== null && totalPrice > 800) {
        addedPoints += 1;
    } else {
        console.log("Customer is not a loyalty customer");
    }

    let paymentMethod = $("#paymentMethod").val();
    let cashierName = $("#cashierName").val();
    let customerId = $("#cusCode").val();
    let customerName = $("#cusName").val();
    let itemQty = $("#orderQty").val();

    let orderDetailList = [];
    $("#tblOrderCart>tr").each(function () {
        let orderDetail = {
            orderNo: orderId,
            itemCode: $(this).find("td:eq(0)").text(),
            itemName: $(this).find("td:eq(1)").text(),
            size: $(this).find("td:eq(2)").text(),
            unitPrice: $(this).find("td:eq(3)").text(),
            itemQty: $(this).find("td:eq(4)").text()
        }
        orderDetailList.push(orderDetail);
    })

    let orderObj = {
        orderNo:orderId,
        purchaseDate:orderDate,
        totalPrice:totalPrice,
        addedPoints:addedPoints,
        paymentMethod:paymentMethod,
        cashierName:cashierName,
        customerCode:customerId,
        customerName:customerName,
        saleDetailsDTOList:orderDetailList
    }
    const jsonObj = JSON.stringify(orderObj);
    console.log(jsonObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/sales",
        method: "POST",
        data: jsonObj,
        contentType: "application/json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp, textStatus, jqxhr) {
            console.log("placeOder success: ", resp);
            clearItemDetailsInputFields();
            clearPlaceOrderInputFields();
            $("#btnPayment").prop("disabled", true);
            Swal.fire({
                position: "center",
                icon : "success",
                title : "Order has been placed successfully!...",
                showConfirmButton: false,
                timer: 2000
            });
        },
        error: function (xhr, textStatus, error) {
            console.log("placeOrder error: ", error);
            console.log("placeOrder error: ", xhr);
        }
    })
})

// -------------------calculate balance--------------------------
$('#cash').on("keyup",function (){
    if (validateTxtCash()) {
        calculateBalance();
    } else {
        $('#balance').val("");
    }
});

$('#cardNumber').on("keyup", function () {
    validateTxtCardNumber();
});

$('#bankName').on("keyup", function () {
    validateTxtBankName();
});

function calculateBalance() {
    let subTotal = parseFloat($('#txtSubTotal').text());
    let cash = parseFloat($('#cash').val());

    if (subTotal <= cash) {
        let balance = cash - subTotal;
        $('#balance').val(balance.toFixed(2));
        $("#btnPayment").prop("disabled", false);
    } else {
        $('#balance').val("Invalid!");
        $("#btnPayment").prop("disabled", true);
    }
}

// --------------------Calculate sub total-------------------------------
$('.discount').on("keyup",function () {
    if (validateTxtDiscount()) {
        calculateSubTotal();
    } else {
        $('#txtSubTotal').text("");
        $("#btnPayment").prop("disabled", true);
    }
});

function calculateSubTotal() {
    let total = parseFloat($('#txtOrderTotal').text());
    let discountPercentage = 0;

    // Sum all discount percentages from inputs with the 'discount' class
    $('.discount').each(function () {
        let value = parseFloat($(this).val());
        if (!isNaN(value) && value >= 0 && value <= 100) {
            discountPercentage += value;
        }
    });

    // Calculate the discount and subtotal
    let discount = total * discountPercentage / 100;
    let subTotal = total - discount;

    // Update the subtotal display
    $('#txtSubTotal').text(subTotal.toFixed(2));

    // Call the function to calculate the balance
    if ($('#paymentMethod').val() === 'cash') {
        calculateBalance();
    }
}

// function validatePayment() {
//     if ($('#paymentMethod').val() === 'cash') {
//         return validateTxtDiscount() && validateTxtCash() && parseFloat($('#balance').val()) >= 0;
//     } else if ($('#paymentMethod').val() === 'card') {
//         return validateTxtDiscount() && validateTxtCardNumber() && validateTxtBankName();
//     }
//     return false;
// }
//
// // Example usage when trying to enable the payment button
// $("#btnPayment").prop("disabled", !validatePayment());
//
// $('.discount, #cash, #cardNumber, #bankName').on("keyup change", function () {
//     $("#btnPayment").prop("disabled", !validatePayment());
// });


// -------------------Place order page load contents-----------------
$("#selectOrderItemSize").change(function () {
    let size = $(this).val();

    if (itemObj && itemObj.hasOwnProperty(size)) {
        let qtyOnHand = itemObj[size];
        if (qtyOnHand > 0){
            $("#qtyOnHand").val(qtyOnHand);
        } else {
            $("#qtyOnHand").val("Not available");
        }
    } else {
        $("#qtyOnHand").val("Quantity not available");
    }
})

$("#selectOrderItem").change(function () {
    let code = $(this).val();
    if (code!==""){
        $("#selectOrderItemSize").prop("disabled", false);
    } else {
        $("#selectOrderItemSize").prop("disabled", true);
    }
    $.ajax({
        url:"http://localhost:8080/api/v1/sales/searchByItemCode/"+code,
        method:"GET",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success:function (resp) {
            itemObj = resp;
            console.log(itemObj);
            $("#orderItemCode").val(itemObj.itemCode);
            $("#orderItemName").val(itemObj.itemDesc);
            $("#orderUnitPrice").val(itemObj.unitPriceSale);
        },
        error:function (xhr, status, error) {
            console.log("searchCusById() ="+error)
            if (xhr.status===404){
                swal("Error", "This Item does not exits!", "error");
            } else {
                swal("Error", "Failed to retrieve item details. Please try again later.", "error");
            }
        }
    })
})
$("#selectOrderCustomer").change(function () {
    let code = $(this).val();
    $.ajax({
        url:"http://localhost:8080/api/v1/sales/searchByCustomerCode/"+code,
        method:"GET",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success:function (resp) {
            $("#cusCode").val(resp.customerCode);
            $("#cusName").val(resp.customerName);
        },
        error:function (xhr, status, error) {
            console.log("searchCusById() ="+error)
            if (xhr.status===404){
                swal("Error", "This Customer does not exits!", "error");
            }
        }
    })
})
function loadItemCodes() {
    $.ajax({
        url:"http://localhost:8080/api/v1/sales/loadItemCodes",
        method:"GET",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success:function (resp) {
            $("#selectOrderItem").empty().append(`<option selected></option>`);
            $.each(resp, function (index, itemCode) {
                $("#selectOrderItem").append(`<option value="${itemCode}">${itemCode}</option>`);
            })
        },
        error:function (xhr, status, error) {
            console.log("loadItemCodes() ="+error)
        }
    })
}
function loadCustomerCodes() {
    $.ajax({
        url:"http://localhost:8080/api/v1/sales/loadCustomerCodes",
        method:"GET",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success:function (resp) {
            $("#selectOrderCustomer").empty().append(`<option selected></option>`);
            $.each(resp, function (index, customerCode) {
                $("#selectOrderCustomer").append(`<option value="${customerCode}">${customerCode}</option>`);
            })
        },
        error:function (xhr, status, error) {
            console.log("loadCusId() ="+error)
        }
    })
}
function loadNextOrderId() {
    $.ajax({
        url:"http://localhost:8080/api/v1/sales/nextOrderId",
        method:"GET",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success:function (resp) {
            $("#orderId").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextOrderId() ="+error)
        }
    })
}
function setDataToOrderDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let orderDate = `${year}-${month}-${day}`;
    $('#orderDate').val(orderDate);
}