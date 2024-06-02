const SIGN_UP_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const SIGN_UP_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGN_UP_PASSWORD_REGEX = /^\d{4,}$/;

let signUpValidation = [];
signUpValidation.push({field:$("#inputEmail1"),regEx: SIGN_UP_EMAIL_REGEX});
signUpValidation.push({field:$("#firstName"),regEx: SIGN_UP_NAME_REGEX});
signUpValidation.push({field:$("#lastName"),regEx: SIGN_UP_NAME_REGEX});
signUpValidation.push({field:$("#inputPassword1"),regEx: SIGN_UP_PASSWORD_REGEX});
signUpValidation.push({field:$("#confirmInputPassword1"),regEx: SIGN_UP_PASSWORD_REGEX});

setSignUpBtn();

$("#inputEmail1,#firstName,#lastName,#inputPassword1,#confirmInputPassword1").on("keydown keyup", function (e) {
    let indexNo = signUpValidation.indexOf(signUpValidation.find((c) => c.field.attr("id") === e.target.id));

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(signUpValidation[indexNo]);
    setSignUpBtn()
})

$("#confirmInputPassword1").on("keydown keyup", function () {
    if ($("#inputPassword1").val() === $("#confirmInputPassword1").val()) {
        setSignUpBtn();
        $("#confirmInputPassword1").css("border", "1px solid rgb(206, 212, 218)");
    } else {
        $("#confirmInputPassword1").css("border", "2px solid red");
        $("#btnSignUp").prop("disabled", true);
    }
});


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setSignUpBorder(true, object);
        return true;
    }
    setSignUpBorder(false, object);
    return false;
}

function checkAllSignUps() {
    for (let i = 0; i < signUpValidation.length; i++) {
        if (!checkValidations(signUpValidation[i])){
            return false;
        }

    }
    return true;
}

function setSignUpBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid rgb(206, 212, 218)");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "1px solid rgb(206, 212, 218)");
        } else {
            ob.field.css("border", "1px solid rgb(206, 212, 218)");

            //ob.field.css("border", "var(--bs-border-width) solid var(--bs-border-color)");
        }
    }
}

function setSignUpBtn() {
    if (checkAllSignUps()) {
        $("#btnSignUp").prop("disabled", false);

    } else {
        $("#btnSignUp").prop("disabled", true);
    }
}