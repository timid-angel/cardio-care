
document.addEventListener('DOMContentLoaded', () => {
    const exports = document.getElementById("export-data");
    const transfer = document.getElementById("transfer");
    const payment=document.getElementById("payment")
    const paymentContent=document.getElementById("Payment")
    //const button=document.getElementById("P-button")
    transfer.addEventListener('click', () => {
        if (!paymentContent.classList.contains("hidden")) {
            paymentContent.classList.add("hidden");
        }
        exports.classList.toggle("hidden");
    });
    payment.addEventListener('click',()=>{
        if (!exports.classList.contains("hidden")) {
            exports.classList.add("hidden");
        }
        paymentContent.classList.toggle("hidden")
    });
});