// initUI();
//
// function clearAll(){
//     $("#homeContent, #signUpForm, #loginForm").css('display', 'none');
// }
//
// function initUI(){
//     clearAll();
//     $("#homeContent").css('display', 'block');
//     setLastView();
// }
//
// function setLastView(){
//     let view = localStorage.getItem("view")
//     switch (view){
//         case "Home":
//             setView($("#homeContent"));
//             break;
//         case "SignUpForm":
//             setView($("#signUpForm"));
//             break;
//         case "LoginForm":
//             setView($("#loginForm"));
//             break;
//         default:
//             setView($("#homeContent"));
//     }
// }
//
// function setView(viewObject){
//     clearAll();
//     viewObject.css('display', 'block');
//     saveLastView(viewObject.get(0).id);
//     console.log(viewObject.get(0).id);
// }
//
// function saveLastView(id){
//     switch (id) {
//         case "homeContent":
//             localStorage.setItem("view", "Home");
//             break;
//         case "signUpForm":
//             localStorage.setItem("view", "SignUpForm");
//             break;
//         case "loginForm":
//             localStorage.setItem("view", "LoginForm");
//             break;
//     }
// }
//
// $("#btnGetStarted").on("click", function(){
//     setView($("#signUpForm"));
// })
//
// $("#btnGetStarted1").on("click", function(){
//     setView($("#signUpForm"));
// })

// Initialize the UI when the document is ready
$(document).ready(() => {
    initUI();
});

function clearAll() {
    // Use 'hidden' attribute for better performance and simplicity
    $("#homeContent, #signUpForm, #loginForm, #dashboardContent").attr('hidden', true);
}

function initUI() {
    clearAll();
    // Use 'hidden' attribute for better performance and simplicity
    $("#homeContent").removeAttr('hidden');
    setLastView();
}

function setLastView() {
    // Use view id directly instead of mapping
    const viewId = localStorage.getItem('view');
    const viewObject = $('#' + viewId);
    // Check if the viewObject exists before setting the view
    if (viewObject.length) {
        setView(viewObject);
    } else {
        setView($("#homeContent"));
    }
}

function setView(viewObject) {
    clearAll();
    viewObject.removeAttr('hidden');
    // Use view object's id directly
    saveLastView(viewObject.attr('id'));
    console.log(viewObject.attr('id'));
}

function saveLastView(id) {
    // Use id directly without mapping
    localStorage.setItem('view', id);
}

// Combine event listeners for buttons
$("#btnGetStarted, #btnGetStarted1").on('click', () => {
    setView($("#signUpForm"));
});

$("#linkLogin").on("click", () => {
    setView($("#loginForm"));
})

$("#btnLogIn").on("click", () => {
    setView($("#dashboardContent"));
})

$("#btnBackTOHome").on("click", () => {
    setView($("#homeContent"));
})