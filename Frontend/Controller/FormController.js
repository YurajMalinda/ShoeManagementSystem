initialUI();

function clearAllFields() {
    // Use 'hidden' attribute for better performance and simplicity
    $("#adminPanelView, #customerForm, #employeeForm, #inventoryForm, #placeOrderForm, #orderDetailsView, #supplierForm").attr('hidden', true);
}

function initialUI() {
    clearAllFields();
    // Use 'hidden' attribute for better performance and simplicity
    $("#adminPanelView").removeAttr('hidden');
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

$("#btnOrderDetails").on('click', () => {
    setViewForm($("#orderDetailsForm"));
});

$("#btnSupplier").on('click', () => {
    setViewForm($("#supplierForm"));
});

