document.addEventListener('DOMContentLoaded', async () => {
    // get orders
    const orderContainer = document.getElementById('ordersContainer')
    const arr = window.location.href.split('/')
    const id = arr[arr.length - 1]
    const reloadOrders = async () => {
        let str = ""
        try {
            const response = await fetch('/doctor/orders/' + id)
            const orders = await response.json()

            for (let i = 0; i < orders.length; i++) {
                const order = orders[i]
                const noteType = order.noteType[0].toUpperCase() + order.noteType.slice(1).toLowerCase()
                str += `<div class="h-min min-h-12 py-1 w-full flex justify-between items-center text-xl text-slate-700 px-4 border-t border-red-900" data-id="${order._id.toString()}"><div class="flex gap-4 overflow-hidden w-full"><p class="border-r-2 border-slate-500 pr-3 w-32 items-center justify-center hidden lg:flex">${noteType}</p><p class=" flex items-center justify-center">${order.description}</p></div><div class="flex justify-end gap-3 w-20"><div class=""><img src="/image/delete.svg" alt="" class="w-7"></div></div></div>`
            }
            orderContainer.innerHTML = str || orderContainer.innerHTML

        } catch (err) {
            orderContainer.innerHTML = ""
        }
    }

    await reloadOrders()


    // add order
    const orderForm = document.getElementById('doctor-order-form')
    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const formData = new FormData(orderForm);
        const payload = {};
        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        const order = {
            noteType: payload.type,
            description: payload.description,
            startTime: new Date(payload.startTime),
            endTime: new Date(payload.endTime)
        }
        const response = await fetch('/doctor/orders/' + id, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { "Content-Type": 'application/json' }
        })
        if (response.ok) {
            orderForm.reset()
            location.reload()
        } else {
            alert('Error while creating order')
        }
    })

    // delete order
    orderContainer.childNodes.forEach(orderEl => {
        const deleteBtn = orderEl.lastChild.lastChild
        deleteBtn.addEventListener('click', async () => {
            const orderId = orderEl.dataset.id
            const response = await fetch('/doctor/orders/' + id + "/" + orderId, {
                method: 'DELETE'
            })
            window.location.reload()
        })
    })
})