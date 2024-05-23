let innerShadow = document.getElementById('shadowLayer');
let itemPic = document.getElementById('itemPic');
let plusMark = document.getElementById('plusMark');
let profilePic = document.getElementById('imageContainer');

plusMark.addEventListener('click', function() {
    itemPic.click();
})

innerShadow.addEventListener('click', function() {
    itemPic.click();
})
// ------------------------------------------------------------------------------------------------------------------

getAllEmployee();

// --------------Search customer function---------------------------
$("#btnSearchEmployee").click(function () {
    let empCode = $("#txtSearchEmployee").val();
    $("#tblEmployee").empty();
    $.ajax({
        type : "GET",
        url: "http://localhost:8080/api/v1/employees/" + empCode,
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success : function (details) {
            console.log(details);
            console.log(details.employeeCode);

            let row =  `<tr>
                        <td>${details.employeeProfilePic}</td>
                        <td>${details.employeeCode}</td>
                        <td>${details.employeeName}</td>
                        <td>${details.gender}</td>
                        <td>${details.status}</td>
                        <td>${details.designation}</td>
                        <td>${details.accessRole}</td>
                        <td>${details.dob}</td>
                        <td>${details.dateOfJoin}</td>
                        <td>${details.attachedBranch}</td>
                        <td>${details.addressLine01 + "," + details.addressLine02 + "," + details.addressLine03 + "," + details.addressLine04 + "," + details.addressLine05}</td>
                        <td>${details.contactNo}</td>
                        <td>${details.email}</td>
                        <td>${details.emergencyInform}</td>
                        <td>${details.emergencyContact}</td>
                    </tr>`;

            $("#tblEmployee").append(row);
            bindTableRowEventsEmployee();
            $("#txtSearchEmployee").val("");
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
function searchEmployee(employeeCode) {
    $.ajax({
        type : "GET",
        url: "http://localhost:8080/api/v1/employees/" + employeeCode,
        success : function (details) {
            console.log(details);
            return true;
        }
    });
}

// --------------Save btn event---------------------------
$("#btnSaveEmployee").click(function (){
    if (checkAllEmployee()){
        saveEmployee();
    }else {
        alert("Something went wrong!");
    }
});

// --------------Save Customer function---------------------------
function saveEmployee() {
    let empCode = $("#employeeCode").val();
    let empName = $("#employeeName").val();
    let empProPic = $("#employeeProPic").prop('files')[0];
    let gender = $("input[name='gender']:checked").val();
    let status = $("#status").val();
    let designation = $("#designation").val();
    let role = $("input[name='role']:checked").val();
    let dob = $("#dobOfEmployee").val();
    let joinDate = $("#joinedDate").val();
    let branch = $("#attachedBranch").val();
    let address1 = $("#addressLine1Employee").val();
    let address2 = $("#addressLine2Employee").val();
    let address3 = $("#addressLine3Employee").val();
    let address4 = $("#addressLine4Employee").val();
    let address5 = $("#addressLine5Employee").val();
    let contactNo = $("#employeeContactNo").val();
    let email = $("#employeeEmail").val();
    let emergencyInform = $("#emergencyInformName").val();
    let emergencyContact = $("#emergencyInformContact").val();

    var formData = new FormData();
    formData.append('employeeCode',empCode);
    formData.append('employeeName',empName);
    formData.append('employeeProfilePic',empProPic);
    formData.append('gender',gender);
    formData.append('status',status);
    formData.append('designation',designation);
    formData.append('accessRole',role);
    formData.append('dob',dob);
    formData.append('dateOfJoin',joinDate);
    formData.append('attachedBranch',branch);
    formData.append('addressLine01',address1);
    formData.append('addressLine02',address2);
    formData.append('addressLine03',address3);
    formData.append('addressLine04',address4);
    formData.append('addressLine05',address5);
    formData.append('contactNo',contactNo);
    formData.append('email',email);
    formData.append('emergencyInform',emergencyInform);
    formData.append('emergencyContact',emergencyContact);

    $.ajax({
        type : "POST",
        url : "http://localhost:8080/api/v1/employees",
        data: formData,
        processData: false,
        contentType: false,
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },

        success : function (details) {
            console.log(details);
            Swal.fire({
                position: "center",
                icon : "success",
                title : "Employee has been saved successfully!...",
                showConfirmButton: false,
                timer: 2000
            });
            clearEmployeeInputFields();
            getAllEmployee();
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
function getAllEmployee(){
    $("#tblEmployee").empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/employees",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success : function (details) {
            console.log("Success: ", details);
            console.log(details.employeeCode);
            for (let employee of details) {
                let row = `<tr style="vertical-align: middle">
                        <td><img alt="image" src="data:image/png;base64,${employee.employeeProfilePic}" style="max-width: 60px; border-radius: 10px;"></td>
                        <td>${employee.employeeCode}</td>
                        <td>${employee.employeeName}</td>
                        <td>${employee.gender}</td>
                        <td>${employee.status}</td>
                        <td>${employee.designation}</td>
                        <td>${employee.accessRole}</td>
                        <td>${employee.dob}</td>
                        <td>${employee.dateOfJoin}</td>
                        <td>${employee.attachedBranch}</td>
                        <td>${employee.addressLine01 + "," + employee.addressLine02 + "," + employee.addressLine03 + "," + employee.addressLine04 + "," + employee.addressLine05}</td>
                        <td>${employee.contactNo}</td>
                        <td>${employee.email}</td>
                        <td>${employee.emergencyInform}</td>
                        <td>${employee.emergencyContact}</td>
                </tr>`;

                $("#tblEmployee").append(row);
                bindTableRowEventsEmployee();
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
function bindTableRowEventsEmployee() {
    $("#tblEmployee>tr").click(function (){
        let empProPic = $(this).children().eq(0).html();
        let empCode = $(this).children().eq(1).text();
        let empName = $(this).children().eq(2).text();
        let gender = $(this).children().eq(3).text();
        let status = $(this).children().eq(4).text();
        let designation = $(this).children().eq(5).text();
        let role = $(this).children().eq(6).text();
        let dob = $(this).children().eq(7).text();
        let joinDate = $(this).children().eq(8).text();
        let branch = $(this).children().eq(9).text();
        let address = $(this).children().eq(10).text();
        let arr = address.split(",");
        let addressLine01 = arr[0];
        let addressLine02 = arr[1];
        let addressLine03 = arr[2];
        let addressLine04 = arr[3];
        let addressLine05 = arr[4];
        let contact = $(this).children().eq(11).text();
        let email = $(this).children().eq(12).text();
        let emergencyInform = $(this).children().eq(13).text();
        let emergencyContact = $(this).children().eq(14).text();

        var base64Data;
        var matches = empProPic.match(/src="data:image\/png;base64,([^"]+)"/);
        if (matches) {
            base64Data = matches[1];
            //console.log(base64Data);

            // Decode base64 data into a blob
            var byteCharacters = atob(base64Data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: 'image/png' });

            // Create a file from the blob
            var file = new File([blob], 'image.png', { type: 'image/png' });
            console.log(file)

            var dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            // Set the files property of the file chooser input field using the files property of the DataTransfer object
            var fileInput = document.getElementById('employeeProPic');
            fileInput.files = dataTransfer.files;

        } else {
            console.log("No image data found in the table cell.");
        }

        $("#employeeCode").val(empCode)
        $("#employeeName").val(empName)
        $("#status").val(status)
        $("#designation").val(designation)
        $("#dobOfEmployee").val(dob)
        $("#joinedDate").val(joinDate)
        $("#attachedBranch").val(branch)
        $("#addressLine1Employee").val(addressLine01)
        $("#addressLine2Employee").val(addressLine02)
        $("#addressLine3Employee").val(addressLine03)
        $("#addressLine4Employee").val(addressLine04)
        $("#addressLine5Employee").val(addressLine05)
        $("#employeeContactNo").val(contact)
        $("#employeeEmail").val(email)
        $("#emergencyInformName").val(emergencyInform)
        $("#emergencyInformContact").val(emergencyContact)

        if (gender === 'MALE') {
            $("#radioEmployeeMale").prop("checked", true);
        } else if (gender === 'FEMALE') {
            $("#radioEmployeeFemale").prop("checked", true);
        }

        if (role === 'ADMIN') {
            $("#radioAdmin").prop("checked", true);
        } else if (gender === 'USER') {
            $("#radioUser").prop("checked", true);
        }

        empProPicSearchByID(empCode);

        $("#btnDeleteEmployee").prop("disabled", false);
    });
}

function setEmpImage(resp) {
    $("#imageContainer").empty();
    var proPic = resp.employeeProfilePic;
    //console.log("table click = "+proPic)

    var imageElement = `<img alt="image" src="data:image/png;base64,${proPic}" style="width: 100%;">`
    $("#imageContainer").append(imageElement);
}

function empProPicSearchByID(empCode) {
    $.ajax({
        url: "http://localhost:8080/api/v1/employees/" + empCode,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            setEmpImage(resp);
        },
        error: function (xhr, textStatus, error) {
            console.log("empSearchById error: ", error);
            console.log("empSearchById error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This employee does not exits!", "error");
            }
        }
    })
}

// --------------Delete btn event---------------------------
$("#btnDeleteEmployee").click(function (){
    let code = $("#employeeCode").val();
    if (code === "") {
        Swal.fire({
            icon: "warning",
            title: "Please input valid employee ID!!!",
            timer: 2000
        });
        return;
    }
    deleteEmployee(code);
});

// --------------Delete customer function---------------------------
function deleteEmployee(code) {
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
                url : "http://localhost:8080/api/v1/employees/" + code,
                dataType: "json",
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                success : function (details) {
                    Swal.fire({
                        icon : "success",
                        title : "Customer has been deleted successfully!...",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    clearEmployeeInputFields();
                    getAllEmployee();
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
$("#btnUpdateEmployee").click(function (){
    let code = $("#employeeCode").val();
    updateEmployee(code);
    clearEmployeeInputFields();
});

// --------------Update Customer function---------------------------
function updateEmployee(code) {
    if (searchEmployee(code)) {
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
            let empCode = $("#employeeCode").val();
            let empName = $("#employeeName").val();
            let gender = $("input[name='gender']:checked").val();
            let status = $("#status").val();
            let designation = $("#designation").val();
            let role = $("input[name='role']:checked").val();
            let dob = $("#dobOfEmployee").val();
            let joinDate = $("#joinedDate").val();
            let branch = $("#attachedBranch").val();
            let address1 = $("#addressLine1Employee").val();
            let address2 = $("#addressLine2Employee").val();
            let address3 = $("#addressLine3Employee").val();
            let address4 = $("#addressLine4Employee").val();
            let address5 = $("#addressLine5Employee").val();
            let contactNo = $("#employeeContactNo").val();
            let email = $("#employeeEmail").val();
            let emergencyInform = $("#emergencyInformName").val();
            let emergencyContact = $("#emergencyInformContact").val();

            var formData = new FormData();
            formData.append('employeeCode',empCode);
            formData.append('employeeName',empName);
            formData.append('gender',gender);
            formData.append('status',status);
            formData.append('designation',designation);
            formData.append('accessRole',role);
            formData.append('dob',dob);
            formData.append('dateOfJoin',joinDate);
            formData.append('attachedBranch',branch);
            formData.append('addressLine01',address1);
            formData.append('addressLine02',address2);
            formData.append('addressLine03',address3);
            formData.append('addressLine04',address4);
            formData.append('addressLine05',address5);
            formData.append('contactNo',contactNo);
            formData.append('email',email);
            formData.append('emergencyInform',emergencyInform);
            formData.append('emergencyContact',emergencyContact);

            let empProPic = $('#employeeProPic')[0];
            if (empProPic.files.length > 0) {
                formData.append('employeeProfilePic', empProPic.files[0]);
            }
            console.log("proPic = "+empProPic);

            console.log(formData)

            $.ajax({
                type : "PATCH",
                url : "http://localhost:8080/api/v1/employees/" + empCode,
                processData: false,
                contentType: false,
                data: formData,
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                success : function (details) {
                    console.log(details);
                    Swal.fire({
                        position: "center",
                        icon : "success",
                        title : "Customer has been updated successfully!...",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    clearEmployeeInputFields();
                    getAllEmployee();
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

$('#itemPic').on('change', function(event) {
    if ($('#itemPic').val() !== ""){
        $("#imageContainer").empty();
        var file = $(this).prop('files')[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var imageElement = `<img alt="image" src="${e.target.result}" style="max-width: 100%; padding: 0;">`;
            $("#imageContainer").append(imageElement);
        };

        reader.readAsDataURL(file);
        $("#btnUpdateInventory").prop("disabled", false);
    }
    $("#imageContainer").empty();
});

// --------------Clear btn event---------------------------
$("#btnClearEmployee").click(function (){
    clearEmployeeInputFields();
});