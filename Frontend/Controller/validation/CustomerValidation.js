// ------regex for text fields-----
const CUS_CODE_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const TOTAL_POINT_REGEX = /^\d+$/;
const ADDRESS_REGEX = /^[A-Za-z0-9\s,.'-]{3,}$/;
const CUS_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_NO_REGEX = /^\d{10}$/;

// -------add validations to the text fields----------
let cus_vArray = new Array();
cus_vArray.push({field: $("#customerCode"), regex: CUS_CODE_REGEX});
cus_vArray.push({field: $("#customerName"), regex: CUS_NAME_REGEX});
cus_vArray.push({field: $("#addressLine1"), regex: ADDRESS_REGEX});
cus_vArray.push({field: $("#addressLine2"), regex: ADDRESS_REGEX});
cus_vArray.push({field: $("#addressLine3"), regex: ADDRESS_REGEX});
cus_vArray.push({field: $("#addressLine4"), regex: ADDRESS_REGEX});
cus_vArray.push({field: $("#addressLine5"), regex: ADDRESS_REGEX});
cus_vArray.push({field: $("#contactNo"), regex: MOBILE_NO_REGEX});
cus_vArray.push({field: $("#email"), regex: CUS_EMAIL_REGEX});

function clearCustomerInputFields(){
    $("#customerCode, #customerName, #joinDate, #totalPoints, #dob, #addressLine1, #addressLine2, #addressLine3, #addressLine4, #addressLine5, #contactNo, #email, #recentPurchase").val("");
    $("input[name='gender']").prop("checked", false);
    $("input[name='level']").prop("checked", false);
    $("#customerCode, #customerName, #joinDate, #totalPoints, #dob, #addressLine1, #addressLine2, #addressLine3, #addressLine4, #addressLine5, #contactNo, #email, #recentPurchase").css("border", "1px solid #ced4da");
    $("#customerCode").focus();
    setBtnGroupCustomer();
}

setBtnGroupCustomer();

$("#customerCode, #customerName, #addressLine1, #addressLine2, #addressLine3, #addressLine4, #addressLine5, #contactNo, #email").on("keydown keyup", function (e){
    let indexNo = cus_vArray.indexOf(cus_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidationsCustomer(cus_vArray[indexNo]);

    setBtnGroupCustomer();
    $("#btnUpdateCustomer").prop("disabled", false);

    if (e.key == "Enter") {
        if (e.target.id != cus_vArray[cus_vArray.length-1].field.attr("id")) {
            if (checkValidationsCustomer(cus_vArray[indexNo])) {
                cus_vArray[indexNo+1].field.focus();
            }
        }else {
            if (checkValidationsCustomer(cus_vArray[indexNo])) {
                saveCustomer();
            }
        }
    }
});

function checkValidationsCustomer(object){
    if((object.regex.test(object.field.val()))){
        setBorderCustomer(true, object)
        return true;
    }
    setBorderCustomer(false, object)
    return false;
}


function setBorderCustomer(bool, object) {
    if (!bool){
        if(object.field.val().length >=1){
            object.field.css("border", "2px solid red");
        }else{
            object.field.css("border", "1px solid #ced4da");
        }
    }else{
        if(object.field.val().length >=1){
            object.field.css("border", "2px solid green");
        }else{
            object.field.css("border", "1px solid #ced4da");
        }
    }
}

function checkAllCustomer(){
    for (let i = 0; i < cus_vArray.length; i++) {
        if (!checkValidationsCustomer(cus_vArray[i])) return false;
    }
    return true;
}

function setBtnGroupCustomer() {
    $("#btnDeleteCustomer").prop("disabled", true);
    $("#btnUpdateCustomer").prop("disabled", true);

    if (checkAllCustomer()){
        $("#btnSaveCustomer").prop("disabled", false);
    }else{
        $("#btnSaveCustomer").prop("disabled", true);
    }

    // let id = $("#customerCode").val();
    // if (searchCustomer(id) == undefined) {
    //     $("#btnDeleteCustomer").prop("disabled", true);
    //     $("#btnUpdateCustomer").prop("disabled", true);
    // }else {
    //     $("#btnDeleteCustomer").prop("disabled", false);
    //     $("#btnUpdateCustomer").prop("disabled", false);
    // }
}
