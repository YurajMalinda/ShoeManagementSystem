$("#btnSignUp").click(function () {

    let email= $("#inputEmail1").val();
    let firstName= $("#firstName").val();
    let lastName= $("#lastName").val();
    let password= $("#inputPassword1").val();
    let role= $("#selectRole").val();

    let signUpObj = {
        email:email,
        firstName:firstName,
        lastName:lastName,
        password:password,
        role:role
    }

    console.log(signUpObj)

    const jsonObj = JSON.stringify(signUpObj)

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/signUp",
        method: "POST",
        data: jsonObj,
        contentType: "application/json",
        success: function (resp, textStatus, jqxhr) {
            console.log("signUp success: ", resp);
            localStorage.setItem("token", resp.token)
            clearSignUpInputFields();
            Swal.fire({
                position: "center",
                icon : "success",
                title : "Sign up successfully!...",
                showConfirmButton: false,
                timer: 2000
            });
            setView($("#loginForm"));
        },
        error: function (xhr, textStatus, error) {
            console.log("signUp error: ", error);
            console.log("signUp error: ", xhr);
            if (xhr.status===409){
                Swal.fire({
                    icon: "warning",
                    title: "Oooops...",
                    text: "This user is already exists!"
                })
            }
            if (xhr.status===404){
                Swal.fire({
                    icon: "warning",
                    title: "Oooops...",
                    text: "No employee found to this email!"
                })
            }
        }
    })
});

function clearSignUpInputFields() {
    $("#selectRole").prop("selectedIndex", "USER");
    $("#inputEmail1").val("");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#inputPassword1").val("");
    $("#confirmInputPassword1").val("");
}