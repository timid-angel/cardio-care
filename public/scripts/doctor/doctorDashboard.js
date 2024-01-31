document.addEventListener('DOMContentLoaded', () => {
    const upcoming = document.getElementById('upcomingAppointments')
    upcoming.innerHTML = `<div class="pl-5 pr-[18px] py-3.5 bg-stone-100 shadow justify-start items-center gap-[9px] inline-flex w-full text-center"><p class="mx-auto">No registerd appointments</p></div>`

    const run = async () => {
        try {
            const response = await fetch('/doctor/upcoming-appointments')
            const upcomingApps = await response.json()
            if (upcomingApps.length == 0) {
                return
            }

            let str = ""
            for (let i = 0; i < upcomingApps.length; i++) {
                const item = upcomingApps[i]
                item.date = new Date(item.date)
                const minutes = (item.date.getMinutes() + 1) >= 10 ? "" + (item.date.getMinutes() + 1) : "0" + (item.date.getMinutes() + 1)
                const fullDate = item.date.getDate() + "/" + (item.date.getMonth() + 1) + "/" + item.date.getFullYear()
                const fullTime = item.date.getHours() + ":" + minutes
                str += `<div class="pl-5 pr-[18px] py-3.5 bg-stone-100 shadow justify-start items-center gap-[9px] inline-flex w-full flex-nowrap"><div class="mx-auto">${fullDate} <span class="text-gray-700 text-opacity-75 text-lg">at </span><span> ${fullTime} - <span class="text-gray-700 text-opacity-75 text-[14px]">24hr Format</span></span></div></div>`
            }

            return str

        } catch (err) {
            return
        }
    }

    run().then(str => {
        upcoming.innerHTML = str || upcoming.innerHTML
    })

})