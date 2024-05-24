document.addEventListener('DOMContentLoaded', function() {
    // Get the elements by their IDs
    let innerShadow = document.getElementById('shadowLayer');
    let itemPic = document.getElementById('itemPicture');
    let plusMark = document.getElementById('plusMark');

    // Check if the elements exist before adding event listeners
    if (innerShadow && itemPic && plusMark) {
        // Add a click event listener to the plusMark element
        plusMark.addEventListener('click', function() {
            // Programmatically click the itemPic element
            itemPic.click();
        });

        // Add a click event listener to the innerShadow element
        innerShadow.addEventListener('click', function() {
            // Programmatically click the itemPic element
            itemPic.click();
        });
    } else {
        console.error('One or more elements not found in the DOM');
    }
});

document.getElementById('selectOccasion').addEventListener('change', updateItemCode);
document.getElementById('selectVerities').addEventListener('change', updateItemCode);
document.getElementById('selectGender').addEventListener('change', updateItemCode);

// ------------------------------------------------------------------------------------------------------------------

getAllItem();
loadAllSuppliersCode();
loadNextItemCode();
let supplierAllData;

// --------------Search customer function---------------------------
$("#btnSearchItem").click(function () {
    let itemValue = $("#txtSearchItem").val();
    if (itemValue === ""){
        Swal.fire({
            icon: "warning",
            title: "Oooops...",
            text: "Please input itemCode or name!"
        })
        return;
    }
    let searchType = $("#selectItemType").val();

    if (searchType === "ID"){
        itemSearchById(itemValue);
    } else if(searchType === "NAME"){
        itemSearchByName(itemValue);
    }
});

function itemSearchByName(name) {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/searchByName/"+name,
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
                    text: "Item name not found!"
                })
                return;
            }
            $("#tblInventory").empty();
            $.each(details, function (index, details) {
                console.log(details);
                console.log(details.itemCode);

                let row = `<tr style="vertical-align: middle">
                        <td><img alt="image" src="${details.itemPicture}" style="max-width: 60px; border-radius: 10px;"></td>
                        <td>${details.itemCode}</td>
                        <td>${details.itemDesc}</td>
                        <td>${details.category}</td>
                        <td>${details.size_5}</td>
                        <td>${details.size_6}</td>
                        <td>${details.size_7}</td>
                        <td>${details.size_8}</td>
                        <td>${details.size_9}</td>
                        <td>${details.size_10}</td>
                        <td>${details.size_11}</td>
                        <td>${details.supplierCode}</td>
                        <td>${details.supplierName}</td>
                        <td>${details.unitPriceSale}</td>
                        <td>${details.unitPriceBuy}</td>
                        <td>${details.expectedProfit}</td>
                        <td>${details.profitMargin}</td>
                        <td>${details.status}</td>
                        <td style="display: none;">${details.itemPicture}</td>
                </tr>`;

                $("#tblInventory").append(row);
                bindTableRowEventsInventory();
                $("#txtSearchItem").val("");
                $("#selectItemType").prop("selectedIndex", "DEFAULT");
            })
        },
        error: function (xhr, status, error) {
            console.log("itemSearchByName = "+error)
        }
    })
}

function itemSearchById(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/searchById/" + code,
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (details) {
            $("#tblInventory").empty();
            console.log(details);
            console.log(details.supplierCode);

            let row = `<tr style="vertical-align: middle">
                        <td><img alt="image" src="${details.itemPicture}" style="max-width: 60px; border-radius: 10px;"></td>
                        <td>${details.itemCode}</td>
                        <td>${details.itemDesc}</td>
                        <td>${details.category}</td>
                        <td>${details.size_5}</td>
                        <td>${details.size_6}</td>
                        <td>${details.size_7}</td>
                        <td>${details.size_8}</td>
                        <td>${details.size_9}</td>
                        <td>${details.size_10}</td>
                        <td>${details.size_11}</td>
                        <td>${details.supplierCode}</td>
                        <td>${details.supplierName}</td>
                        <td>${details.unitPriceSale}</td>
                        <td>${details.unitPriceBuy}</td>
                        <td>${details.expectedProfit}</td>
                        <td>${details.profitMargin}</td>
                        <td>${details.status}</td>
                        <td style="display: none;">${details.itemPicture}</td>
                </tr>`;

            $("#tblInventory").append(row);
            bindTableRowEventsInventory();
            $("#txtSearchItem").val("");
            $("#selectItemType").prop("selectedIndex", "DEFAULT");
        },
        error: function (xhr, textStatus, error) {
            console.log("itemSearchById error: ", error);
            console.log("itemSearchById error: ", xhr.status);
            if (xhr.status===404){
                Swal.fire({
                    icon: "warning",
                    title: "Oooops...",
                    text: "Item id not found!"
                })
            }
        }
    })
}

function loadNextItemCode(prefix) {
    console.log("prefix: "+prefix);
    $.ajax({
        url:"http://localhost:8080/api/v1/inventory/nextId/" + prefix,
        method:"GET",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success:function (resp) {
            $("#itemCode").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextItemId() ="+error)
        }
    })
}

// --------------Search customer function---------------------------
function searchItem(itemCode) {
    $.ajax({
        type : "GET",
        url: "http://localhost:8080/api/v1/inventory/" + itemCode,
        success : function (details) {
            console.log(details);
            return true;
        }
    });
}

// --------------Save btn event---------------------------
$("#btnSaveItem").click(function (){
    if (checkAllItem()){
        saveItem();
    }else {
        alert("Something went wrong!");
    }
});

function updateItemCode(){
    let occasion = $("#selectOccasion").val();
    let verities = $("#selectVerities").val();
    let gender = $("#selectGender").val();
    let itemCode = $("#itemCode");

    if (occasion && verities && gender) {
        let prefix = occasion + verities + gender ;
        console.log(prefix);
        let nextId = loadNextItemCode(prefix);
        itemCode.val(nextId);
        console.log(nextId);
    }else {
        itemCode.val("");
    }
}

// --------------Save Customer function---------------------------
function saveItem() {
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemDesc").val();
    let itemPic = $("#itemPicture").prop('files')[0];
    let category = $("#category").val();
    let size5 = $("#size5").val();
    let size6 = $("#size6").val();
    let size7 = $("#size7").val();
    let size8 = $("#size8").val();
    let size9 = $("#size9").val();
    let size10 = $("#size10").val();
    let size11 = $("#size11").val();
    let supplierCode = $("#selectSupplierCode").val();
    let supplierName = $("#supName").val();
    let unitPriceSale = $("#unitPriceSale").val();
    let unitPriceBuy = $("#unitPriceBuy").val();
    let profit = $("#expectedProfit").val();
    let profitMargin = $("#profitMargin").val();
    let status = $("#stockStatus").val();

    if (!itemPic) {
        // Handle case where no file is selected
        console.error('No file selected');
        return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
        let base64String = event.target.result;

        var itemObj = {
            "itemCode":itemCode,
            "itemDesc":itemName,
            "itemPicture":base64String,
            "category":category,
            "size_5":size5,
            "size_6":size6,
            "size_7":size7,
            "size_8":size8,
            "size_9":size9,
            "size_10":size10,
            "size_11":size11,
            "supplierCode":supplierCode,
            "supplierName":supplierName,
            "unitPriceSale":unitPriceSale,
            "unitPriceBuy":unitPriceBuy,
            "expectedProfit":profit,
            "profitMargin":profitMargin,
            "status": status
        }

        $.ajax({
            type : "POST",
            url : "http://localhost:8080/api/v1/inventory",
            dataType: "json",
            contentType:"application/json",
            data: JSON.stringify(itemObj),
            // headers: {
            //     "Authorization": "Bearer " + localStorage.getItem("token")
            // },

            success : function (details) {
                console.log(details);
                Swal.fire({
                    position: "center",
                    icon : "success",
                    title : "Item has been saved successfully!...",
                    showConfirmButton: false,
                    timer: 2000
                });
                clearItemInputFields();
                getAllItem();
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
        })
    };
    reader.readAsDataURL(itemPic);
}

// // --------------Get all btn event---------------------------
// $("#getAll").click(function (){
//     getAllCustomer();
// })

// --------------Get all customer function---------------------------
function getAllItem(){
    $("#tblInventory").empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/inventory",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success : function (details) {
            console.log("Success: ", details);
            console.log(details.itemCode);
            for (let inventory of details) {
                let row = `<tr style="vertical-align: middle">
                        <td><img alt="image" src="${inventory.itemPicture}" style="max-width: 60px; border-radius: 10px;"></td>
                        <td>${inventory.itemCode}</td>
                        <td>${inventory.itemDesc}</td>
                        <td>${inventory.category}</td>
                        <td>${inventory.size_5}</td>
                        <td>${inventory.size_6}</td>
                        <td>${inventory.size_7}</td>
                        <td>${inventory.size_8}</td>
                        <td>${inventory.size_9}</td>
                        <td>${inventory.size_10}</td>
                        <td>${inventory.size_11}</td>
                        <td>${inventory.supplierCode}</td>
                        <td>${inventory.supplierName}</td>
                        <td>${inventory.unitPriceSale}</td>
                        <td>${inventory.unitPriceBuy}</td>
                        <td>${inventory.expectedProfit}</td>
                        <td>${inventory.profitMargin}</td>
                        <td>${inventory.status}</td>
                        <td style="display: none;">${inventory.itemPicture}</td>
                </tr>`;

                $("#tblInventory").append(row);
                bindTableRowEventsInventory();
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
function bindTableRowEventsInventory() {
    $("#tblInventory>tr").click(function (){
        let itemPic = $(this).children().eq(0).html();
        let itemCode = $(this).children().eq(1).text();
        let itemDesc = $(this).children().eq(2).text();
        let category = $(this).children().eq(3).text();
        let size5 = $(this).children().eq(4).text();
        let size6 = $(this).children().eq(5).text();
        let size7 = $(this).children().eq(6).text();
        let size8 = $(this).children().eq(7).text();
        let size9 = $(this).children().eq(8).text();
        let size10 = $(this).children().eq(9).text();
        let size11 = $(this).children().eq(10).text();
        let supplierCode = $(this).children().eq(11).text();
        let supplierName = $(this).children().eq(12).text();
        let unitPriceSale = $(this).children().eq(13).text();
        let unitPriceBuy = $(this).children().eq(14).text();
        let profit = $(this).children().eq(15).text();
        let profitMargin = $(this).children().eq(16).text();
        let status = $(this).children().eq(17).text();
        let hiddenImage = $(this).children().eq(18).text();

        var base64Data;
        var matches = itemPic.match(/src="data:image\/jpeg;base64,([^"]+)"/);
        if (matches) {
            base64Data = matches[1];
            //console.log("base64 = "+base64Data);

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
            //console.log(file)

            var dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            // Set the files property of the file chooser input field using the files property of the DataTransfer object
            var fileInput = document.getElementById('itemPicture');
            fileInput.files = dataTransfer.files;

        } else {
            console.log("No image data found in the table cell.");
        }

        $("#itemCode").val(itemCode)
        $("#itemDesc").val(itemDesc)
        $("#category").val(category)
        $("#size5").val(size5)
        $("#size6").val(size6)
        $("#size7").val(size7)
        $("#size8").val(size8)
        $("#size9").val(size9)
        $("#size10").val(size10)
        $("#size11").val(size11)
        $("#selectSupplierCode").val(supplierCode)
        $("#supName").val(supplierName)
        $("#unitPriceSale").val(unitPriceSale)
        $("#unitPriceBuy").val(unitPriceBuy)
        $("#expectedProfit").val(profit)
        $("#profitMargin").val(profitMargin)
        $("#stockStatus").val(status)

        $("#imageContainer").empty().append(`<img alt="image" src="${hiddenImage}" style="width: 100%;">`)

        $("#btnDeleteItem").prop("disabled", false);
        $("#btnUpdateItem").prop("disabled", false);
    });
}

// --------------Delete btn event---------------------------
$("#btnDeleteItem").click(function (){
    let code = $("#itemCode").val();
    if (code === "") {
        Swal.fire({
            icon: "warning",
            title: "Please input valid item code!!!",
            timer: 2000
        });
        return;
    }
    deleteItem(code);
});

// --------------Delete customer function---------------------------
function deleteItem(code) {
    Swal.fire({
        icon : "warning",
        title : "Do you want to delete this item ?.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type : "DELETE",
                url : "http://localhost:8080/api/v1/inventory/" + code,
                dataType: "json",
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                success : function (details) {
                    Swal.fire({
                        icon : "success",
                        title : "Item has been deleted successfully!...",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    clearItemInputFields();
                    getAllItem();
                },
                error : function (jqXHR, textStatus, errorThrown) {
                    console.log("ÄJAX error: "+ textStatus, errorThrown);
                    Swal.fire({
                        icon: "warning",
                        title: "Item has been deleted unsuccessfully!!!",
                        timer: 2000
                    });
                }
            });
        }
    });
    return false;
}

// --------------Update btn event---------------------------
$("#btnUpdateItem").click(function (){
    let code = $("#itemCode").val();
    updateItem(code);
    clearItemInputFields();
});

// --------------Update Customer function---------------------------
function updateItem(code) {
    if (searchItem(code)) {
        Swal.fire({
            icon: "warning",
            title: "Oooops...",
            text: "No such item. Please check the code!..."
        });
    } else {
        let confirmation = confirm("Do you want to update this item ?.")
        // Swal.fire({
        //     position: "center",
        //     icon : "warning",
        //     title : "Do you want to update this customer ?.",
        //     showConfirmButton: true,
        //     timer: 2000
        // });

        if (confirmation) {
            console.log(code);

            let itemCode = $("#itemCode").val();
            let itemName = $("#itemDesc").val();
            let itemPic = $("#itemPicture").prop('files')[0];
            let category = $("#category").val();
            let size5 = $("#size5").val();
            let size6 = $("#size6").val();
            let size7 = $("#size7").val();
            let size8 = $("#size8").val();
            let size9 = $("#size9").val();
            let size10 = $("#size10").val();
            let size11 = $("#size11").val();
            let supplierCode = $("#selectSupplierCode").val();
            let supplierName = $("#supName").val();
            let unitPriceSale = $("#unitPriceSale").val();
            let unitPriceBuy = $("#unitPriceBuy").val();
            let profit = $("#expectedProfit").val();
            let profitMargin = $("#profitMargin").val();
            let status = $("#stockStatus").val();

            if (!itemPic) {
                // Handle case where no file is selected
                console.error('No file selected');
                return;
            }

            let reader = new FileReader();
            reader.onload = function (event) {
                let base64String = event.target.result;

                var itemObj = {
                    "itemCode":itemCode,
                    "itemDesc":itemName,
                    "itemPicture":base64String,
                    "category":category,
                    "size_5":size5,
                    "size_6":size6,
                    "size_7":size7,
                    "size_8":size8,
                    "size_9":size9,
                    "size_10":size10,
                    "size_11":size11,
                    "supplierCode":supplierCode,
                    "supplierName":supplierName,
                    "unitPriceSale":unitPriceSale,
                    "unitPriceBuy":unitPriceBuy,
                    "expectedProfit":profit,
                    "profitMargin":profitMargin,
                    "status": status
                }

                $.ajax({
                    type : "PATCH",
                    url : "http://localhost:8080/api/v1/inventory/" + itemCode,
                    dataType: "json",
                    contentType:"application/json",
                    data: JSON.stringify(itemObj),
                    // headers: {
                    //     "Authorization": "Bearer " + localStorage.getItem("token")
                    // },
                    success : function (details) {
                        console.log(details);
                        Swal.fire({
                            position: "center",
                            icon : "success",
                            title : "Item has been updated successfully!...",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        clearItemInputFields();
                        getAllItem();
                    },
                    error : function (jqXHR, textStatus, errorThrown) {
                        console.log("AJAX Error: " + textStatus, errorThrown, jqXHR);
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Item has been not updated!!!",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                });
            };
            reader.readAsDataURL(itemPic);
        }
    }
}

function loadAllSuppliersCode() {
    $("#selectSupplierCode").empty();
    $("#selectSupplierCode").append(`<option selected></option>`);
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/loadSuppliersCode",
        method: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("token")
        // },
        success: function (resp) {
            supplierAllData = resp;
            $.each(resp,function (index, supplier) {
                $("#selectSupplierCode").append(`<option value="${supplier.supplierCode}">${supplier.supplierCode}</option>`);
            })
        },
        error: function (xhr, status, error) {
            console.log("getItemAllSuppliers = "+error)
        }
    })

    $("#selectSupplierCode").click(function () {
        $.each(supplierAllData,function (index, supplier) {
            if ($("#selectSupplierCode").val()===supplier.supplierCode){
                $("#supName").val(supplier.supplierName);
            }
        })
    })
}

$('#itemPicture').on('change', function(event) {
    if ($('#itemPicture').val() !== ""){
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
$("#btnClearItem").click(function (){
    clearItemInputFields();
});