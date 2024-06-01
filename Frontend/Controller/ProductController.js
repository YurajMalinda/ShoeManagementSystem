function productInitialize() {
    getAllProItems();
}

getAllProItems();

function getAllProItems() {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory",
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllProductInventory = "+error)
            console.log("getAllProductInventory = "+xhr)
        }
    })
}

$("#btnProductPriceSearch").click(function () {
    let minPrice = parseFloat($("#txtMinPrice").val());
    let maxPrice = parseFloat($("#txtMaxPrice").val());

    clearProductInputFields()
    $("#txtMinPrice").val(minPrice);
    $("#txtMaxPrice").val(maxPrice);

    if (isNaN(minPrice) || isNaN(maxPrice) || minPrice === "" || maxPrice === "") {
        swal("Error", "Please enter both minimum and maximum prices!", "error");
        return;
    }
    if (minPrice>maxPrice){
        swal("Error", "Minimum price should be less than maximum price!", "error");
        return;
    }
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getAllItemsByPrice/"+minPrice+"/"+maxPrice,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllProductPriceInventory = "+error)
            console.log("getAllProductPriceInventory = "+xhr)
        }
    })
})

$("#btnProductNameSearch").click(function () {
    let name = $("#txtProductName").val();

    clearProductInputFields();
    $("#txtProductName").val(name);

    if (name === "") {
        swal("Error", "Please enter Name!", "error");
        return;
    }
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/searchByName/"+name,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            if (resp.length === 0){
                swal("Error", "Item Name not found!", "error");
                return;
            }
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("productSearchByName = "+error)
        }
    })
})

$("#cmbChooseByGender").change(function () {
    let gender = $(this).val();

    clearProductInputFields();
    $(this).val(gender);
    console.log(gender);

    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getAllItemsByCategoryGender/"+gender,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            if (resp.length === 0){
                swal("Error", "Items not found!", "error");
                return;
            }
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("productSearchByGender = "+error)
        }
    })
})

$("#cmbChooseByOccasion").change(function () {
    let occasion = $(this).val();

    clearProductInputFields();
    $(this).val(occasion);
    console.log(occasion);

    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getAllItemsByCategoryOccasion/"+occasion,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            if (resp.length === 0){
                swal("Error", "Items not found!", "error");
                return;
            }
            loadInventoryDataToGrid(resp);
        },
        error: function (xhr, status, error) {
            console.log("productSearchByOccasion = "+error)
        }
    })
})

function loadInventoryDataToGrid(resp) {
    $("#product-grid").empty();

    $.each(resp, function (index, inventory) {
        let card = `
                     <div class="card shadow col-2 mb-4 me-3 ms-4 p-1" style="max-height: 410px; background: #f8f9ff">
                        <img src="${inventory.itemPicture}" class="card-img" style="max-height: 200px; max-width: 200px border-radius: 1em">
                        <div style="display: flex; flex-direction: column; align-items: center;" class="card-body pt-1 px-2">
                            <h5 class="mt-1" style="font-weight: 700">${inventory.itemCode}</h5>
                            <h6 class="card-title mb-0">${inventory.itemDesc}</h6>
                            <h7 class="small mt-1">${inventory.category}</h7>
                            <h6 class="mb-1 mt-1">Rs. ${inventory.unitPriceSale}/=</h6>
                            <p class="card-text" style="font-size: 14px; margin: 0">Size-5:&nbsp;${inventory.size_5}&nbsp;&nbsp;  Size-6:&nbsp;${inventory.size_6}</p>
                            <p class="card-text" style="font-size: 14px; margin: 0">Size-7:&nbsp;${inventory.size_7}&nbsp;&nbsp;  Size-8:&nbsp;${inventory.size_8}</p>
                            <p class="card-text" style="font-size: 14px; margin: 0">Size-9:&nbsp;${inventory.size_9}&nbsp;&nbsp;  Size-10:&nbsp;${inventory.size_10}</p>
                            <p class="card-text" style="font-size: 14px; margin: 0">Size-11:&nbsp;${inventory.size_11}</p>
                        </div>
                    </div>`
        $("#product-grid").append(card);
    })
}

$("#btnProductClear").click(function () {
    clearProductInputFields();
    getAllProItems();
})
function clearProductInputFields() {
    $("#txtMinPrice").val("");
    $("#txtMaxPrice").val("");
    $("#txtProductName").val("");
    $("#cmbChooseByGender").val("Choose by Gender");
    $("#cmbChooseByOccasion").val("Choose by Occasion");
}