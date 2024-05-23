// ------regex for text fields-----
const SUP_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const SUP_ADDRESS_REGEX = /^[A-Za-z0-9\s,.'-]{3,}$/;
const SUP_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUP_PHONE_REGEX = /^\d{10}$/;

// -------add validations to the text fields----------
let sup_vArray = new Array();
sup_vArray.push({field: $("#supplierName"), regex: SUP_NAME_REGEX});
sup_vArray.push({field: $("#addressLine1Supplier"), regex: SUP_ADDRESS_REGEX});
sup_vArray.push({field: $("#addressLine2Supplier"), regex: SUP_ADDRESS_REGEX});
sup_vArray.push({field: $("#addressLine3Supplier"), regex: SUP_ADDRESS_REGEX});
sup_vArray.push({field: $("#addressLine4Supplier"), regex: SUP_ADDRESS_REGEX});
sup_vArray.push({field: $("#addressLine5Supplier"), regex: SUP_ADDRESS_REGEX});
sup_vArray.push({field: $("#addressLine6Supplier"), regex: SUP_ADDRESS_REGEX});
sup_vArray.push({field: $("#mobileContactNo"), regex: SUP_PHONE_REGEX});
sup_vArray.push({field: $("#landlineContactNo"), regex: SUP_PHONE_REGEX});
sup_vArray.push({field: $("#supplierEmail"), regex: SUP_EMAIL_REGEX});

function clearSupplierInputFields(){
    $("#supplierName, #addressLine1Supplier, #addressLine2Supplier, #addressLine3Supplier, #addressLine4Supplier, #addressLine5Supplier, #addressLine6Supplier, #mobileContactNo, #landlineContactNo, #supplierEmail").val("");
    $("#selectCategory").prop("selectedIndex", "DEFAULT");
    $("#supplierName, #addressLine1Supplier, #addressLine2Supplier, #addressLine3Supplier, #addressLine4Supplier, #addressLine5Supplier, #addressLine6Supplier, #mobileContactNo, #landlineContactNo, #supplierEmail").css("border", "1px solid #ced4da");
    $("#supplierName").focus();
    loadNextSupplierCode();
    setBtnGroupSupplier();
}

setBtnGroupSupplier();

$("#supplierName, #addressLine1Supplier, #addressLine2Supplier, #addressLine3Supplier, #addressLine4Supplier, #addressLine5Supplier, #addressLine6Supplier, #mobileContactNo, #landlineContactNo, #supplierEmail").on("keydown keyup", function (e){
    let indexNo = sup_vArray.indexOf(sup_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidationsSupplier(sup_vArray[indexNo]);

    setBtnGroupSupplier();
    $("#btnUpdateSupplier").prop("disabled", false);

    if (e.key == "Enter") {
        if (e.target.id != sup_vArray[sup_vArray.length-1].field.attr("id")) {
            if (checkValidationsSupplier(sup_vArray[indexNo])) {
                sup_vArray[indexNo+1].field.focus();
            }
        }else {
            if (checkValidationsSupplier(sup_vArray[indexNo])) {
                saveSupplier();
            }
        }
    }
});

$("#selectCategory").on("change", function (e){
    let selectedValue = this.value;
    $("#btnUpdateSupplier").prop("disabled", false);
    // You can perform other actions here
    console.log('The selected option is: ' + selectedValue);
})

function checkValidationsSupplier(object){
    if((object.regex.test(object.field.val()))){
        setBorderSupplier(true, object)
        return true;
    }
    setBorderSupplier(false, object)
    return false;
}


function setBorderSupplier(bool, object) {
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

function checkAllSupplier(){
    for (let i = 0; i < sup_vArray.length; i++) {
        if (!checkValidationsSupplier(sup_vArray[i])) return false;
    }
    return true;
}

function setBtnGroupSupplier() {
    $("#btnDeleteSupplier").prop("disabled", true);
    $("#btnUpdateSupplier").prop("disabled", true);

    if (checkAllSupplier()){
        $("#btnSaveSupplier").prop("disabled", false);
    }else{
        $("#btnSaveSupplier").prop("disabled", true);
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
