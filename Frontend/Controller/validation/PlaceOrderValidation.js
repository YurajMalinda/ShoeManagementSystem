const ORDER_QTY_REGEX = /^\d{1,4}$/;
const ORDER_DISCOUNT_REGEX = /^\d{0,2}$/;
const ORDER_CASH_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;
const CARD_NUM_REGEX = /^\d{4}$/;
const BANK_NAME_REGEX = /^[A-Za-z ]{3,}$/;

// ------------btnAddToCart validations-------------------------
$('#orderQty').on("keyup",function () {
    checkItemDetailsInputFields();
});
$('#selectOrderItem').on("click",function () {
    checkItemDetailsInputFields();
});
$('#selectOrderCustomer').on("click",function () {
    checkItemDetailsInputFields();
});
$('#selectOrderItemSize').on("click",function () {
    checkItemDetailsInputFields();
});
$("#orderQty").on("keyup", function () {
    validateTxtOrderQty();
})

function validateTxtOrderQty() {
    if (ORDER_QTY_REGEX.test($('#orderQty').val())) {
        $('#orderQty').css("border", "1px solid rgb(206, 212, 218)");
    } else {
        $('#orderQty').css("border", "2px solid red");
    }
}

function checkItemDetailsInputFields() {
    if (ORDER_QTY_REGEX.test($('#orderQty').val()) && $('#selectOrderItem').val() !== ""  && $('#selectOrderCustomer').val() !== "" && $('#selectOrderItemSize').val() !== "") {
        $("#btnAddToCart").prop("disabled", false);
    } else {
        $("#btnAddToCart").prop("disabled", true);
    }
}

// btnPlaceOrder validations///////////////////////////////////////////
function validateTxtCash() {
    let cashValue = parseFloat($('#cash').val());
    let subTotal = parseFloat($('#txtSubTotal').text());

    if (ORDER_CASH_REGEX.test($('#cash').val())) {
        if (cashValue >= subTotal) {
            $('#cash').css("border", "1px solid rgb(206, 212, 218)");
            return true;
        } else {
            $('#cash').css("border", "2px solid red");
            return false;
        }
    } else {
        $('#cash').css("border", "2px solid red");
        return false;
    }
}

function validateTxtDiscount() {
    let isValid = true;
    $('.discount').each(function () {
        if (ORDER_DISCOUNT_REGEX.test($(this).val())) {
            $(this).css("border", "1px solid rgb(206, 212, 218)");
        } else {
            $(this).css("border", "2px solid red");
            isValid = false;
        }
    });
    return isValid;
}

function validateTxtCardNumber() {
    let cardNumber = $('#cardNumber').val();
    if (CARD_NUM_REGEX.test(cardNumber)) {
        $('#cardNumber').css("border", "1px solid rgb(206, 212, 218)");
        return true;
    } else {
        $('#cardNumber').css("border", "2px solid red");
        return false;
    }
}

function validateTxtBankName() {
    let bankName = $('#bankName').val();
    if (BANK_NAME_REGEX.test(bankName)) {
        $('#bankName').css("border", "1px solid rgb(206, 212, 218)");
        return true;
    } else {
        $('#bankName').css("border", "2px solid red");
        return false;
    }
}



// ---------------clear input fields----------------------------
function clearItemDetailsInputFields() {
    $("#selectOrderItem, #selectOrderItemSize, #orderItemCode, #orderItemName, #orderUnitPrice, #qtyOnHand, #orderQty").val("");
}

function clearPlaceOrderInputFields() {
    loadNextOrderId();
    $("#selectOrderCustomer, #selectOrderItemSize, #cusCode, #cusName, #selectOrderItem, #searchItemCode, #orderItemCode, #orderItemName, #orderUnitPrice").val("");
    $("#tblOrderCart").empty();
    $("#balance, #cash, .discount, #cardNumber, #bankName").val("");
    $("#txtSubTotal, #txtTotal, #txtOrderTotal").text("");
    $("#paymentMethod").prop("selectedIndex", "cash");
}