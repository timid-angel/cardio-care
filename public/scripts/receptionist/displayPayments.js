document.addEventListener('DOMContentLoaded', async () => {
    const paymentContainer = document.getElementById('paymentContainer');

    const fetchPayments = async () => {
        try {
            const response = await fetch('/receptionist/payment');
            if (!response.ok) {
                console.error('Failed to fetch payments');
            }
            const payments = await response.json();

            let str = ""
            payments.payments.forEach(payment => {
                if (payment.accepted) return
                str += `<div class="h-96 w-64 bg-slate-100 shadow-md rounded-lg flex flex-col items-center justify-evenly" data-id="${payment._id.toString()}"><img src="/payments/${payment.img}" alt="" class="w-56 h-56 border-2 border-black mt-3 rounded-lg"><div class="font-sans text-center"><p>Email: ${payment.patient}</p><p>Checked: ${payment.checked}</p><p>Accepted: ${payment.accepted}</p></div><div class="flex jusify-evenly gap-4"><button class="bg-teal-800 hover:bg-teal-900 text-white px-3 py-1 text-center rounded-3xl">Accept</button><button class="bg-red-800 hover:bg-red-900 text-white px-5 py-1 text-center rounded-3xl">Deny</button></div></div>`
            })
            paymentContainer.innerHTML = str

            paymentContainer.childNodes.forEach(payment => {
                const accept = payment.lastChild.firstChild
                const deny = payment.lastChild.lastChild

                accept.addEventListener('click', async () => {
                    const paymentId = payment.dataset.id
                    try {
                        const response = await fetch(`/receptionist/verify-payment/${paymentId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        if (response.ok) {
                            alert(`Payment verified successfully`);
                            fetchPayments();
                        } else {
                            const data = await response.json();
                            if (response.status === 404) {
                                alert(`Error: Payment not found`);
                            } else {
                                alert(`Error: ${data.error}`);
                            }
                        }
                    } catch (error) {
                        console.error(`Error: `, error);
                        alert(`Error: ${error.message}`);
                    }
                })

                deny.addEventListener('click', async (event) => {
                    const paymentId = payment.dataset.id
                    try {
                        const response = await fetch(`/receptionist/decline-payment/${paymentId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        if (response.ok) {
                            alert(`Payment denied successfully`);
                            fetchPayments();
                        } else {
                            const data = await response.json();
                            if (response.status === 404) {
                                alert(`Error: Payment not found`);
                            } else {
                                alert(`Error: ${data.error}`);
                            }
                        }
                    } catch (error) {
                        console.error(`Error: `, error);
                        alert(`Error: Something went wrong`);
                    }
                })
            })

        } catch (error) {
            console.error('Error:', error);
        }
    };

    await fetchPayments()

});