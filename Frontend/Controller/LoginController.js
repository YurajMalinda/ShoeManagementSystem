let txtLogEmail=$("#inputEmail");
let txtLogPassword=$("#inputPassword");
$("#btnLogIn").click(function () {
    if (checkEmptyLogInInputs()){
        let email=txtLogEmail.val();
        let password=txtLogPassword.val();

        let logInObj={
            email:email,
            password:password
        }

        const jsonObj=JSON.stringify(logInObj);
        $.ajax({
            url: "http://localhost:8080/api/v1/auth/signIn",
            method: "POST",
            data: jsonObj,
            contentType: "application/json",
            success:function (resp, textStatus, jqxhr) {

                localStorage.setItem("token", resp.token)
                console.log(resp.token);
                sendWishedToCustomer();
                switchToAnotherPageFromLogin(resp);
                clearLogInInputFields();

            },
            error: function (xhr, textStatus, error) {
                console.log("logIn error: ", error);
                console.log("logIn error: ", xhr);
                if (xhr.status===401){
                    Swal.fire({
                        icon: "warning",
                        title: "Oooops...",
                        text: "Incorrect password!"
                    })
                }
                if (xhr.status===404){
                    Swal.fire({
                        icon: "warning",
                        title: "Oooops...",
                        text: "User email not found!"
                    })
                }
            }
        });
    }
});

function sendWishedToCustomer() {
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/sendBirthDayWishes",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success:function (resp, textStatus, jqxhr) {
            console.log("email send")
        },
        error: function (xhr, textStatus, error) {
            console.log("logIn error: ", error);
            console.log("logIn error: ", xhr);
        }
    });
}

function switchToAnotherPageFromLogin(resp) {
    let empEmail =txtLogEmail.val();
    localStorage.setItem("empEmail", empEmail)

    setView($("#dashboardContent"));    // if (resp.role === "ADMIN"){
    //     window.location.href = '/shoe-shop-front-end/assets/pages/admin.html';
    // } else if (resp.role === "USER") {
    //     window.location.href = '/shoe-shop-front-end/assets/pages/user.html';
    // } else {
    //     swal("Error", "Job role not found!", "error");
    // }
}

function checkEmptyLogInInputs() {
    if (txtLogEmail.val()==="" || txtLogPassword.val()===""){
        if (txtLogEmail.val()==="" && txtLogPassword.val()===""){
            txtLogEmail.css("border", "2px solid red");
            txtLogPassword.css("border", "2px solid red");
        } else if(txtLogEmail.val()===""){
            txtLogEmail.css("border", "2px solid red");
        } else if (txtLogPassword.val()===""){
            txtLogPassword.css("border", "2px solid red");
        }
        return false;
    }
    return true;
}
function clearLogInInputFields() {
    txtLogEmail.val("");
    txtLogPassword.val("");
}