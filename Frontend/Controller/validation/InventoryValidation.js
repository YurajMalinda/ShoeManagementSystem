// ------regex for text fields-----
const ITM_NAME_REGEX = /^[A-Za-z ]{3,}$/;
const ITM_NUM_REGEX = /^(0|[1-9]\d*)$/;
const ITM_DECIMAL_REGEX = /^-?\d*\.?\d+$/;

// -------add validations to the text fields----------
let item_vArray = new Array();
item_vArray.push({field:$("#itemDesc"),regEx: ITM_NAME_REGEX});
item_vArray.push({field:$("#category"),regEx: ITM_NAME_REGEX});
item_vArray.push({field:$("#size5"),regEx: ITM_NUM_REGEX});
item_vArray.push({field:$("#size6"),regEx: ITM_NUM_REGEX});
item_vArray.push({field:$("#size7"),regEx: ITM_NUM_REGEX});
item_vArray.push({field:$("#size8"),regEx: ITM_NUM_REGEX});
item_vArray.push({field:$("#size9"),regEx: ITM_NUM_REGEX});
item_vArray.push({field:$("#size10"),regEx: ITM_NUM_REGEX});
item_vArray.push({field:$("#size11"),regEx: ITM_NUM_REGEX});
item_vArray.push({field:$("#unitPriceSale"),regEx: ITM_DECIMAL_REGEX});
item_vArray.push({field:$("#unitPriceBuy"),regEx: ITM_DECIMAL_REGEX});
item_vArray.push({field:$("#expectedProfit"),regEx: ITM_DECIMAL_REGEX});
item_vArray.push({field:$("#profitMargin"),regEx: ITM_DECIMAL_REGEX});
item_vArray.push({field:$("#stockStatus"),regEx: ITM_NAME_REGEX});

function clearItemInputFields(){
    $("#itemDesc, #category, #size5, #size6, #size7, #size8, #size9, #size10, #size11, #selectSupplierCode, #supName, #unitPriceSale, #unitPriceBuy, #expectedProfit, #profitMargin, #stockStatus, #selectOccasion, #selectVerities, #selectGender").val("");
    $("#itemDesc, #category, #size5, #size6, #size7, #size8, #size9, #size10, #size11, #selectSupplierCode, #supName, #unitPriceSale, #unitPriceBuy, #expectedProfit, #profitMargin, #stockStatus").css("border", "1px solid #ced4da");
    $("#imageContainer").empty();
    $("#itemDesc").focus();
    loadAllSuppliersCode();
    loadNextItemCode();
    getAllItem();
    setBtnGroupItem();
}

setBtnGroupItem();

$("#itemDesc, #category, #size5, #size6, #size7, #size8, #size9, #size10, #size11, #unitPriceSale, #unitPriceBuy, #expectedProfit, #profitMargin, #stockStatus").on("keydown keyup", function (e){
    let indexNo = item_vArray.indexOf(item_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidationsItem(item_vArray[indexNo]);

    setBtnGroupItem();
    $("#btnUpdateItem").prop("disabled", false);

    if (e.key == "Enter") {
        if (e.target.id != item_vArray[item_vArray.length-1].field.attr("id")) {
            if (checkValidationsItem(item_vArray[indexNo])) {
                item_vArray[indexNo+1].field.focus();
            }
        }else {
            if (checkValidationsItem(item_vArray[indexNo])) {
                saveItem();
            }
        }
    }
});

// $("#selectOccasion, #selectVerities, #selectGender").on("change", function () {
//     updateItemCode();
// });

function checkValidationsItem(object){
    if((object.regEx.test(object.field.val()))){
        setBorderItem(true, object)
        return true;
    }
    setBorderItem(false, object)
    return false;
}


function setBorderItem(bool, object) {
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

function checkAllItem(){
    for (let i = 0; i < item_vArray.length; i++) {
        if (!checkValidationsItem(item_vArray[i])) return false;
    }
    return true;
}

function setBtnGroupItem() {
    $("#btnDeleteItem").prop("disabled", true);
    $("#btnUpdateItem").prop("disabled", true);

    if (checkAllItem()){
        $("#btnSaveItem").prop("disabled", false);
    }else{
        $("#btnSaveItem").prop("disabled", true);
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
