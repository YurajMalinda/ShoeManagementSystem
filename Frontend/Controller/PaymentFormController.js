document.addEventListener('DOMContentLoaded', function() {
    toggleSections();
});

function toggleSections() {
    let paymentMethod = $("#paymentMethod").val();
    let cash = $("#cashSection");
    let card = $("#cardSection");

    if (paymentMethod === 'cash') {
        cash.show();
        card.hide();
    } else if (paymentMethod === 'card') {
        card.show();
        cash.hide();
    }
}