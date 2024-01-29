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

            // upcoming.innerHTML = ""
            let str = ""
            for (let i = 0; i < upcomingApps.length; i++) {
                const item = upcomingApps[i]
                item.date = new Date(item.date)
                const fullDate = item.date.getDate() + "/" + (item.date.getMonth() + 1) + "/" + item.date.getFullYear()
                const fullTime = item.date.getHours() + ": " + (item.date.getMinutes() + 1)
                str += `<div class="pl-5 pr-[18px] py-3.5 bg-stone-100 shadow justify-start items-center gap-[9px] inline-flex w-full flex-nowrap"><div class="mx-auto">${fullDate} <span class="text-gray-700 text-opacity-75 text-[13px] text-lg">at </span><span> ${fullTime}</span></div></div>`
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