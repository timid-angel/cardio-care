
document.addEventListener('DOMContentLoaded', () => {
    const exports = document.getElementById("export-data");
    const transfer = document.getElementById("transfer");
    const payment=document.getElementById("payment")
    //const button=document.getElementById("P-button")
    transfer.addEventListener('click', () => {
        exports.classList.toggle("hidden");
    });
    payment.addEventListener('click',()=>{
        Payment.classList.toggle("hidden")
    });
});