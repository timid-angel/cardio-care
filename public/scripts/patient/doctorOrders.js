document.addEventListener('DOMContentLoaded', async () => {
    // get orders
    const orderContainer = document.getElementById('ordersContainer')

    const reloadOrders = async () => {
        let str = ""
        try {
            const response = await fetch('/patient/orders/')
            const orders = await response.json()
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i]
                const noteType = order.noteType[0].toUpperCase() + order.noteType.slice(1).toLowerCase()
                str += `<div class="h-min min-h-12 py-1 w-full flex justify-between items-center text-xl text-slate-700 px-4 border-t border-red-900"><div class="flex gap-4 overflow-hidden w-full"><p class="border-r-2 border-slate-500 pr-3 w-32 items-center justify-center flex">${noteType}</p><p class=" flex items-center justify-center"> ${order.description}</p></div></div></div>`
            }
            orderContainer.innerHTML = str || orderContainer.innerHTML

        } catch (err) {
            console.log(err)
        }
    }

    await reloadOrders()
})