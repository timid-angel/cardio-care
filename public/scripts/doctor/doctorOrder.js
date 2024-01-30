`<div
class="h-min min-h-12 py-1 w-full flex justify-between items-center text-xl text-slate-700 px-4 border-t border-red-900">
<div class="flex gap-4 overflow-hidden w-full">
    <p class="border-r-2 border-slate-500 pr-3 w-32 items-center justify-center hidden lg:flex">
        Medication
    </p>
    <p class=" flex items-center justify-center">Ibuprofen: for when things get
        unbearable</p>
</div>
<div class="flex justify-end gap-3 w-20">
    <div class="">
        <img src="/image/delete.svg" alt="" class="w-7">
    </div>
</div>
</div>`

document.addEventListener('DOMContentLoaded', async () => {
    const orderContainer = document.getElementById('ordersContainer')
    try {

    } catch (err) {
        orderContainer.innerHTML = ""
    }

})