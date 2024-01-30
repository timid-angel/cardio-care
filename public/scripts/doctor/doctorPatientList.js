document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('patientContainer')
    container.innerHTML = ''

    const run = async () => {
        let str = ""
        try {
            const response = await fetch('/doctor/patient-list')
            const patients = await response.json()
            patients.forEach((patient) => {
                let name
                if (patient.name.middle) {
                    name = patient.name.first + " " + patient.name.middle[0] + ". " + patient.name.last
                } else {
                    name = patient.name.first + " " + patient.name.last
                }
                let address = patient.address.subCity + " " + patient.address.woreda + ", " + patient.address.houseNumber
                let imagePath = "/patients/" + patient.img

                str += `<div class="pl-6 py-3 bg-white flex shadow-md hover:shadow-lg hover:bg-red-50 justify-around items-center cursor-pointer" data-id="${patient._id.toString()}">
                    <div class=" flex-col justify-start items-start flex gap-2">
                        <div class=" self-stretch justify-start items-start gap-4 flex">
                            <div class=" flex-col justify-start items-start gap-1 flex">
                                <p class=" text-black text-opacity-90 text-xl">${name}</p>
                                <p class="Text self-stretch text-black text-opacity-40 text-[13px] font-normal">ID:
                                ${patient._id.toString()}
                                </p>
                            </div>
                        </div>
                        <div>
                        <p class="text-zinc-800">Gender:
                            <span class="text-zinc-800 text-sm">${patient.gender}</span>
                        </p>
                        <p class="text-zinc-800">Birthdate:
                            <span class="text-zinc-800 text-sm">${new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                        </p>
                        <p class="text-zinc-800">Address:
                            <span class="text-zinc-800 text-sm">${address}</span >
                        </p >
                        <p class="text-zinc-800">Email:
                            <span class="text-zinc-800 text-sm">${patient.email}</span>
                        </p>
                        </div>
                                    </div >
                        <img class="Ce91 w-[180.90px] h-[180.90px] shadow-md border-2 rounded-lg border-zinc-600" alt="" src="${imagePath}">
                    </div>`
            })

            return str
        } catch (err) {
            console.log(err)
        }
    }

    let str = await run()
    container.innerHTML = str || container.innerHTML

    container.childNodes.forEach(patientCard => {
        patientCard.addEventListener('click', () => {
            window.location.href = "/doctor/patients/" + patientCard.dataset.id
        })
    })

})