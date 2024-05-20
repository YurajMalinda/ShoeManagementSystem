getAllCustomer();

// --------------Search customer function---------------------------
$("#btnSearchCustomer").click(function () {
    let cusId = $("#txtSearch").val();
    $("#tblCustomer").empty();
    $.ajax({
        type : "GET",
        url: "http://localhost:8080/api/v1/customers/" + cusId,
        success : function (details) {
            console.log(details);
            console.log(details.customerCode);

            let row =  `<tr>
                        <td>${details.customerCode}</td>
                        <td>${details.customerName}</td>
                        <td>${details.gender}</td>
                        <td>${details.joinDate}</td>
                        <td>${details.level}</td>
                        <td>${details.totalPoints}</td>
                        <td>${details.dob}</td>
                        <td>${details.addressLine01 + "," + details.addressLine02 + "," + details.addressLine03 + "," + details.addressLine04 + "," + details.addressLine05}</td>
                        <td>${details.contactNo}</td>
                        <td>${details.email}</td>
                        <td>${details.recentPurchase}</td>
                    </tr>`;

            $("#tblCustomer").append(row);
            bindTableRowEventsCustomer();
            $("#txtSearch").val("");
        },
        error : function (error) {
            Swal.fire({
                icon: "warning",
                title: "Oooops...",
                text: "No result found!..."
            })
        }
    });
});

// --------------Search customer function---------------------------
function searchCustomer(customerId) {
    $.ajax({
        type : "GET",
        url: "http://localhost:8080/api/v1/customers/" + customerId,
        success : function (details) {
            console.log(details);
            return true;
        }
    });
}

// --------------Save btn event---------------------------
$("#btnSaveCustomer").click(function (){
    saveCustomer();
    // if (checkAllCustomer()){
    //     saveCustomer();
    // }else {
    //     alert("Something went wrong!");
    // }
});

// --------------Save Customer function---------------------------
function saveCustomer() {
    let cusCode = $("#customerCode").val();
    let cusName = $("#customerName").val();
    let gender = $("input[name='gender']:checked").val();
    let joinDate = $("#joinDate").val();
    let level = $("input[name='level']:checked").val();
    let totalPoints = $("#totalPoints").val();
    let dob = $("#dob").val();
    let address1 = $("#addressLine1").val();
    let address2 = $("#addressLine2").val();
    let address3 = $("#addressLine3").val();
    let address4 = $("#addressLine4").val();
    let address5 = $("#addressLine5").val();
    let contactNo = $("#contactNo").val();
    let email = $("#email").val();
    let recentPurchase = $("#recentPurchase").val();

    $.ajax({
        type : "POST",
        url : "http://localhost:8080/api/v1/customers",
        contentType : "application/json",
        data : JSON.stringify({
            customerCode : cusCode,
            customerName : cusName,
            gender : gender,
            joinDate : joinDate,
            level : level,
            totalPoints : totalPoints,
            dob : dob,
            addressLine01 : address1,
            addressLine02 : address2,
            addressLine03 : address3,
            addressLine04 : address4,
            addressLine05 : address5,
            contactNo : contactNo,
            email : email,
            recentPurchase : recentPurchase
        }),

        success : function (details) {
            console.log(details);
            Swal.fire({
                position: "center",
                icon : "success",
                title : "Customer has been saved successfully!...",
                showConfirmButton: false,
                timer: 2000
            });
            clearCustomerInputFields();
            getAllCustomer();
            // loadCustomerIds();
        },
        error : function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Error: " + textStatus, errorThrown, jqXHR);
            if (jqXHR.status == 409) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: jqXHR.responseText,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
    });
}

// --------------Get all btn event---------------------------
$("#getAll").click(function (){
    getAllCustomer();
})

// --------------Get all customer function---------------------------
function getAllCustomer(){
    $("#tblCustomer").empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/customers",
        success : function (details) {
            console.log("Success: ", details);
            console.log(details.customerCode);
            for (let customer of details) {
                let row = `<tr>
                        <td>${customer.customerCode}</td>
                        <td>${customer.customerName}</td>
                        <td>${customer.gender}</td>
                        <td>${customer.joinDate}</td>
                        <td>${customer.level}</td>
                        <td>${customer.totalPoints}</td>
                        <td>${customer.dob}</td>
                        <td>${customer.addressLine01 + "," + customer.addressLine02 + "," + customer.addressLine03 + "," + customer.addressLine04 + "," + customer.addressLine05}</td>
                        <td>${customer.contactNo}</td>
                        <td>${customer.email}</td>
                        <td>${customer.recentPurchase}</td>
                        </tr>`;

                $("#tblCustomer").append(row);
                bindTableRowEventsCustomer();
            }
        },
        error: function (error) {
            console.log(error);
            Swal.fire({
                icon: "warning",
                title: "Oooops...",
                text: "No result found!..."
            });
        }
    });
}

// --------------Bind row to fields function---------------------------
function bindTableRowEventsCustomer() {
    $("#tblCustomer>tr").click(function (){
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let joinDate = $(this).children().eq(3).text();
        let level = $(this).children().eq(4).text();
        let totalPoint = $(this).children().eq(5).text();
        let dob = $(this).children().eq(6).text();
        let address = $(this).children().eq(7).text();
        let arr = address.split(",");
        let addressLine01 = arr[0];
        let addressLine02 = arr[1];
        let addressLine03 = arr[2];
        let addressLine04 = arr[3];
        let addressLine05 = arr[4];
        let contact = $(this).children().eq(8).text();
        let email = $(this).children().eq(9).text();
        let purchaseDate = $(this).children().eq(10).text();

        $("#customerCode").val(code)
        $("#customerName").val(name)
        $("#joinDate").val(joinDate)
        $("#totalPoints").val(totalPoint)
        $("#dob").val(dob)
        $("#addressLine1").val(addressLine01)
        $("#addressLine2").val(addressLine02)
        $("#addressLine3").val(addressLine03)
        $("#addressLine4").val(addressLine04)
        $("#addressLine5").val(addressLine05)
        $("#contactNo").val(contact)
        $("#email").val(email)
        $("#recentPurchase").val(purchaseDate)

        if (gender === 'MALE') {
            $("#radioMale").prop("checked", true);
        } else if (gender === 'FEMALE') {
            $("#radioFemale").prop("checked", true);
        }

        if (level === 'GOLD') {
            $("#radioGold").prop("checked", true);
        } else if (level === 'BRONZE') {
            $("#radioBronze").prop("checked", true);
        } else if (level === 'SILVER') {
            $("#radioSilver").prop("checked", true);
        } else if (level === 'NEW') {
            $("#radioNew").prop("checked", true);
        }

        $("#btnDeleteCustomer").prop("disabled", false);
    });
}

// --------------Delete btn event---------------------------
$("#btnDeleteCustomer").click(function (){
    let code = $("#customerCode").val();
    deleteCustomer(code);
});

// --------------Delete customer function---------------------------
function deleteCustomer(code) {
    Swal.fire({
        icon : "warning",
        title : "Do you want to delete this customer ?.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type : "DELETE",
                url : "http://localhost:8080/api/v1/customers/" + code,
                contentType : "application/json",
                success : function (details) {
                    Swal.fire({
                        icon : "success",
                        title : "Customer has been deleted successfully!...",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    clearCustomerInputFields();
                    getAllCustomer();
                },
                error : function (jqXHR, textStatus, errorThrown) {
                    console.log("ÄJAX error: "+ textStatus, errorThrown);
                    Swal.fire({
                        icon: "warning",
                        title: "Customer has been deleted unsuccessfully!!!",
                        timer: 2000
                    });
                }
            });
        }
    });
    return false;
}

// --------------Update btn event---------------------------
$("#btnUpdateCustomer").click(function (){
    let code = $("#customerCode").val();
    updateCustomer(code);
    clearCustomerInputFields();
});

// --------------Update Customer function---------------------------
function updateCustomer(code) {
    if (searchCustomer(code)) {
        Swal.fire({
            icon: "warning",
            title: "Oooops...",
            text: "No such customer. Please check the ID!..."
        });
    } else {
        let confirmation = confirm("Do you want to update this customer ?.")
        // Swal.fire({
        //     position: "center",
        //     icon : "warning",
        //     title : "Do you want to update this customer ?.",
        //     showConfirmButton: true,
        //     timer: 2000
        // });

        if (confirmation) {
            console.log(code);
            let cusCode = $("#customerCode").val();
            let cusName = $("#customerName").val();
            let gender = $("input[name='gender']:checked").val()
            let joinDate = $("#joinDate").val();
            let level = $("input[name='level']:checked").val()
            let totalPoints = $("#totalPoints").val();
            let dob = $("#dob").val();
            let address1 = $("#addressLine1").val();
            let address2 = $("#addressLine2").val();
            let address3 = $("#addressLine3").val();
            let address4 = $("#addressLine4").val();
            let address5 = $("#addressLine5").val();
            let contactNo = $("#contactNo").val();
            let email = $("#email").val();
            let recentPurchase = $("#recentPurchase").val();

            $.ajax({
                type : "PATCH",
                url : "http://localhost:8080/api/v1/customers/" + cusCode,
                contentType: "application/json",
                data : JSON.stringify(
                    {
                        customerCode : cusCode,
                        customerName : cusName,
                        gender : gender,
                        joinDate : joinDate,
                        level : level,
                        totalPoints : totalPoints,
                        dob : dob,
                        addressLine01 : address1,
                        addressLine02 : address2,
                        addressLine03 : address3,
                        addressLine04 : address4,
                        addressLine05 : address5,
                        contactNo : contactNo,
                        email : email,
                        recentPurchase : recentPurchase
                    }),
                success : function (details) {
                    console.log(details);
                    Swal.fire({
                        position: "center",
                        icon : "success",
                        title : "Customer has been updated successfully!...",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    clearCustomerInputFields();
                    getAllCustomer();
                },
                error : function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Error: " + textStatus, errorThrown, jqXHR);
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Customer has been not updated!!!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
        }
    }
}

// --------------Clear btn event---------------------------
$("#btnClearCustomer").click(function (){
    clearCustomerInputFields();
});