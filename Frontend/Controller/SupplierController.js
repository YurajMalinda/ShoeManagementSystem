getAllSupplier();
loadNextSupplierCode();

// --------------Search customer function---------------------------
$("#btnSearchSupplier").click(function () {
    let supValue = $("#txtSearchSupplier").val();
    if (supValue === ""){
        Swal.fire({
            icon: "warning",
            title: "Oooops...",
            text: "Please input Supplier ID or Supplier name!"
        })
        return;
    }
    let searchType = $("#selectType").val();

    if (searchType === "ID"){
        supSearchById(supValue);
    } else if(searchType === "NAME"){
        supSearchByName(supValue);
    }
});

function supSearchByName(name) {
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/searchByName/"+name,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (details) {
            if (details.length === 0){
                Swal.fire({
                    icon: "warning",
                    title: "Oooops...",
                    text: "Supplier Name not found!"
                })
                return;
            }
            $("#tblSupplier").empty();
            $.each(details, function (index, details) {
                console.log(details);
                console.log(details.supplierCode);

                let row =  `<tr>
                        <td>${details.supplierCode}</td>
                        <td>${details.supplierName}</td>
                        <td>${details.category}</td>
                        <td>${details.addressLine01 + "," + details.addressLine02 + "," + details.addressLine03 + "," + details.addressLine04 + "," + details.addressLine05 + "," + details.addressLine06}</td>
                        <td>${details.mobileContactNo}</td>
                        <td>${details.landlineContactNo}</td>
                        <td>${details.email}</td>
                    </tr>`;

                $("#tblSupplier").append(row);
                bindTableRowEventsSupplier();
                $("#txtSearchSupplier").val("");
                $("#selectType").prop("selectedIndex", "DEFAULT");
            })
        },
        error: function (xhr, status, error) {
            console.log("supSearchByName = "+error)
        }
    })
}

function supSearchById(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/searchById/" + code,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (details) {
            $("#tblSupplier").empty();
            console.log(details);
            console.log(details.supplierCode);

            let row =  `<tr>
                        <td>${details.supplierCode}</td>
                        <td>${details.supplierName}</td>
                        <td>${details.category}</td>
                        <td>${details.addressLine01 + "," + details.addressLine02 + "," + details.addressLine03 + "," + details.addressLine04 + "," + details.addressLine05 + "," + details.addressLine06}</td>
                        <td>${details.mobileContactNo}</td>
                        <td>${details.landlineContactNo}</td>
                        <td>${details.email}</td>
                    </tr>`;

            $("#tblSupplier").append(row);
            bindTableRowEventsSupplier();
            $("#txtSearchSupplier").val("");
            $("#selectType").prop("selectedIndex", "DEFAULT");
        },
        error: function (xhr, textStatus, error) {
            console.log("supSearchById error: ", error);
            console.log("supSearchById error: ", xhr.status);
            if (xhr.status===404){
                Swal.fire({
                    icon: "warning",
                    title: "Oooops...",
                    text: "Supplier Name not found!"
                })
            }
        }
    })
}

function loadNextSupplierCode() {
    $.ajax({
        url:"http://localhost:8080/api/v1/supplier/nextId",
        method:"GET",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success:function (resp) {
            $("#supplierCode").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextSupplierId() ="+error)
        }
    })
}

// --------------Search customer function---------------------------
function searchSupplier(supplierCode) {
    $.ajax({
        type : "GET",
        url: "http://localhost:8080/api/v1/supplier/" + supplierCode,
        success : function (details) {
            console.log(details);
            return true;
        }
    });
}

// --------------Save btn event---------------------------
$("#btnSaveSupplier").click(function (){
    if (checkAllSupplier()){
        saveSupplier();
    }else {
        alert("Something went wrong!");
    }
});

// --------------Save Customer function---------------------------
function saveSupplier() {
    let supCode = $("#supplierCode").val();
    let supName = $("#supplierName").val();
    let category = $("#selectCategory").val();
    let address1 = $("#addressLine1Supplier").val();
    let address2 = $("#addressLine2Supplier").val();
    let address3 = $("#addressLine3Supplier").val();
    let address4 = $("#addressLine4Supplier").val();
    let address5 = $("#addressLine5Supplier").val();
    let address6 = $("#addressLine6Supplier").val();
    let mobileNo = $("#mobileContactNo").val();
    let landlineNo = $("#landlineContactNo").val();
    let email = $("#supplierEmail").val();

    $.ajax({
        type : "POST",
        url : "http://localhost:8080/api/v1/supplier",
        contentType : "application/json",
        data : JSON.stringify({
            supplierCode : supCode,
            supplierName : supName,
            category: category,
            addressLine01 : address1,
            addressLine02 : address2,
            addressLine03 : address3,
            addressLine04 : address4,
            addressLine05 : address5,
            addressLine06 : address6,
            mobileContactNo: mobileNo,
            landlineContactNo: landlineNo,
            email : email
        }),
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },

        success : function (details) {
            console.log(details);
            Swal.fire({
                position: "center",
                icon : "success",
                title : "Supplier has been saved successfully!...",
                showConfirmButton: false,
                timer: 2000
            });
            clearSupplierInputFields();
            getAllSupplier();
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

// // --------------Get all btn event---------------------------
// $("#getAll").click(function (){
//     getAllCustomer();
// })

// --------------Get all customer function---------------------------
function getAllSupplier(){
    $("#tblSupplier").empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/supplier",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success : function (details) {
            console.log("Success: ", details);
            console.log(details.supplierCode);
            for (let supplier of details) {
                let row = `<tr>
                        <td>${supplier.supplierCode}</td>
                        <td>${supplier.supplierName}</td>
                        <td>${supplier.category}</td>
                        <td>${supplier.addressLine01 + "," + supplier.addressLine02 + "," + supplier.addressLine03 + "," + supplier.addressLine04 + "," + supplier.addressLine05 + "," + supplier.addressLine06}</td>
                        <td>${supplier.mobileContactNo}</td>
                        <td>${supplier.landlineContactNo}</td>
                        <td>${supplier.email}</td>
                        </tr>`;

                $("#tblSupplier").append(row);
                bindTableRowEventsSupplier();
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
function bindTableRowEventsSupplier() {
    $("#tblSupplier>tr").click(function (){
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let category = $(this).children().eq(2).text();
        let address = $(this).children().eq(3).text();
        let arr = address.split(",");
        let addressLine01 = arr[0];
        let addressLine02 = arr[1];
        let addressLine03 = arr[2];
        let addressLine04 = arr[3];
        let addressLine05 = arr[4];
        let addressLine06 = arr[5];
        let mobileContact = $(this).children().eq(4).text();
        let landlineContact = $(this).children().eq(5).text();
        let email = $(this).children().eq(6).text();

        $("#supplierCode").val(code)
        $("#supplierName").val(name)
        $("#selectCategory").val(category)
        $("#addressLine1Supplier").val(addressLine01)
        $("#addressLine2Supplier").val(addressLine02)
        $("#addressLine3Supplier").val(addressLine03)
        $("#addressLine4Supplier").val(addressLine04)
        $("#addressLine5Supplier").val(addressLine05)
        $("#addressLine6Supplier").val(addressLine06)
        $("#mobileContactNo").val(mobileContact)
        $("#landlineContactNo").val(landlineContact)
        $("#supplierEmail").val(email)

        $("#btnDeleteSupplier").prop("disabled", false);
    });
}

// --------------Delete btn event---------------------------
$("#btnDeleteSupplier").click(function (){
    let code = $("#supplierCode").val();
    deleteSupplier(code);
});

// --------------Delete customer function---------------------------
function deleteSupplier(code) {
    Swal.fire({
        icon : "warning",
        title : "Do you want to delete this supplier ?.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type : "DELETE",
                url : "http://localhost:8080/api/v1/supplier/" + code,
                contentType : "application/json",
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                success : function (details) {
                    Swal.fire({
                        icon : "success",
                        title : "Supplier has been deleted successfully!...",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    clearSupplierInputFields();
                    getAllSupplier();
                },
                error : function (jqXHR, textStatus, errorThrown) {
                    console.log("ÄJAX error: "+ textStatus, errorThrown);
                    Swal.fire({
                        icon: "warning",
                        title: "Supplier has been deleted unsuccessfully!!!",
                        timer: 2000
                    });
                }
            });
        }
    });
    return false;
}

// --------------Update btn event---------------------------
$("#btnUpdateSupplier").click(function (){
    let code = $("#supplierCode").val();
    updateSupplier(code);
    clearSupplierInputFields();
});

// --------------Update Customer function---------------------------
function updateSupplier(code) {
    if (searchSupplier(code)) {
        Swal.fire({
            icon: "warning",
            title: "Oooops...",
            text: "No such supplier. Please check the ID!..."
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
            let supCode = $("#supplierCode").val();
            let supName = $("#supplierName").val();
            let category = $("#selectCategory").val();
            let address1 = $("#addressLine1Supplier").val();
            let address2 = $("#addressLine2Supplier").val();
            let address3 = $("#addressLine3Supplier").val();
            let address4 = $("#addressLine4Supplier").val();
            let address5 = $("#addressLine5Supplier").val();
            let address6 = $("#addressLine6Supplier").val();
            let mobileNo = $("#mobileContactNo").val();
            let landlineNo = $("#landlineContactNo").val();
            let email = $("#supplierEmail").val();

            $.ajax({
                type : "PATCH",
                url : "http://localhost:8080/api/v1/supplier/" + supCode,
                contentType: "application/json",
                data : JSON.stringify(
                    {
                        supplierCode : supCode,
                        supplierName : supName,
                        category: category,
                        addressLine01 : address1,
                        addressLine02 : address2,
                        addressLine03 : address3,
                        addressLine04 : address4,
                        addressLine05 : address5,
                        addressLine06 : address6,
                        mobileContactNo: mobileNo,
                        landlineContactNo: landlineNo,
                        email : email
                    }),
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                success : function (details) {
                    console.log(details);
                    Swal.fire({
                        position: "center",
                        icon : "success",
                        title : "Supplier has been updated successfully!...",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    clearSupplierInputFields();
                    getAllSupplier();
                },
                error : function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Error: " + textStatus, errorThrown, jqXHR);
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Supplier has been not updated!!!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
        }
    }
}

// --------------Clear btn event---------------------------
$("#btnClearSupplier").click(function (){
    clearSupplierInputFields();
});