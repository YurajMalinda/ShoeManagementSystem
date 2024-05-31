initialUI();

function clearAllFields() {
    // Use 'hidden' attribute for better performance and simplicity
    $("#adminPanelView, #customerForm, #employeeForm, #inventoryForm, #placeOrderForm, #paymentForm, #orderDetailsView, #supplierForm").attr('hidden', true);
}

function initialUI() {
    clearAllFields();
    // Use 'hidden' attribute for better performance and simplicity
    $("#placeOrderForm").removeAttr('hidden');
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
});

$("#btnPurchaseOrder").on('click', () => {
    setViewForm($("#paymentForm"));
});

$("#btnOrderDetails").on('click', () => {
    setViewForm($("#orderDetailsView"));
});

$("#btnSupplier").on('click', () => {
    setViewForm($("#supplierForm"));
});


// ----------------------Current date function--------------
// document.addEventListener('DOMContentLoaded', function() {
//     const currentDateElement = document.getElementById('current-date');
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     const today = new Date().toLocaleDateString(undefined, options);
//     currentDateElement.textContent = today;
// });

