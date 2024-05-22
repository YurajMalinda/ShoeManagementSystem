// ------regex for text fields-----
const EMP_CODE_REGEX = /^(E00-)[0-9]{3}$/;
const EMP_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_ADDRESS_REGEX = /^[A-Za-z0-9\s,.'-]{3,}$/;
const EMP_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMP_CONTACT_NO_REGEX = /^\d{10}$/;

// -------add validations to the text fields----------
let emp_vArray = new Array();
emp_vArray.push({field: $("#employeeCode"), regex: EMP_CODE_REGEX});
emp_vArray.push({field: $("#employeeName"), regex: EMP_NAME_REGEX});
emp_vArray.push({field: $("#status"), regex: EMP_NAME_REGEX});
emp_vArray.push({field: $("#designation"), regex: EMP_NAME_REGEX});
emp_vArray.push({field: $("#attachedBranch"), regex: EMP_NAME_REGEX});
emp_vArray.push({field: $("#addressLine1Employee"), regex: EMP_ADDRESS_REGEX});
emp_vArray.push({field: $("#addressLine2Employee"), regex: EMP_ADDRESS_REGEX});
emp_vArray.push({field: $("#addressLine3Employee"), regex: EMP_ADDRESS_REGEX});
emp_vArray.push({field: $("#addressLine4Employee"), regex: EMP_ADDRESS_REGEX});
emp_vArray.push({field: $("#addressLine5Employee"), regex: EMP_ADDRESS_REGEX});
emp_vArray.push({field: $("#employeeContactNo"), regex: EMP_CONTACT_NO_REGEX});
emp_vArray.push({field: $("#employeeEmail"), regex: EMP_EMAIL_REGEX});
emp_vArray.push({field: $("#emergencyInformName"), regex: EMP_NAME_REGEX});
emp_vArray.push({field: $("#emergencyInformContact"), regex: EMP_CONTACT_NO_REGEX});

function clearEmployeeInputFields(){
    $("#employeeCode, #employeeName, #status, #designation, #dobOfEmployee, #joinedDate, #attachedBranch, #addressLine1Employee, #addressLine2Employee, #addressLine3Employee, #addressLine4Employee, #addressLine5Employee, #employeeContactNo, #employeeEmail, #emergencyInformName, #emergencyInformContact").val("");
    $("input[name='gender']").prop("checked", false);
    $("input[name='role']").prop("checked", false);
    $("#employeeCode, #employeeName, #status, #designation, #dobOfEmployee, #joinedDate, #attachedBranch, #addressLine1Employee, #addressLine2Employee, #addressLine3Employee, #addressLine4Employee, #addressLine5Employee, #employeeContactNo, #employeeEmail, #emergencyInformName, #emergencyInformContact").css("border", "1px solid #ced4da");
    $("#plusIconContainer").empty();
    $("#employeeCode").focus();
    setBtnGroupEmployee();
}

setBtnGroupEmployee();

$("#employeeCode, #employeeName, #status, #designation, #attachedBranch, #addressLine1Employee, #addressLine2Employee, #addressLine3Employee, #addressLine4Employee, #addressLine5Employee, #employeeContactNo, #employeeEmail, #emergencyInformName, #emergencyInformContact").on("keydown keyup", function (e){
    let indexNo = emp_vArray.indexOf(emp_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidationsEmployee(emp_vArray[indexNo]);

    setBtnGroupEmployee();
    $("#btnUpdateEmployee").prop("disabled", false);

    if (e.key == "Enter") {
        if (e.target.id != emp_vArray[emp_vArray.length-1].field.attr("id")) {
            if (checkValidationsEmployee(emp_vArray[indexNo])) {
                emp_vArray[indexNo+1].field.focus();
            }
        }else {
            if (checkValidationsEmployee(emp_vArray[indexNo])) {
                saveEmployee();
            }
        }
    }
});

function checkValidationsEmployee(object){
    if((object.regex.test(object.field.val()))){
        setBorderEmployee(true, object)
        return true;
    }
    setBorderEmployee(false, object)
    return false;
}


function setBorderEmployee(bool, object) {
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

function checkAllEmployee(){
    for (let i = 0; i < emp_vArray.length; i++) {
        if (!checkValidationsEmployee(emp_vArray[i])) return false;
    }
    return true;
}

function setBtnGroupEmployee() {
    $("#btnDeleteEmployee").prop("disabled", true);
    $("#btnUpdateEmployee").prop("disabled", true);

    if (checkAllEmployee()){
        $("#btnSaveEmployee").prop("disabled", false);
    }else{
        $("#btnSaveEmployee").prop("disabled", true);
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
