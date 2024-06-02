initialUI();

function clearAllFields() {
    // Use 'hidden' attribute for better performance and simplicity
    $("#adminPanelView, #customerForm, #employeeForm, #inventoryForm,#productsViewForm, #placeOrderForm, #paymentForm, #orderDetailsView, #supplierForm").attr('hidden', true);
}

function initialUI() {
    clearAllFields();
    // Use 'hidden' attribute for better performance and simplicity
    $("#adminPanelView").removeAttr('hidden');
    setImageForHeader();
}

function setViewForm(viewObject) {
    clearAllFields();
    viewObject.removeAttr('hidden');
    console.log(viewObject.attr('id'));
}

$("#btnHome").on('click', () => {
    setViewForm($("#adminPanelView"));
});

$("#btnCustomer").on('click', () => {
    setViewForm($("#customerForm"));
});

$("#btnEmployee").on('click', () => {
    setViewForm($("#employeeForm"));
});

$("#btnInventory").on('click', () => {
    setViewForm($("#inventoryForm"));
});

$("#btnPlaceOrder").on('click', () => {
    setViewForm($("#placeOrderForm"));
    placeOrderInitialize();
});

$("#btnPurchaseOrder").on('click', () => {
    setViewForm($("#paymentForm"));
});

$("#btnOrderDetails").on('click', () => {
    setViewForm($("#orderDetailsView"));
    orderDetailInitialize();
});

$("#btnSupplier").on('click', () => {
    setViewForm($("#supplierForm"));
});

$("#btnProducts").on('click', () => {
    setViewForm($("#productsViewForm"));
    productInitialize();
});

// ----------------------Current date function--------------
// document.addEventListener('DOMContentLoaded', function() {
//     const currentDateElement = document.getElementById('current-date');
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     const today = new Date().toLocaleDateString(undefined, options);
//     currentDateElement.textContent = today;
// });

function setImageForHeader() {
    let email = localStorage.getItem("empEmail")
    console.log(email)

    $.ajax({
        url: "http://localhost:8080/api/v1/employee/searchByEmail?email="+email,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            var imageElement = `<img id="headerImg" alt="image" src="data:image/png;base64,${resp.employeeProfilePic}" width="40px" height="40px">`;
            $("#admin-img-div").empty();
            $("#admin-img-div").append(imageElement);

            $("#cashierName").val(resp.employeeName);
        },
        error: function (xhr, textStatus, error) {
            console.log("empSearchByEmail error: ", error);
            console.log("empSearchByEmail error: ", xhr.status);
            if (xhr.status===404){
                swal("Error", "This employee does not exits!", "error");
            }
        }
    })
}


